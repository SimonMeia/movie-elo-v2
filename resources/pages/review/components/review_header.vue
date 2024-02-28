<script setup lang="ts">
defineProps<{
  backdropPath: string
  title: string
  synopsis: string
}>()
</script>

<template>
  <div class="relative w-full h-48">
    <img
      :src="`https://image.tmdb.org/t/p/original${backdropPath}`"
      alt="movie poster"
      class="object-cover w-full h-full"
    />
    <div class="absolute top-0 left-0 w-screen h-full opacity-50 bg-black-alpha-90"></div>
    <h1 class="absolute bottom-0 left-0 pb-6 text-2xl font-normal text-white p-container z-5">
      {{ title }}
    </h1>
  </div>
</template>

<style scoped></style>
