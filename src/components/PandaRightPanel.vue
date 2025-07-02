<template>
  <div class="col-auto right-panel" id="right-panel">
    <div class="commit-details">
      <div class="details-header">
        <h6 class="mb-0">
          <i class="fas fa-info-circle me-2"></i>Details
        </h6>
        <button class="btn btn-sm panel-action-btn" id="details-toggle">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
      <div class="details-content" id="details-content">
        <div class="no-selection text-center text-muted py-4">
          <i class="fas fa-mouse-pointer fa-2x mb-2"></i>
          <p>No selection</p>
          <small>Select a commit or file to view details</small>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

</script>
<style scoped>
.right-panel {
  width: 350px;
  background-color: var(--bg-secondary);
  border-left: 1px solid var(--border-color);
  transition: width 0.3s ease;
}

.right-panel.collapsed {
  width: 0;
  overflow: hidden;
}

.commit-details {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.details-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-color);
  min-height: 32px;
}

.details-header h6 {
  font-size: 12px;
  font-weight: 500;
  margin: 0;
}

.details-content {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
}

.commit-details-header {
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 12px;
  margin-bottom: 16px;
}

.commit-details-header h6 {
  font-size: 14px;
  margin-bottom: 8px;
  word-wrap: break-word;
}

.commit-meta {
  font-size: 11px;
  color: var(--text-muted);
  line-height: 1.4;
}

.changed-files h6 {
  font-size: 12px;
  margin-bottom: 12px;
  color: var(--text-secondary);
}

.file-diff {
  margin-bottom: 16px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}

.diff-header {
  background-color: var(--bg-tertiary);
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 500;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.diff-stats {
  font-size: 11px;
  color: var(--text-muted);
}

.diff-content {
  background-color: var(--bg-primary);
  font-family: "Courier New", monospace;
  font-size: 11px;
  max-height: 200px;
  overflow-y: auto;
}

.diff-line {
  padding: 2px 8px;
  white-space: pre;
  line-height: 1.4;
}

.diff-line.added {
  background-color: rgba(129, 199, 132, 0.2);
  color: var(--accent-success);
}

.diff-line.removed {
  background-color: rgba(229, 115, 115, 0.2);
  color: var(--accent-danger);
}

.diff-line.context {
  color: var(--text-secondary);
}

.diff-line.header {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  font-weight: 500;
}
</style>
