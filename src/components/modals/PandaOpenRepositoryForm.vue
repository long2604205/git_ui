<template>
  <div class="modal fade" id="cloneRepoModal" tabindex="-1" ref="modalRef">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Open Repository</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="clone-path" class="form-label">Repository Path</label>
            <div class="input-group">
              <input v-model="pathRepositories" type="text" class="form-control" id="clone-path" placeholder="Local directory path">
              <button
                class="btn btn-open-local"
                type="button"
                id="browse-clone"
                @click="chooseFolder">
                <i class="fas fa-folder-open"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-cancel" data-bs-dismiss="modal">Cancel</button>
          <button
            type="button"
            class="btn btn-clone"
            id="clone-repo-confirm"
            @click="openRepository"
          >
            <span>Open</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'
import mitter from '@/plugins/mitter.js'

const modalRef = ref(null)
const pathRepositories = ref('')
let modalInstance = null

onMounted(() => {
  if (modalRef.value) {
    modalInstance = new Modal(modalRef.value)
  }
})

const chooseFolder = async () => {
  const selected = await window.electronAPI?.selectFolder()
  if (selected) {
    pathRepositories.value = selected
  }
}

function openRepository (){
  mitter.emit('open-repository', pathRepositories.value)
}

const openModal = () => {
  if (modalInstance) modalInstance.show()
}

const closeModal = () => {
  if (modalInstance) modalInstance.hide()
}

defineExpose({
  openModal,
  closeModal
})
</script>
<style scoped>
*{
  font-size: 14px;
}
.modal-content {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.modal-header {
  border-bottom: 1px solid var(--border-color);
}

.modal-footer {
  border-top: 1px solid var(--border-color);
}

 .btn-cancel, .btn-clone, .btn-clone:disabled {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  border: var(--bg-tertiary);
  font-size: 14px;
  font-weight: 500;
}
.btn-clone:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}
.btn-cancel:hover {
  background: var(--bs-red);
  color: var(--text-primary);
}

input {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  font-size: 14px;
  resize: none;
  min-height: 80%;
}

input::placeholder {
  color: var(--text-muted);
}

input:focus {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  box-shadow: none;
}

input:focus-visible {
  outline: none;
  border: 1px solid var(--border-color);
}

.btn-open-local {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  border: var(--bg-tertiary);
  font-size: 14px;
  font-weight: 500;
}

.btn-open-local:hover {
  background: var(--bg-tertiary);
}
</style>
