<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark-custom top-navbar">
    <div class="container-fluid px-2">
      <!-- left menu -->
      <div class="navbar-nav flex-row">
        <panda-menu-dropdown label="File" :items="fileMenu" />
        <panda-menu-dropdown label="View" :items="viewMenu" />
        <panda-menu-dropdown label="Git" :items="gitMenu" />
        <panda-menu-dropdown label="Window" :items="windowMenu" />
        <panda-menu-dropdown label="Help" :items="helpMenu" />
      </div>

      <!-- window controls-->
      <div class="ms-auto d-flex align-items-center">
        <div class="project-info me-3">
          <span class="current-repo-info" id="current-repo-info">
            <i class="fas fa-code-branch text-warning me-1"></i>
            <span class="text-warning">No repository selected</span>
          </span>
        </div>
        <div class="window-controls">
          <button class="btn btn-sm window-btn" id="minimize-btn">
            <i class="fas fa-minus"></i>
          </button>
          <button class="btn btn-sm window-btn" id="maximize-btn">
            <i class="fas fa-square"></i>
          </button>
          <button class="btn btn-sm window-btn close-btn" id="close-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import PandaMenuDropdown from './PandaMenuDropdown.vue'

const fileMenu = [
  { icon: 'fas fa-plus', label: 'New Project', action: 'new-project' },
  { icon: 'fas fa-folder-open', label: 'Open Project', action: 'open-project' },
  { icon: 'fas fa-code-branch', label: 'Open Repository', action: 'open-repo' },
  'divider',
  { icon: 'fas fa-times', label: 'Close Project', action: 'close-project' },
  { icon: 'fas fa-sign-out-alt', label: 'Exit', action: 'exit' }
]

const viewMenu = [
  { icon: 'fas fa-sidebar', label: 'Toggle Sidebar', action: 'toggle-sidebar' },
  { icon: 'fas fa-th-large', label: 'Toggle Workspace', action: 'toggle-workspace' },
  'divider',
  { icon: 'fas fa-expand', label: 'Full Screen' }
]

const gitMenu = [
  { icon: 'fas fa-clone', label: 'Clone', action: 'git-clone' },
  { icon: 'fas fa-plus-circle', label: 'Initialize Repository', action: 'git-init' },
  'divider',
  { icon: 'fas fa-check', label: 'Commit', action: 'git-commit' },
  { icon: 'fas fa-upload', label: 'Push', action: 'git-push' },
  { icon: 'fas fa-download', label: 'Pull', action: 'git-pull' },
  'divider',
  { icon: 'fas fa-code-branch', label: 'Branches', action: 'git-branches' },
  { icon: 'fas fa-code-merge', label: 'Merge', action: 'git-merge' }
]

const windowMenu = [
  { icon: 'fas fa-window-minimize', label: 'Minimize' },
  { icon: 'fas fa-window-maximize', label: 'Maximize' },
  { icon: 'fas fa-window-close', label: 'Close' }
]

const helpMenu = [
  { icon: 'fas fa-question-circle', label: 'Help Topics' },
  { icon: 'fas fa-info-circle', label: 'About' }
]
</script>
<style scoped>
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--scrollbar-track);
}

::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #666666;
}

::-webkit-scrollbar-corner {
  background: var(--scrollbar-track);
}

/* Top Navbar */
.top-navbar {
  background-color: var(--bg-secondary) !important;
  border-bottom: 1px solid var(--border-color);
  padding: 0;
  min-height: 32px;
  z-index: 1000;
}

.top-navbar .nav-link {
  color: var(--text-secondary) !important;
  font-size: 12px;
  padding: 6px 12px !important;
  transition: all 0.2s ease;
  border: none;
}

.top-navbar .nav-link:hover {
  color: var(--text-primary) !important;
  background-color: var(--bg-hover);
}

.dropdown-menu-dark {
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow);
}

.dropdown-menu-dark .dropdown-item {
  color: var(--text-secondary);
  font-size: 12px;
  padding: 6px 12px;
}

.dropdown-menu-dark .dropdown-item:hover {
  background-color: var(--bg-hover);
  color: var(--text-primary);
}

.dropdown-divider {
  border-color: var(--border-color);
}

.project-info {
  font-size: 12px;
  color: var(--text-secondary);
}

.window-controls {
  display: flex;
  gap: 2px;
}

.window-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  width: 32px;
  height: 24px;
  font-size: 10px;
  transition: all 0.2s ease;
}

.window-btn:hover {
  background-color: var(--bg-hover);
  color: var(--text-primary);
}

.close-btn:hover {
  background-color: var(--accent-danger) !important;
  color: white !important;
}
</style>
