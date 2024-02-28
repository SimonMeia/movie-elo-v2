<script setup lang="ts">
const props = defineProps<{
  maxGrade: number
  grade: number
  name: string
}>()
</script>

<template>
  <div class="flex flex-row items-center w-1/2 my-2 text-sm md:w-1/3">
    <span class="w-20"> {{ name.charAt(0).toUpperCase() + name.slice(1) }} : </span>
    <div>
      <span class="text-xl font-bold"> {{ grade }}</span>
      <span> / {{ maxGrade }}</span>
    </div>
  </div>
</template>

<style scoped></style>
