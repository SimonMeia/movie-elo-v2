<script setup lang="ts">
import RewindIcon from '@/pages/landing/icons/rewind_icon.vue'

const cards = [
  {
    icon: RewindIcon,
    title: 'Rewind',
    description:
      "Obtenez une vue d'ensemble des films que vous avez regardez et des critiques de vos amis",
  },
  {
    icon: RewindIcon,
    title: 'TMDB',
    description:
      "Obtenez une vue d'ensemble des films que vous avez regardez et des critiques de vos amis",
  },
  {
    icon: RewindIcon,
    title: 'Statistiques',
    description:
      "Obtenez une vue d'ensemble des films que vous avez regardez et des critiques de vos amis",
  },
  {
    icon: RewindIcon,
    title: 'Lieux et partenaires',
    description:
      "Obtenez une vue d'ensemble des films que vous avez regardez et des critiques de vos amis",
  },
  {
    icon: RewindIcon,
    title: 'Comparaison',
    description:
      "Obtenez une vue d'ensemble des films que vous avez regardez et des critiques de vos amis",
  },
  {
    icon: RewindIcon,
    title: 'Plusieurs vues',
    description:
      "Obtenez une vue d'ensemble des films que vous avez regardez et des critiques de vos amis",
  },
]
</script>

<template>
  <div class="grid grid-cols-3 gap-8">
    <div
      v-for="(card, index) in cards"
      :key="index"
      class="flex flex-col gap-4 border border-accent rounded-xl p-6 shadow-lg w-full"
    >
      <div class="border-2 border-gray-300 rounded-md p-2 w-fit bg-gray-100 shadow-md">
        <component :is="card.icon" />
      </div>
      <h3 class="text-xl font-titles">{{ card.title }}</h3>
      <p>{{ card.description }}</p>
    </div>
  </div>
</template>

<style scoped></style>
