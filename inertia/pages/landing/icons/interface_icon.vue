<script setup lang="ts">
const { width = '24', height = '24' } = defineProps<{ width?: string; height?: string }>()
</script>

<template>
  <svg
    class="text-accent"
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    fill="currentColor"
    viewBox="0 0 256 256"
  >
    <path
      d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V96H40V56ZM40,112H96v88H40Zm176,88H112V112H216v88Z"
    ></path>
  </svg>
</template>
