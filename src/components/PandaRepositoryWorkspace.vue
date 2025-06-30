<template>
  <div class="col-auto workspace-container" :class="{ collapsed: collapsed }">
    <div class="workspace-panel">
      <!-- Header -->
      <div class="workspace-header">
        <h6 class="mb-0">
          <i class="fas fa-th-large me-2"></i>Workspace
        </h6>
        <button class="btn btn-sm workspace-toggle" @click="$emit('toggle-workspace')">
          <i :class="['fas', collapsed ? 'fa-chevron-right' : 'fa-chevron-left']"></i>
        </button>
      </div>

      <!-- Danh sách repository -->
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
              <div class="repo-actions">
                <button
                  class="repo-action-btn"
                  title="Close Repository"
                  @click.stop="onCloseRepo(repo)"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
defineProps({
  repositories: {
    type: Array,
    default: () => []
  },
  activeRepository: Object,
  collapsed: Boolean
})
// Emits
const emit = defineEmits(['set-active-repo', 'remove-repo', 'toggle-workspace'])

// Methods
const onRepoClick = (repo) => {
  emit('set-active-repo', repo)
}

const onCloseRepo = (repo) => {
  emit('remove-repo', repo)
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
</script>
<style scoped>
.workspace-container {
  width: 250px;
  height: 100%;
  background-color: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  transition: width 0.3s ease;
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
  font-size: 12px;
  font-weight: 500;
  margin: 0;
}

.workspace-toggle {
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 12px;
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

.workspace-container {
  width: 280px;
  transition: width 0.3s ease;
  overflow: hidden;
}

.workspace-container.collapsed {
  width: 50px;
}

.workspace-container.collapsed .workspace-toggle {
  right: 50%;
  transform: translate(50%, -50%);
}

.workspace-container .workspace-header h6,
.workspace-container .workspace-content {
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.workspace-container.collapsed .workspace-header h6,
.workspace-container.collapsed .workspace-content {
  opacity: 0;
  visibility: hidden;
  height: 0;
  pointer-events: none;
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
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.repo-item:hover {
  background-color: var(--bg-hover);
}

.repo-item.active {
  background-color: var(--accent-primary);
  color: var(--bg-primary);
  border-color: var(--accent-primary);
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
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.repo-path {
  font-size: 10px;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.repo-actions {
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.repo-item:hover .repo-actions {
  opacity: 1;
}

.repo-action-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 10px;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  transition: all 0.2s ease;
}

.repo-action-btn:hover {
  background-color: var(--bg-hover);
  color: var(--text-primary);
}
</style>
