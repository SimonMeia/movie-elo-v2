<script setup lang="ts">
defineProps<{
  backdropPath: string
  title: string
  synopsis: string
}>()
</script>

<template>
  <div>
    <div class="absolute top-0 left-0 w-screen h-12rem">
      <img
        :src="`https://image.tmdb.org/t/p/original${backdropPath}`"
        alt="movie poster"
        class="w-screen h-full absolute top-0 left-0"
        style="object-fit: cover"
      />
      <div class="w-screen h-full absolute top-0 left-0 bg-black-alpha-90 opacity-50"></div>
    </div>
    <div class="flex flex-column justify-content-end h-12rem relative">
      <h1 class="text-white text-2xl font-normal">{{ title }}</h1>
    </div>
  </div>
</template>

<style scoped></style>
