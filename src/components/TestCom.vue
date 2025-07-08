<template>
  <base-form v-model="visible" title="Open Repo">
    <template #content>
      <div class="mb-3">
        <label>Repo URL</label>
        <input class="form-control" />
      </div>
    </template>
  </base-form>
</template>

<script setup>
import { ref } from 'vue'
import BaseForm from '@/components/modals/BaseForm.vue'
const visible = ref(false)
</script>

<style scoped>
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
</style>
