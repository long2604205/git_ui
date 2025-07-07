<template>
  <div class="container-fluid main-container">
    <div class="row main-layout-container h-100">
      <panda-repository-workspace
        :repositories="repositories"
        :active-repository="activeRepository"
        :collapsed="isWorkspaceCollapsed"
        @set-active-repo="setActiveRepository"
        @toggle-workspace="toggleWorkspacePanel"
        @switch-branch="onSwitchBranch"
      />
      <div class="col main-content">
      </div>
    </div>
  </div>
</template>
<script setup>
import PandaRepositoryWorkspace from '@/components/PandaRepositoryWorkspace.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import api from '@/plugins/api.js'
import mitter from '@/plugins/mitter.js'


/*----Data----*/
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
    changes: [
      {
        id: 1,
        name: 'base.css',
        path: 'src\\assets',
        type: 'css',
        selected: false
      },
      {
        id: 2,
        name: 'PandaDefaultContent.vue',
        path: 'src\\components',
        type: 'vue',
        selected: false
      }
    ]
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
    changes: [
      {
        id: 1,
        name: 'main.css',
        path: 'src\\assets',
        type: 'css',
        selected: false
      },
      {
        id: 2,
        name: 'UserController.php',
        path: 'src\\components',
        type: 'vue',
        selected: false
      }
    ]
  }
])
const activeRepository = ref(null)
const isWorkspaceCollapsed = ref(false)

/*----Mounted----*/
onMounted(() => {
  if (repositories.value.length > 0 && !activeRepository.value) {
    activeRepository.value = repositories.value[0]
  }

  mitter.on('open-repository', (repoPath) => {
    handleOpenRepo(repoPath)
  })
})

onBeforeUnmount(() => {
  mitter.off('open-repository')
})

/*----Watch----*/

/*----Method----*/
function setActiveRepository(repo) {
  activeRepository.value = repo
}

async function handleOpenRepo(repoPath) {
  try {
    const response = await api.post('/git/open-repository', {
      // repo_path: "C:/Users/zhilo/OneDrive/Documents/Project/Training/auto_verse"
      repo_path: repoPath
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

function toggleWorkspacePanel() {
  isWorkspaceCollapsed.value = !isWorkspaceCollapsed.value
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
