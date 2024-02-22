<script setup lang="ts">
const props = defineProps<{
  maxGrade: number
  grade: number
  name: string
}>()
</script>

<template>
  <div class="w-6 grid text-sm">
    <span class="col-6 pr-0">{{ name.charAt(0).toUpperCase() + name.slice(1) }} : </span>
    <span class="col"> {{ grade }}</span>
  </div>
</template>

<style scoped></style>
