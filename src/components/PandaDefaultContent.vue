<template>
  <div class="container-fluid main-container">
    <div class="row main-layout-container h-100">
      <panda-repository-workspace
        :repositories="repositories"
        :active-repository="activeRepository"
        :collapsed="isWorkspaceCollapsed"
        @set-active-repo="setActiveRepository"
        @remove-repo="removeRepository"
        @toggle-workspace="toggleWorkspacePanel"
        @switch-branch="onSwitchBranch"
        @open-repository="openRepository"
      />
      <div class="col main-content">
        <panda-toolbar/>
        <panda-commit-panel
          :repository="sampleRepository"
          @commit="onCommit"
          @commit-push="onCommitPush"
          @refresh="onRefresh"
          @force-push="onForcePush"
          @push-tags="onPushTags"
        />
      </div>
      <panda-right-panel
        :commit="commitData"
        :is-collapsed="panelCollapsed"
        @toggle="panelCollapsed = !panelCollapsed"
      />
    </div>
  </div>
</template>
<script setup>
import PandaRepositoryWorkspace from '@/components/PandaRepositoryWorkspace.vue'
import { ref } from 'vue'
import PandaRightPanel from '@/components/PandaRightPanel.vue'
import PandaCommitPanel from '@/components/PandaCommitPanel.vue'
import PandaToolbar from '@/components/PandaToolbar.vue'
import api from '@/plugins/api.js'

const panelCollapsed = ref(false)

const repositories = ref([
  {
    id: 'repo1',
    name: 'Core API',
    path: 'C:/Users/zhilo/OneDrive/Documents/Project/Training/auto_verse',
    status: 'clean',
    currentBranch: 'main',
    branches: {
      local: ['main', 'dev', 'release/v1.0', 'feature/auth-module', 'bugfix/token-refresh', 'hotfix/login-timeout'],
      remote: ['origin/main', 'origin/dev', 'origin/release/v1.0', 'origin/feature/auth-module']
    },
    changes: []
  },
  {
    id: 'repo2',
    name: 'Admin Dashboard',
    path: '/projects/admin-dashboard',
    status: 'dirty',
    currentBranch: 'dev',
    branches: {
      local: ['main', 'dev', 'feature/user-management', 'feature/role-settings', 'bugfix/sidebar-collapse', 'refactor/table-component'],
      remote: ['origin/main', 'origin/dev', 'origin/feature/user-management']
    },
    changes: ['UserList.vue', 'Sidebar.vue']
  },
  {
    id: 'repo3',
    name: 'Mobile App',
    path: '/projects/mobile-app',
    status: 'untracked',
    currentBranch: 'feature/onboarding-flow',
    branches: {
      local: ['main', 'dev', 'feature/onboarding-flow', 'feature/push-notification', 'test/device-permissions'],
      remote: ['origin/main', 'origin/dev', 'origin/feature/onboarding-flow']
    },
    changes: ['Onboarding.vue', 'PermissionService.js']
  }
])

const activeRepository = ref(null)
const isWorkspaceCollapsed = ref(false)
const commitData = {
  message: 'Fix login validation and update UI',
  hash: '7f3a9e2',
  author: 'Nguyen Van A',
  email: 'nva@example.com',
  time: '2025-07-01T14:30:00Z',
  branch: 'feature/login-ui',
  files: [
    'src/views/LoginView.vue',
    'src/components/BaseInput.vue',
    'src/utils/validator.js'
  ]
}
const sampleRepository = {
  changes: [
    { file: 'src/App.vue', type: 'Modified', status: 'modified' },
    { file: 'src/main.js', type: 'Added', status: 'added' },
    { file: 'README.md', type: 'Deleted', status: 'deleted' }
  ]
}

function setActiveRepository(repo) {
  activeRepository.value = repo
}

async function openRepository() {
  try {
    const response = await api.post('/git/open-repository', {
      repo_path: "C:/Users/zhilo/OneDrive/Documents/Project/Training/auto_verse"
    });

    console.log(response.data.data)
    const result = response.data.data

    if (result) {
      repositories.value.push(result);
      activeRepository.value = result;

      console.log('✅ Repo opened:', result.name);
    } else {
      console.error('❌ Failed to open repository: No data returned');
    }

  } catch (error) {
    console.error('❌ Error opening repository:', error.message);
  }
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

function onCommit(payload) {
  console.log('Commit:', payload)
}

function onCommitPush(payload) {
  console.log('Commit and Push:', payload)
}

function onRefresh() {
  console.log('Refresh changes')
}

function onForcePush() {
  console.log('Force push')
}

function onPushTags() {
  console.log('Push with tags')
}

function onSwitchBranch(branch) {
  if (activeRepository.value) {
    activeRepository.value.currentBranch = branch
  }
}

</script>
<style scoped>
.main-container {
  background: var(--bg-primary);
  height: calc(100vh - 56px);
  padding: 0;
}

.main-layout-container {
  margin-right: 0;
}

.main-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding: 0;
}
</style>
