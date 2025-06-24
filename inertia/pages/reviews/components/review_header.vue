<script setup lang="ts">
defineProps<{
  backdropPath: string | null
  title: string
  synopsis: string
}>()
</script>

<template>
  <div class="relative w-full h-56">
    <img
      :src="`https://image.tmdb.org/t/p/original${backdropPath}`"
      alt="movie poster"
      class="object-cover w-full h-full"
    />
    <div class="absolute top-0 left-0 w-screen h-full bg-black opacity-20"></div>
    <div class="absolute bottom-0 left-0 w-full">
      <h1 class="container pb-6 font-normal text-white">
        {{ title }}
      </h1>
    </div>
  </div>
</template>
