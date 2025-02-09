<script setup lang="ts">
import RewindIcon from '@/pages/landing/icons/rewind_icon.vue'
import SortIcon from '@/pages/landing/icons/sort_icon.vue'
import EasyIcon from '@/pages/landing/icons/easy_icon.vue'
import StatsIcon from '@/pages/landing/icons/stats_icon.vue'
import TmdbIcon from '@/pages/landing/icons/tmdb_icon.vue'

const cards = [
  {
    icon: RewindIcon,
    title: 'Rewind',
    description:
      'A la manière de Spotify,  Movie Elo vous offre le récapitulatif moments de cinéma en fin d’année.',
  },
  {
    icon: SortIcon,
    title: 'Tri et recherche',
    description: 'Triez, filtrez, et recherchez facilement un film parmi vos reviews Movie Elo',
  },
  {
    icon: TmdbIcon,
    title: 'Information sur les films',
    description:
      'Movie Elo affiche les informations des films grâce à l’intégration des données de The Movie Database',
  },
  {
    icon: StatsIcon,
    title: 'Statistiques',
    description:
      'Explorez vos statistiques et découvrez les tendance qui se dégage de vos habitudes de films',
  },
  {
    icon: EasyIcon,
    title: 'Ajout de films simplifié',
    description:
      'Une fois votre système de notation mis en place il est super simple d’ajouter un nouveau film visionné',
  },
  {
    icon: RewindIcon,
    title: '??',
    description: '??',
  },
]
</script>

<template>
  <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3" id="other-features">
    <div
      v-for="(card, index) in cards"
      :key="index"
      class="flex flex-col w-full p-6 border shadow-lg border-accent rounded-xl"
    >
      <div class="p-2 bg-gray-100 border-2 border-gray-300 rounded-md shadow-md w-fit">
        <component :is="card.icon" />
      </div>
      <h3 class="mt-4 mb-2 text-xl font-tifont-titles">{{ card.title }}</h3>
      <p>{{ card.description }}</p>
    </div>
  </div>
</template>

<style scoped></style>
