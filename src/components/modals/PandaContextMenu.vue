<!-- components/ContextMenu.vue -->
<template>
  <ul
    v-if="visible"
    class="context-menu"
    :style="{ top: y + 'px', left: x + 'px' }"
    @click.stop
  >
    <li v-for="(item, index) in items" :key="index" @click="handleClick(item)">
      {{ item.label }}
    </li>
  </ul>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['select'])

const visible = ref(false)
const x = ref(0)
const y = ref(0)

function openContextMenu(event) {
  event.preventDefault()
  visible.value = true
  x.value = event.clientX
  y.value = event.clientY
  document.addEventListener('click', closeMenu)
}

function closeMenu() {
  visible.value = false
  document.removeEventListener('click', closeMenu)
}

function handleClick(item) {
  emit('select', item)
  closeMenu()
}

onBeforeUnmount(() => {
  document.removeEventListener('click', closeMenu)
})

defineExpose({ openContextMenu })
</script>

<style scoped>
.context-menu {
  position: fixed;
  background-color: white;
  border: 1px solid #ccc;
  padding: 4px 0;
  list-style: none;
  margin: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 180px;
}

.context-menu li {
  padding: 8px 12px;
  cursor: pointer;
}

.context-menu li:hover {
  background-color: #f0f0f0;
}
</style>
