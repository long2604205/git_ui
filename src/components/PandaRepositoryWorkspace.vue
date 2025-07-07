<template>
  <div class="horizontal-resize-wrapper" :style="{ width: containerWidth + 'px' }">
    <div class="workspace-container" :class="{ collapsed: collapsed }">
      <div class="workspace-panel workspace-split">
        <div class="repositories-workspace" :style="{ height: reposHeight + 'px' }">
          <!-- Header -->
          <div class="workspace-header">
            <h6 class="mb-0">Repositories</h6>
            <div class="workspace-toggle">
              <button
                class="btn btn-sm workspace-action"
                v-if="showActions"
                @click="openRepository"
              >
                <i class="fa-solid fa-plus"></i>
              </button>
              <button
                class="btn btn-sm workspace-action search"
                v-if="showActions"
                @click="showSearchRepository = !showSearchRepository"
              >
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
              <button
                class="btn btn-sm workspace-action"
                v-if="showActions"
              >
                <i class="fa-solid fa-ellipsis-vertical"></i>
              </button>
              <button class="btn btn-sm workspace-action" @click="$emit('toggle-workspace')">
                <i :class="['fas', collapsed ? 'fa-solid fa-layer-group' : 'fa-solid fa-minus']"></i>
              </button>
            </div>
          </div>
          <transition name="fade-search">
            <div class="search-workspace" v-if="showSearchRepository">
              <div class="symbol-search">
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
              <input class="search-branch" placeholder="Search" />
            </div>
          </transition>

          <!-- repository list -->
          <div class="workspace-content">
            <div class="workspace-repos">
              <template v-if="repositories.length === 0">
                <div class="no-repos-message text-center py-4">
                  <i class="fas fa-folder-open fa-2x mb-2"></i>
                  <p>No repositories open</p>
                  <small>Open repositories to manage them here</small>
                </div>
              </template>

              <template v-else>
                <div
                  v-for="repo in repositories"
                  :key="repo.id"
                  class="repo-item"
                  :class="{ active: activeRepository && activeRepository.id === repo.id }"
                  @click="onRepoClick(repo)"
                >
                  <div class="repo-icon">
                    <i class="fas fa-folder text-warning"></i>
                  </div>
                  <div class="repo-info">
                    <div class="repo-name">{{ repo.name }}</div>
                    <div class="repo-path">{{ repo.path }}</div>
                  </div>
                  <div class="repo-status">
                    <i
                      class="fas"
                      :class="[getStatusIcon(repo.status), getStatusColor(repo.status)]"
                      :title="repo.status"
                    ></i>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>

        <div class="resizer" @mousedown="startResizing"></div>

        <div class="branch-workspace" :style="{ height: 'calc(100% - ' + reposHeight + 'px - 5px)' }">
          <div class="branch-workspace-header">
            <h6 class="mb-0">Branches</h6>
            <div class="workspace-toggle">
              <button
                class="btn btn-sm workspace-action"
                v-if="showActions"
              >
                <i class="fa-solid fa-plus"></i>
              </button>
              <button
                class="btn btn-sm workspace-action search"
                v-if="showActions"
                @click="showSearchBranch = !showSearchBranch"
              >
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
              <button
                class="btn btn-sm workspace-action"
                v-if="showActions"
              >
                <i class="fa-solid fa-ellipsis-vertical"></i>
              </button>
            </div>
          </div>
          <transition name="fade-search">
            <div class="search-workspace" v-if="showSearchBranch">
              <div class="symbol-search">
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
              <input class="search-branch" placeholder="Search" />
            </div>
          </transition>
          <div class="workspace-content branch-tree-scroll">
            <div class="branch-tree" id="branch-tree">
              <div v-if="!activeRepository" class="no-repo-message text-center py-4">
                <i class="fas fa-code-branch fa-2x mb-2"></i>
                <p>No repository selected</p>
                <small>Open a repository to view branches</small>
              </div>

              <template v-else>
                <!-- HEAD -->
                <div class="tree-item">
                  <i class="fas fa-chevron-down tree-toggle" @click="toggle('head')"></i>
                  <i class="fas fa-laptop text-info me-1"></i>
                  <span>HEAD (Current Branch)</span>
                </div>
                <div class="tree-item nested active">
                  <i class="fas fa-star text-warning me-1"></i>
                  <span>{{ activeRepository.currentBranch }}</span>
                </div>

                <!-- Local -->
                <div class="tree-item">
                  <i class="fas fa-chevron-down tree-toggle" @click="toggle('local')"></i>
                  <i class="fas fa-folder text-warning me-1"></i>
                  <span>Local</span>
                </div>
                <div
                  class="tree-item nested"
                  v-for="branch in activeRepository.branches.local"
                  :key="'local-' + branch"
                  :class="{ active: branch === activeRepository.currentBranch }"
                  @contextmenu="contextMenu?.open($event, branch)"
                >
                  <i class="fas fa-code-branch text-success me-1"></i>
                  <span>{{ branch }}</span>
                </div>

                <!-- Remote -->
                <div class="tree-item">
                  <i class="fas fa-chevron-down tree-toggle" @click="toggle('remote')"></i>
                  <i class="fas fa-cloud text-primary me-1"></i>
                  <span>Remote</span>
                </div>
                <div
                  class="tree-item nested"
                  v-for="branch in activeRepository.branches.remote"
                  :key="'remote-' + branch"
                  @click="switchBranch(branch)"
                >
                  <i class="fas fa-server text-primary me-1"></i>
                  <span>{{ branch }}</span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="resizer-horizontal" @mousedown="startResizeContainer" v-if="!collapsed"></div>
  </div>

  <!--  Modal-->
  <panda-open-repository-form ref="openModal"/>
  <branch-context-menu ref="contextMenu" @action="handleContextAction"/>
</template>
<script setup>
// Props
import { onMounted, ref, watch } from 'vue'
import PandaOpenRepositoryForm from '@/components/modals/PandaOpenRepositoryForm.vue'
import BranchContextMenu from '@/components/modals/BranchContextMenu.vue'

const props = defineProps({
  repositories: {
    type: Array,
    default: () => []
  },
  activeRepository: Object,
  collapsed: Boolean
})
const showActions = ref(true);
const showSearchRepository = ref(false);
const showSearchBranch = ref(false);
const reposHeight = ref(0);
const containerHeight = ref(0);
const containerWidth = ref(300);
const previousWidth = ref(300)
let isResizing = false;
let isResizingContainer = false;
const openModal = ref(null);
const contextMenu = ref(null)
const emit = defineEmits(['set-active-repo', 'toggle-workspace', 'open-repository']);


// Watch
watch(() => props.collapsed, (newVal) => {
  if (!newVal) {
    showActions.value = true;
    containerWidth.value = previousWidth.value;
  } else {
    showActions.value = false;
    previousWidth.value = containerWidth.value;
    containerWidth.value = 55;
  }
});

// Methods
function handleContextAction({ action, branch }) {
  if (action === 'checkout') {
    switchBranch(branch)
  }
}

const onRepoClick = (repo) => {
  emit('set-active-repo', repo)
}

const getStatusIcon = (status) => {
  switch (status) {
    case 'clean': return 'fa-check-circle'
    case 'dirty': return 'fa-exclamation-circle'
    case 'untracked': return 'fa-question-circle'
    default: return 'fa-circle'
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case 'clean': return 'text-success'
    case 'dirty': return 'text-warning'
    case 'untracked': return 'text-secondary'
    default: return 'text-muted'
  }
}

const startResizing = (e) => {
  const container = document.querySelector('.workspace-split');
  if (!container) return;

  containerHeight.value = container.clientHeight;
  isResizing = true;

  window.addEventListener('mousemove', resizePanel);
  window.addEventListener('mouseup', stopResizing);
};

const resizePanel = (e) => {
  if (!isResizing) return;

  const container = document.querySelector('.workspace-split');
  const containerTop = container.getBoundingClientRect().top;
  const newHeight = e.clientY - containerTop;

  const minHeight = containerHeight.value * 0.2;
  const maxHeight = containerHeight.value * 0.8;

  reposHeight.value = Math.min(Math.max(newHeight, minHeight), maxHeight)
};

const stopResizing = () => {
  isResizing = false;
  window.removeEventListener('mousemove', resizePanel)
  window.removeEventListener('mouseup', stopResizing)
};

onMounted(() => {
  const container = document.querySelector('.workspace-split')
  if (container) {
    containerHeight.value = container.clientHeight;
    reposHeight.value = containerHeight.value / 2
  }
});

const startResizeContainer = (e) => {
  if (props.collapsed) return;
  isResizingContainer = true;
  window.addEventListener('mousemove', resizeContainer);
  window.addEventListener('mouseup', stopResizeContainer);
};

const resizeContainer = (e) => {
  if (!isResizingContainer) return;
  const wrapperLeft = document.querySelector('.horizontal-resize-wrapper').getBoundingClientRect().left;
  let newWidth = e.clientX - wrapperLeft;
  newWidth = Math.min(Math.max(newWidth, 250), 500);
  containerWidth.value = newWidth;
};

const stopResizeContainer = () => {
  isResizingContainer = false;
  window.removeEventListener('mousemove', resizeContainer);
  window.removeEventListener('mouseup', stopResizeContainer);
};


function switchBranch(branchName) {
  emit('switch-branch', branchName)
}

function toggle(section) {
  console.log('Toggle tree:', section);
  // Optional: thêm logic đóng/mở cây nếu muốn
}

const openRepository = () => {
  openModal.value?.openModal()
}
</script>
<style scoped>
.horizontal-resize-wrapper {
  display: flex;
  flex-direction: row;
  width: 300px;
  min-width: 60px;
  max-width: 500px;
  height: 100%;
  overflow: hidden;
  position: relative;
  padding-right: 0;
}

.resizer-horizontal {
  width: 5px;
  background-color: var(--border-color);
  cursor: col-resize;
  user-select: none;
}

.workspace-container {
  width: 100%;
  height: 100%;
  background-color: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  overflow: hidden;
  padding-right: 0;
}

.workspace-container.collapsed {
  width: 0;
  overflow: hidden;
}

.workspace-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.workspace-header {
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-color);
  min-height: 36px;
}

.workspace-header h6 {
  font-size: 14px;
  font-weight: 500;
  margin: 0;
}

.workspace-toggle {
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  font-size: 14px;
  z-index: 10;
}

.workspace-toggle:hover {
  color: var(--text-primary);
}

.workspace-content {
  flex: 1;
  overflow-y: auto;
}

.workspace-repos {
  padding: 8px;
}

.workspace-container.collapsed {
  width: 50px;
}

.workspace-container.collapsed .workspace-toggle {
  right: 50%;
  transform: translate(50%, -50%);
}

.workspace-container.collapsed .workspace-header h6,
.workspace-container.collapsed .workspace-content {
  opacity: 0;
  visibility: hidden;
  height: 0;
  pointer-events: none;
}

.workspace-container.collapsed .branch-workspace-header{
  opacity: 0;
  visibility: hidden;
  height: 0;
  pointer-events: none;
}

.workspace-action {
  margin: 0;
  background: transparent;
  border: none;
  color: var(--text-secondary);
}
.repositories-workspace {
  height: 50%;
  min-height: 20%;
  max-height: 80%;
  display: flex;
  flex-direction: column;
}
.branch-workspace{
  height: 50%;
  min-height: 20%;
  max-height: 80%;
}

.branch-workspace-header{
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-color);
  min-height: 36px;
}

.branch-workspace-header h6{
  font-size: 14px;
  font-weight: 500;
  margin: 0;
}
/* Utility Classes */
.no-repos-message{
  text-align: center;
  color: var(--text-muted);
  padding: 32px 16px;
}

.no-repos-message i{
  display: block;
  margin-bottom: 12px;
  opacity: 0.5;
}

.repo-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  margin-bottom: 4px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid transparent;
}

.repo-item:hover {
  background-color: var(--bg-hover);
  border-radius: 15px;
}

.repo-item.active {
  background-color: var(--bg-hover);
  border-radius: 15px;
}

.repo-icon {
  width: 20px;
  margin-right: 8px;
  text-align: center;
}

.repo-info {
  flex: 1;
  min-width: 0;
}

.repo-name {
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.repo-path {
  font-size: 12px;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-workspace{
  position: sticky;
  top: 0;
  padding: 8px;
  margin: 5px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: solid 1px var(--border-color);
  font-size: 12px;
  background-color: var(--bg-secondary);
}

.search-branch {
  width: 100%;
  background-color: var(--bg-secondary);
  color: var(--text-secondary);
  border: none;
}

.search-branch:focus-visible {
  outline: none;
}

.symbol-search {
  margin-right: 5px;
  color: var(--text-secondary);
}

.workspace-split {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.resizer {
  height: 5px;
  background-color: var(--bg-secondary);
  cursor: row-resize;
  user-select: none;
}

.fade-search-enter-active, .fade-search-leave-active {
  transition: all 0.3s ease;
}
.fade-search-enter-from, .fade-search-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-search-enter-to, .fade-search-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Branch Tree */
.workspace-content.branch-tree-scroll {
  max-height: 100%;
  overflow-y: scroll;
}

.branch-tree {
  margin: 10px;
}

.tree-item {
  display: flex;
  align-items: center;
  padding: 4px 0;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-radius: 2px;
}

.tree-item:hover {
  background-color: var(--bg-hover);
}

.tree-item.active {
  background-color: var(--accent-primary);
  color: var(--bg-primary);
}

.tree-item.nested {
  padding-left: 20px;
}

.tree-item.nested-2 {
  padding-left: 40px;
}

.tree-toggle {
  width: 12px;
  margin-right: 4px;
  font-size: 10px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.tree-toggle.collapsed {
  transform: rotate(-90deg);
}
</style>
