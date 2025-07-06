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

const panelCollapsed = ref(false)
const repositories = ref([
  {
    id: 'repo1',
    name: 'Project Alpha',
    path: '/projects/project-alpha',
    status: 'clean',
    currentBranch: 'main',
    changes: []
  },
  {
    id: 'repo2',
    name: 'Marketing Site',
    path: '/projects/marketing-site',
    status: 'dirty',
    currentBranch: 'dev',
    changes: ['home.vue', 'about.vue']
  },
  {
    id: 'repo3',
    name: 'Internal Tools',
    path: '/projects/internal-tools',
    status: 'untracked',
    currentBranch: 'feature-login',
    changes: ['login.js', 'auth.js']
  },
  {
    id: 'repo4',
    name: 'Legacy Codebase',
    path: '/projects/legacy-code',
    status: 'clean',
    currentBranch: 'main',
    changes: []
  },
  {
    id: 'repo5',
    name: 'Finance Dashboard',
    path: '/projects/finance-dashboard',
    status: 'dirty',
    currentBranch: 'hotfix-graph',
    changes: ['graph.js']
  },
  {
    id: 'repo6',
    name: 'Ecommerce Platform',
    path: '/projects/ecommerce',
    status: 'clean',
    currentBranch: 'release-v2',
    changes: []
  },
  {
    id: 'repo7',
    name: 'Analytics Engine',
    path: '/projects/analytics',
    status: 'untracked',
    currentBranch: 'experiment-ai',
    changes: ['ai.js', 'metrics.js']
  },
  {
    id: 'repo8',
    name: 'Game Prototype',
    path: '/projects/game-prototype',
    status: 'dirty',
    currentBranch: 'dev',
    changes: ['player.ts']
  },
  {
    id: 'repo9',
    name: 'Blog System',
    path: '/projects/blog',
    status: 'clean',
    currentBranch: 'main',
    changes: []
  },
  {
    id: 'repo10',
    name: 'Booking App',
    path: '/projects/booking-app',
    status: 'dirty',
    currentBranch: 'refactor-api',
    changes: ['api.js', 'utils.js']
  },
  {
    id: 'repo11',
    name: 'Design System',
    path: '/projects/design-system',
    status: 'clean',
    currentBranch: 'main',
    changes: []
  },
  {
    id: 'repo12',
    name: 'Admin Panel',
    path: '/projects/admin-panel',
    status: 'untracked',
    currentBranch: 'feature-tables',
    changes: ['table.vue', 'filter.vue']
  },
  {
    id: 'repo13',
    name: 'Microservice Auth',
    path: '/projects/auth-service',
    status: 'dirty',
    currentBranch: 'dev',
    changes: ['auth.ts']
  },
  {
    id: 'repo14',
    name: 'Chatbot',
    path: '/projects/chatbot',
    status: 'clean',
    currentBranch: 'main',
    changes: []
  },
  {
    id: 'repo15',
    name: 'Client Website',
    path: '/projects/client-website',
    status: 'dirty',
    currentBranch: 'client-fixes',
    changes: ['index.html', 'styles.css']
  },
  {
    id: 'repo16',
    name: 'Portfolio Site',
    path: '/projects/portfolio',
    status: 'untracked',
    currentBranch: 'feature-gallery',
    changes: ['gallery.vue']
  },
  {
    id: 'repo17',
    name: 'CRM System',
    path: '/projects/crm',
    status: 'clean',
    currentBranch: 'main',
    changes: []
  },
  {
    id: 'repo18',
    name: 'Mobile App',
    path: '/projects/mobile-app',
    status: 'dirty',
    currentBranch: 'ios-tweak',
    changes: ['App.swift']
  },
  {
    id: 'repo19',
    name: 'Scheduler',
    path: '/projects/scheduler',
    status: 'untracked',
    currentBranch: 'feature-calendar',
    changes: ['calendar.js', 'event.js']
  },
  {
    id: 'repo20',
    name: 'Video Platform',
    path: '/projects/video-platform',
    status: 'clean',
    currentBranch: 'main',
    changes: []
  }
]);
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
