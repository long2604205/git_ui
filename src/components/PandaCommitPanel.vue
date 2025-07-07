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
<!--        <div class="file-tree">-->
<!--          &lt;!&ndash; Changes Section &ndash;&gt;-->
<!--          <div-->
<!--            class="section-header"-->
<!--            :class="{ collapsed: !changesSectionExpanded }"-->
<!--          >-->
<!--            <i-->
<!--              class="fas fa-caret-down collapse-icon"-->
<!--              :class="{ collapsed: !changesSectionExpanded }"-->
<!--              @click="toggleChangesSection"-->
<!--            ></i>-->
<!--            <input-->
<!--              type="checkbox"-->
<!--              class="file-checkbox"-->
<!--            >-->
<!--            <span class="section-title">Changes {{ changedFiles.length }} files</span>-->
<!--          </div>-->
<!--          <transition name="collapse">-->
<!--            <div v-show="changesSectionExpanded" class="section-content">-->
<!--              <ul class="file-list">-->
<!--                <li-->
<!--                  v-for="file in changedFiles"-->
<!--                  :key="file.id"-->
<!--                  class="file-item"-->
<!--                >-->
<!--                  <input-->
<!--                    type="checkbox"-->
<!--                    class="file-checkbox"-->
<!--                    :id="`file-${file.id}`"-->
<!--                    v-model="file.selected"-->
<!--                    @click="toggleFileSelection(file, $event)"-->
<!--                    @click.stop-->
<!--                    @change="onFileSelectionChange(file)"-->
<!--                  >-->
<!--                  <i :class="getFileIconClass(file)"></i>-->
<!--                  <span class="file-name">{{ file.name }}</span>-->
<!--                  <span v-if="file.path" class="file-path">{{ file.path }}</span>-->
<!--                </li>-->
<!--              </ul>-->
<!--            </div>-->
<!--          </transition>-->

<!--          &lt;!&ndash; Unversioned Files Section &ndash;&gt;-->
<!--          <div-->
<!--            class="section-header"-->
<!--            :class="{ collapsed: !unversionedSectionExpanded }"-->
<!--          >-->
<!--            <i-->
<!--              class="fas fa-caret-down collapse-icon"-->
<!--              :class="{ collapsed: !unversionedSectionExpanded }"-->
<!--              @click="toggleUnversionedSection"-->
<!--            ></i>-->
<!--            <input-->
<!--              type="checkbox"-->
<!--              class="file-checkbox"-->
<!--            >-->
<!--            <span class="section-title">Unversioned Files {{ unversionedFiles.length }} file</span>-->
<!--          </div>-->
<!--          <transition name="collapse">-->
<!--            <div v-show="unversionedSectionExpanded" class="section-content">-->
<!--              <ul class="file-list">-->
<!--                <li-->
<!--                  v-for="file in unversionedFiles"-->
<!--                  :key="file.id"-->
<!--                  class="file-item"-->
<!--                >-->
<!--                  <input-->
<!--                    type="checkbox"-->
<!--                    class="file-checkbox"-->
<!--                    :id="`file-${file.id}`"-->
<!--                    v-model="file.selected"-->
<!--                    @click="toggleFileSelection(file, $event)"-->
<!--                    @click.stop-->
<!--                    @change="onFileSelectionChange(file)"-->
<!--                  >-->
<!--                  <i :class="getFileIconClass(file)"></i>-->
<!--                  <span class="file-name">{{ file.name }}</span>-->
<!--                  <span v-if="file.path" class="file-path">{{ file.path }}</span>-->
<!--                </li>-->
<!--              </ul>-->
<!--            </div>-->
<!--          </transition>-->
<!--        </div>-->
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
    </div>
    <div class="line-style-content"></div>
  </div>
  <panda-git-log-panel/>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import PandaChangesFileTree from '@/components/PandaChangesFileTree.vue'
import PandaGitLogPanel from '@/components/PandaGitLogPanel.vue'

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

watch(
  () => props.repository.changes,
  (newChanges) => {
    console.log('📌 props.repository.changes changed:', newChanges)
    changes.value = [...(newChanges || []).map(c => ({ ...c, checked: true }))]
  },
  { immediate: true }
)



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
  background: var(--border-color);
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

/*File changes Tree*/
.file-tree {
  border-radius: 4px;
  padding: 0;
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 14px;
  color: #ffffff;
}

.section-header {
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
  user-select: none;
}

.section-header:hover {
  border-radius: 10px;
  background-color: #4a4a4a;
}

.section-header.collapsed {
  border-bottom: none;
}

.collapse-icon {
  margin-right: 8px;
  font-size: 16px;
  transition: transform 0.2s;
  color: #ff9500;
}

.collapse-icon.collapsed {
  transform: rotate(-90deg);
}

.section-title {
  font-weight: 500;
  margin: 0;
}

.section-content {
  overflow: hidden;
}

.file-list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.file-item {
  padding: 6px 12px 6px 48px;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
  cursor: pointer;
}

.file-item:last-child {
  border-bottom: none;
}

.file-item:hover {
  border-radius: 10px;
  background-color: #4a4a4a;
}

.file-checkbox {
  margin-right: 8px;
  width: 14px;
  height: 14px;
  border: 1px solid #666;
  background-color: transparent;
  appearance: none;
  border-radius: 2px;
  position: relative;
  cursor: pointer;
}

.file-checkbox:checked {
  background-color: #007acc;
  border-color: #007acc;
}

.file-checkbox:checked::after {
  content: '✓';
  position: absolute;
  top: -2px;
  left: 1px;
  color: white;
  font-size: 10px;
  font-weight: bold;
}

.file-icon {
  margin-right: 8px;
  font-size: 12px;
  width: 14px;
  text-align: center;
}

.file-icon.css {
  color: #42a5f5;
}

.file-icon.vue {
  color: #4fc08d;
}

.file-icon.json {
  color: #ffd700;
}

.file-icon.js {
  color: #f7df1e;
}

.file-icon.html {
  color: #e34f26;
}

.file-icon.locked {
  color: #ff5252;
}

.file-name {
  flex-grow: 1;
  margin-right: 8px;
}

.file-path {
  color: #888;
  font-size: 11px;
}

/* Transition animations */
.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
}

.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
