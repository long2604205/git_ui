<template>
  <div class="container-fluid main-container">
    <div class="row main-layout-container h-100">
      <!--Repository Workspace-->
      <panda-repository-workspace/>

      <div class="col main-content">
        <!--Toolbar-->
        <panda-toolbar/>

        <!--Commit Panel-->
        <panda-commit-panel/>
      </div>
    </div>
  </div>
</template>
<script setup>
import PandaRepositoryWorkspace from '@/components/PandaRepositoryWorkspace.vue'
import PandaToolbar from '@/components/PandaToolbar.vue'
import PandaCommitPanel from '@/components/PandaCommitPanel.vue'
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
