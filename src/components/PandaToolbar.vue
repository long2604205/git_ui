<template>
  <div class="toolbar-panel">
    <div class="row">
      <div class="col-md-12 d-flex">
        <div class="toolbar-buttons">
          <button class="btn btn-toolbar"
                  @click="cloneRepository"
          >
            <i class="fas fa-clone"></i>
            <span class="label-toolbar">Clone</span>
          </button>
        </div>
        <div class="toolbar-buttons">
          <button
            class="btn btn-toolbar"
            @click="pushRepository"
          >
            <i class="fas fa-upload"></i>
            <span class="label-toolbar">Push</span>
          </button>
        </div>
        <div class="toolbar-buttons">
          <button
            class="btn btn-toolbar"
            @click="pullRepository"
          >
            <i class="fas fa-download"></i>
            <span class="label-toolbar">Pull</span>
          </button>
        </div>
        <div class="toolbar-buttons">
          <button class="btn btn-toolbar">
            <i class="fa-solid fa-code-compare"></i>
            <span class="label-toolbar">Fetch</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="toolbar-line"></div>
</template>
<script setup>
import { showPageInModal } from '@/services/modals.js'
import PandaCloneForm from '@/components/modals/PandaCloneForm.vue'
import api from '@/plugins/api.js'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import mitter from '@/plugins/mitter.js'
const repoPath = ref('')

const cloneRepository = () => {
  showPageInModal(PandaCloneForm, {}, { width: '30%' })
}

onMounted(() => {
  mitter.on('push-repository', (path) => {
    repoPath.value = path
  })
});

onBeforeUnmount(() => {
  mitter.off('push-repository')
})

async function pushRepository() {
  try {
    const res = await api.post('/push', {
      repo_path: repoPath.value
    });
    alert(res.data.message || 'Push thành công!')
  } catch (error) {
    alert(error.response?.data?.message || 'Lỗi Push!')
    console.error(error)
  }
}

async function pullRepository() {
  try {
    const res = await api.post('/pull', {
      repo_path: repoPath.value
    });
    alert(res.data.message || 'Pull thành công!')
  } catch (error) {
    alert(error.response?.data?.message || 'Lỗi pull!')
    console.error(error)
  }
}
</script>
<style scoped>
.toolbar-panel {
  background-color: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-color);
  height: 36px;
  min-height: 36px;
  align-items: center;
}

.btn-toolbar {
  color: var(--text-secondary);
  align-items: center;
  font-size: 14px;
}

.label-toolbar{
  margin-left: 5px;
}

.toolbar-line {
  width: 100%;
  height: 5px;
  background-color: var(--border-color);
  user-select: none;
}

button:focus,
button:active {
  box-shadow: none !important;
  border-color: transparent !important;
}
</style>
