<script setup lang="ts">
const props = defineProps<{
  maxGrade: number
  grade: number
  name: string
}>()
</script>

<template>
  <div class="w-6 md:w-4 text-sm my-2 flex align-items-center">
    <span class="w-5rem">
      {{ name.charAt(0).toUpperCase() + name.slice(1) }} :
    </span>
    <div>
      <span class="text-xl font-bold"> {{ grade }}</span>
      <span> / {{ maxGrade }}</span>
    </div>
  </div>
</template>

<style scoped></style>
