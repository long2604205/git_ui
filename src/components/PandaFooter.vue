<template>
  <div class="status-bar">
    <div class="d-flex align-items-center justify-content-between px-3">
      <div class="status-left">
                <span class="status-item">
                    <i class="fas fa-code me-1"></i>PHP: 8.2
                </span>
        <span class="status-item" id="current-repo-status">
                    <i class="fas fa-folder me-1"></i>No repository
                </span>
        <span class="status-item" id="current-branch-status">
                    <i class="fas fa-code-branch me-1"></i>-
                </span>
        <span class="status-item" id="git-status">
                    <i class="fas fa-circle text-success me-1"></i>Clean
                </span>
      </div>
      <div class="status-right">
                <span class="status-item">
                    <i class="fas fa-palette me-1"></i>Material Darker
                </span>
        <span class="status-item">
                    <i class="fas fa-memory me-1"></i>512MB
                </span>
        <span class="status-item">
                    <i class="fas fa-clock me-1"></i><span id="current-time"></span>
                </span>
      </div>
    </div>
  </div>
</template>
<script setup>
</script>
<style scoped>
.status-bar {
  background-color: var(--bg-tertiary);
  border-top: 1px solid var(--border-color);
  min-height: 24px;
  font-size: 11px;
  color: var(--text-secondary);
}

.status-item {
  margin-right: 16px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
