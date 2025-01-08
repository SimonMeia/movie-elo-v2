<script setup lang="ts">
import { YearlyMovies } from '@/app/types'

defineProps<{ data: YearlyMovies }>()
</script>

<template>
  <div class="h-full w-full flex items-center justify-center flex-col gap-2">
    <span class="">vous avez regardé</span>
    <h1 class="text-9xl text-accent">{{ data.value }}</h1>
    <span class="">films cette année</span>
    <div class="absolute left-0 w-full text-center bottom-8">
      c'est <span class="text-xl font-bold">1</span> film tous les
      <span class="text-xl font-bold">{{ data.frequencyInDays.toFixed() }}</span> jours
    </div>
  </div>
</template>
