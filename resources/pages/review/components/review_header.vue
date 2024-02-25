<script setup lang="ts">
defineProps<{
  backdropPath: string
  title: string
  synopsis: string
}>()
</script>

<template>
  <div class="relative w-full h-12rem">
    <img
      :src="`https://image.tmdb.org/t/p/original${backdropPath}`"
      alt="movie poster"
      class="w-full h-full"
      style="object-fit: cover"
    />
    <div class="w-screen h-full absolute top-0 left-0 bg-black-alpha-90 opacity-50"></div>
    <h1 class="p-container absolute bottom-0 left-0 z-5 text-white text-2xl font-normal">{{ title }}</h1>
  </div>
</template>

<style scoped></style>
