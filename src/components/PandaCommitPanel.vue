<template>
  <div class="commit-panel">
    <!-- Header -->
    <div class="panel-header">
      <h6 class="mb-0">
        <i class="fas fa-check me-2"></i>Changes
        <span class="changes-count">({{ changes.length }})</span>
      </h6>
      <div class="panel-actions">
        <button class="btn btn-sm panel-action-btn" title="Refresh" @click="$emit('refresh')">
          <i class="fas fa-sync"></i>
        </button>
        <button class="btn btn-sm panel-action-btn" title="Show Ignored Files">
          <i class="fas fa-eye-slash"></i>
        </button>
        <button class="btn btn-sm panel-action-btn" title="Collapse All">
          <i class="fas fa-compress"></i>
        </button>
      </div>
    </div>

    <!-- Changes List -->
    <div class="changes-list">
      <template v-if="changes.length === 0">
        <div class="no-changes-message text-center text-muted py-4">
          <i class="fas fa-check-circle fa-2x mb-2"></i>
          <p>No changes</p>
          <small>All files are up to date</small>
        </div>
      </template>

      <template v-else>
        <div
          v-for="(change, index) in changes"
          :key="index"
          class="change-item"
          @click="onChangeClick(change, index)"
        >
          <input type="checkbox" class="form-check-input change-checkbox" v-model="change.checked" @click.stop>
          <div class="change-status" :class="change.status">
            {{ change.type }}
          </div>
          <span class="change-file" :title="change.file">{{ change.file }}</span>
        </div>
      </template>
    </div>

    <!-- Commit Form -->
    <div class="commit-form">
      <div class="commit-options mb-2">
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" v-model="amend">
          <label class="form-check-label text-light">Amend</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" v-model="signOff">
          <label class="form-check-label text-light">Sign-off</label>
        </div>
      </div>

      <textarea
        class="form-control commit-message"
        placeholder="Commit message"
        v-model="commitMessage"
        rows="3"
      ></textarea>

      <div class="commit-actions mt-2">
        <button
          class="btn btn-primary btn-sm me-2"
          :disabled="!canCommit"
          @click="$emit('commit', { message: commitMessage, changes })"
        >
          <i class="fas fa-check me-1"></i>Commit
        </button>

        <div class="btn-group">
          <button
            class="btn btn-outline-primary btn-sm"
            :disabled="!canCommit"
            @click="$emit('commit-push', { message: commitMessage, changes })"
          >
            <i class="fas fa-upload me-1"></i>Commit and Push
          </button>
          <button class="btn btn-outline-primary btn-sm dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"></button>
          <ul class="dropdown-menu dropdown-menu-dark">
            <li><a class="dropdown-item" href="#" @click.prevent="$emit('force-push')">
              <i class="fas fa-exclamation-triangle me-2"></i>Force Push
            </a></li>
            <li><a class="dropdown-item" href="#" @click.prevent="$emit('push-tags')">
              <i class="fas fa-tags me-2"></i>Push with Tags
            </a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  repository: {
    type: Object,
    default: () => ({
      changes: []
    })
  }
})

const amend = ref(false)
const signOff = ref(false)
const commitMessage = ref("")
const changes = ref([...props.repository.changes.map(c => ({ ...c, checked: true }))])

watch(() => props.repository, (newRepo) => {
  changes.value = [...(newRepo?.changes || []).map(c => ({ ...c, checked: true }))]
})

const canCommit = computed(() => commitMessage.value.trim() !== "" && changes.value.some(c => c.checked))

const onChangeClick = (change, index) => {
  // Optional: highlight/select action
  console.log("Selected change:", change)
}
</script>

<style scoped>
.commit-panel {
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  height: 320px;
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-color);
  min-height: 32px;
}

.panel-header h6 {
  font-size: 12px;
  font-weight: 500;
  margin: 0;
}

.changes-count {
  color: var(--text-muted);
  font-weight: normal;
}

.panel-actions {
  display: flex;
  gap: 4px;
}

.panel-action-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 12px;
  width: 24px;
  height: 24px;
  border-radius: 2px;
  transition: all 0.2s ease;
}

.panel-action-btn:hover {
  color: var(--text-primary);
  background-color: var(--bg-hover);
}

.changes-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.change-item {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  margin-bottom: 2px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.change-item:hover {
  background-color: var(--bg-hover);
}

.change-item.selected {
  background-color: var(--accent-primary);
  color: var(--bg-primary);
}

.change-checkbox {
  margin-right: 8px;
}

.change-status {
  width: 16px;
  height: 16px;
  border-radius: 2px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  flex-shrink: 0;
}

.change-status.modified {
  background-color: var(--accent-warning);
  color: var(--bg-primary);
}

.change-status.added {
  background-color: var(--accent-success);
  color: var(--bg-primary);
}

.change-status.deleted {
  background-color: var(--accent-danger);
  color: white;
}

.change-status.renamed {
  background-color: var(--accent-info);
  color: var(--bg-primary);
}

.change-file {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.commit-form {
  padding: 12px;
  background-color: var(--bg-tertiary);
  border-top: 1px solid var(--border-color);
}

.commit-options {
  display: flex;
  gap: 16px;
}

.form-check-input {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
}

.form-check-input:checked {
  background-color: var(--accent-primary);
  border-color: var(--accent-primary);
}

.commit-message {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  font-size: 12px;
  resize: vertical;
  min-height: 60px;
}

.commit-message:focus {
  background-color: var(--bg-primary);
  border-color: var(--accent-primary);
  color: var(--text-primary);
  box-shadow: 0 0 0 0.2rem rgba(255, 183, 77, 0.25);
}

.commit-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
