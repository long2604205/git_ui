<template>
  <div class="commit-panel">
    <!-- Header -->
    <div class="panel-header">
      <h6 class="mb-0">
        <i class="fa-solid fa-code-commit me-2"></i>Commit
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

    <div class="row commit-workspace">
      <div class="changes-list col-6">
        <panda-changes-file-tree/>
      </div>

      <div class="commit-form col-6">
        <textarea
          class="form-control commit-message"
          placeholder="Commit message"
          v-model="commitMessage"
        ></textarea>
        <div class="commit-actions mt-3 d-flex justify-content-between align-items-center">
          <!-- Left: Checkbox -->
          <div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="amend"
                id="amend-checkbox"
              />
              <label class="form-check-label text-light" for="amend-checkbox">Amend</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="signOff"
                id="signoff-checkbox"
              />
              <label class="form-check-label text-light" for="signoff-checkbox">Sign-off</label>
            </div>
          </div>

          <!-- Right: Buttons -->
          <div>
            <button
              class="btn btn-commit btn-sm me-2"
              :disabled="!canCommit"
              @click="$emit('commit', { message: commitMessage, changes })"
            >
              Commit
            </button>

            <button
              class="btn btn-commit-push btn-sm"
              :disabled="!canCommit"
              @click="$emit('commit-push', { message: commitMessage, changes })"
            >
              Commit and Push
            </button>
          </div>
        </div>
      </div>
      <div class="line-style-content"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import PandaChangesFileTree from '@/components/PandaChangesFileTree.vue'

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
  height: 320px;
  display: flex;
  flex-direction: column;
  container-type: inline-size;
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

.commit-workspace {
  margin: 0;
  height: 100%;
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
  overflow-y: scroll;
  max-height: 280px;
  padding: 8px 8px 0 8px;
  border-right: solid 2px var(--border-color);
}

.commit-form {
  padding: 8px 8px 0 8px;
  background-color: var(--bg-secondary);
  border-left: solid 2px var(--border-color);
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
  background-color: var(--bg-secondary);
  border: none;
  color: var(--text-primary);
  font-size: 14px;
  resize: none;
  min-height: 80%;
}

.commit-message::placeholder {
  color: var(--text-muted);
}

.commit-message:focus {
  background-color: var(--bg-secondary);
  border: none;
  color: var(--text-primary);
  box-shadow: none;
}

.commit-message:focus-visible {
  outline: none;
  border: none;
}

.commit-actions {
  display: flex;
  align-items: center;
}

.btn-commit, .btn-commit-push, .btn-commit:disabled, .btn-commit-push:disabled  {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  border: var(--bg-tertiary);
  font-size: 14px;
  font-weight: 500;
}
.btn-commit:hover,.btn-commit-push:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.line-style-content {
  height: 5px;
  background: var(--bg-tertiary);
}

@container (max-width: 850px) {
  .commit-form,
  .changes-list {
    width: 100% !important;
    flex: 0 0 100%;
    max-width: 100%;
    border-left: unset;
    border-right: unset;
  }

  .commit-form {
    height: 150px;
    border-top: 2px solid var(--border-color);
  }

  .changes-list {
    border-bottom: 2px solid var(--border-color);
  }

  .commit-message {
    min-height: 65%;
  }
}
</style>
