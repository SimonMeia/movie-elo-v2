<script setup lang="ts">
import { PreferredGenres } from '@/app/types'

defineProps<{ data: PreferredGenres }>()
</script>

<template>
  <div class="h-full w-full flex items-center justify-center flex-col gap-16 text-center">
    <div>
      <span>Vous avez exploré </span>
      <h2 class="text-accent text-5xl inline">{{ data.totalGenres }}</h2>
      <span> genres de films</span>
    </div>
    <div class="flex justify-start flex-col gap-6">
      <div class="flex gap-1 flex-col">
        <h1 class="text-6xl text-accent">{{ data.topGenres[0].name }}</h1>
        <span>{{ data.topGenres[0].numberOfMovies }} films</span>
      </div>
      <div class="flex gap-1 flex-col">
        <h1 class="text-5xl text-accent">{{ data.topGenres[1].name }}</h1>
        <span>{{ data.topGenres[1].numberOfMovies }} films</span>
      </div>
      <div class="flex gap-1 flex-col">
        <h1 class="text-4xl text-accent">{{ data.topGenres[2].name }}</h1>
        <span>{{ data.topGenres[2].numberOfMovies }} films</span>
      </div>
    </div>
  </div>
</template>
