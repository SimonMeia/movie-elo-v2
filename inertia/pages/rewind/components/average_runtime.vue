<script setup lang="ts">
import { AverageRuntime } from '@/app/types'
import { Duration } from 'luxon'

// Récupération des props
const props = defineProps<{ data: AverageRuntime }>()

// Conversion des minutes en durée Luxon
const duration = Duration.fromObject({ minutes: props.data.minutes })

// Extraction des heures et minutes
const hours = Math.floor(duration.as('hours')) // Arrondi à l'entier inférieur pour les heures
const minutes = duration.minutes % 60 // Récupère les minutes restantes après avoir extrait les heures
</script>

<template>
  <div class="h-full w-full flex items-center justify-center flex-col gap-2 text-center">
    <div class="flex gap-2 items-baseline">
      <h1 class="text-7xl text-accent">{{ hours }}</h1>
      <span class="text-2xl">heures</span>
      <h1 class="text-7xl text-accent">{{ minutes }}</h1>
      <span class="text-2xl">minutes</span>
    </div>
    <span>est la durée moyenne des films que vous regardez</span>
  </div>
</template>
