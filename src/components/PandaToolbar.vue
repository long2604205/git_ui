<template>
  <div class="toolbar-panel">
    <div class="row">
      <div class="col-md-12 d-flex">
        <div class="toolbar-buttons">
          <button class="btn btn-toolbar">
            <i class="fas fa-clone"></i>
            <span class="label-toolbar">Clone</span>
          </button>
        </div>
        <div class="toolbar-buttons">
          <button class="btn btn-toolbar">
            <i class="fas fa-upload"></i>
            <span class="label-toolbar">Push</span>
          </button>
        </div>
        <div class="toolbar-buttons">
          <button class="btn btn-toolbar">
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
