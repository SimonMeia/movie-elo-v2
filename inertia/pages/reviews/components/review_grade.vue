<script setup lang="ts">
defineProps<{
  maxGrade: number
  grade: number
  name: string
}>()
</script>

<template>
  <div class="text-center">
    <div>
      <span class="text-3xl font-bold font-titles text-accent"> {{ grade }}</span>
      <span> / {{ maxGrade }}</span>
    </div>
    <span class="w-20"> {{ name.charAt(0).toUpperCase() + name.slice(1) }}</span>
  </div>
</template>
