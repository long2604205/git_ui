<template>
  <div class="container-fluid main-container">
<!--    <button-->
<!--      class="btn workspace-floating-toggle"-->
<!--      @click="toggleWorkspacePanel"-->
<!--    >-->
<!--      <i :class="['fas', isWorkspaceCollapsed ? 'fa-chevron-right' : 'fa-chevron-left']"></i>-->
<!--    </button>-->
    <panda-repository-workspace
      :repositories="repositories"
      :active-repository="activeRepository"
      :collapsed="isWorkspaceCollapsed"
      @set-active-repo="setActiveRepository"
      @remove-repo="removeRepository"
      @toggle-workspace="toggleWorkspacePanel"
    />
  </div>
</template>
<script setup>
import PandaRepositoryWorkspace from '@/components/PandaRepositoryWorkspace.vue'
import { ref } from 'vue'

const repositories = ref([
  {
    id: 'repo1',
    name: 'My Project A',
    path: '/projects/my-project-a',
    status: 'clean',
    currentBranch: 'main',
    changes: []
  },
  {
    id: 'repo2',
    name: 'Another Repo',
    path: '/projects/another-repo',
    status: 'dirty',
    currentBranch: 'dev',
    changes: ['file1.js']
  },
  {
    id: 'repo3',
    name: 'Old Repo',
    path: '/projects/old-repo',
    status: 'untracked',
    currentBranch: 'feature-xyz',
    changes: ['index.html', 'style.css']
  }
])

const activeRepository = ref(null)
const isWorkspaceCollapsed = ref(false)

function setActiveRepository(repo) {
  activeRepository.value = repo
}

function removeRepository(repo) {
  repositories.value = repositories.value.filter(r => r.id !== repo.id)
  if (activeRepository.value?.id === repo.id) {
    activeRepository.value = null
  }
}

function toggleWorkspacePanel() {
  isWorkspaceCollapsed.value = !isWorkspaceCollapsed.value
}
</script>
<style scoped>
.main-container {
  height: calc(100vh - 56px);
  padding: 0;
}
.workspace-floating-toggle {
  position: absolute;
  top: 56px;
  left: 0;
  z-index: 1000;
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  width: 24px;
  height: 36px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  transition: background 0.2s ease;
}
.workspace-floating-toggle:hover {
  background-color: var(--bg-hover);
  color: var(--text-primary);
}

</style>
