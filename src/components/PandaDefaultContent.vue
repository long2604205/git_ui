<template>
  <div class="container-fluid main-container">
    <div class="row main-layout-container h-100">
      <!--Repository Workspace-->
      <panda-repository-workspace/>

      <div class="col main-content">
        <!--Toolbar-->
        <button class="btn-primary" @click="showAlert">Hiện thông báo</button>
        <panda-toolbar/>

        <!--Commit Panel-->
        <panda-commit-panel/>
      </div>
    </div>
  </div>
  <alert-notification
    v-if="show"
    :message="alertMessage"
    :type="alertType"
    :duration="3000"
  />
</template>
<script setup>
import PandaRepositoryWorkspace from '@/components/PandaRepositoryWorkspace.vue'
import PandaToolbar from '@/components/PandaToolbar.vue'
import PandaCommitPanel from '@/components/PandaCommitPanel.vue'
import { ref } from 'vue'
import AlertNotification from '@/components/modals/AlertNotification.vue'
const show = ref(false)
const alertMessage = ref('')
const alertType = ref('info')

const showAlert = () => {
  alertMessage.value = 'Thành công rồi nhé!'
  alertType.value = 'success'
  show.value = true
  setTimeout(() => (show.value = false), 3000)
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
