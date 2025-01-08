<script setup lang="ts">
import { LongestShortesMovies } from '@/app/types'
import { Duration } from 'luxon'

const props = defineProps<{ data: LongestShortesMovies }>()

const longestDuration = Duration.fromObject({ minutes: props.data.longestRuntimeMin })
const longestHours = Math.floor(longestDuration.as('hours'))
const longestMinutes = longestDuration.minutes % 60

const shortestDuration = Duration.fromObject({ minutes: props.data.shortestRuntimeMin })
const shortestHours = Math.floor(shortestDuration.as('hours'))
const shortestMinutes = longestDuration.minutes % 60
</script>

<template>
  <div class="h-full flex items-center justify-center flex-col gap-24 mx-4">
    <div class="w-full flex gap-2 flex-col">
      <span>Film le plus long</span>
      <h1 class="text-5xl text-accent">{{ data.longestName }}</h1>
      <span class="text-xl">{{ longestHours }} heures {{ longestMinutes }} minutes</span>
    </div>
    <div class="w-full flex gap-2 flex-col text-right">
      <span>Film le plus court</span>
      <h1 class="text-5xl text-accent">{{ data.shortestName }}</h1>
      <span class="text-xl">{{ shortestHours }} heures {{ shortestMinutes }} minutes</span>
    </div>
  </div>
</template>
