<script setup lang="ts">
import { TimeSpent } from '@/app/types'
import { Duration } from 'luxon'

const props = defineProps<{ data: TimeSpent }>()

// Conversion avec Luxon
const duration = Duration.fromObject({ minutes: props.data.minutes })
const hours = duration.as('hours').toFixed(0)
const days = duration.as('days').toFixed(1)
</script>

<template>
  <div class="h-full w-full flex items-center justify-center flex-col gap-8 text-center">
    en tout, vous avez passé
    <div class="mt-6">
      <h1 class="text-7xl text-accent">{{ data.minutes }}</h1>
      minutes
    </div>
    <div>
      <h1 class="text-7xl text-accent">{{ hours }}</h1>
      heures
    </div>
    <div class="mb-6">
      <h1 class="text-7xl text-accent">{{ days }}</h1>
      jours
    </div>
    à regarder des films
  </div>
</template>
