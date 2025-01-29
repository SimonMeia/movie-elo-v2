<script setup lang="ts">
import { ref, onMounted } from 'vue'

const events = ref([
  {
    event: 'Tableau Notion',
    year: '2020',
    icon: 'pi pi-shopping-cart',
    color: '#9C27B0',
  },
  {
    event: 'Tableau Notion boosté par une API',
    year: '2021',
    icon: 'pi pi-shopping-cart',
    color: '#9C27B0',
  },
  {
    event: 'Web app connectée à Notion',
    year: '2022',
    icon: 'pi pi-cog',
    color: '#673AB7',
  },
  { event: 'Movie Elo', year: '2024', icon: 'pi pi-shopping-cart', color: '#FF9800' },
])

const activeIndex = ref(0) // Indice du marqueur actif

// Fonction pour animer les marqueurs en boucle
const startAnimation = () => {
  setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % events.value.length // Reset à 0 quand on arrive à la fin
  }, 3000)
}

onMounted(() => {
  startAnimation() // Démarrer l'animation au montage du composant
})
</script>

<template>
  <div class="grid grid-cols-2 gap-8">
    <div class="flex flex-col gap-4">
      <h2 class="text-3xl font-titles">L'histoire derrière Movie Elo</h2>
      <p>
        Movie Elo est un projet dont la genèse remonte à 2022. L'objectif est de créer un système de
        notation de films personnalisé selon vos critères.
      </p>
      <ul class="list-disc list-inside">
        <li>Un film par catégorie et par note</li>
        <li>Comparaison simplifiée sans avoir à aller dans le tableau</li>
      </ul>
    </div>
    <Card>
      <template #content>
        <Timeline
          :value="events"
          align="left"
          :pt="{ eventOpposite: '!grow-0', eventContent: '!-mt-2' }"
        >
          <template #marker="{ index }">
            <span
              class="flex w-3 h-3 outline-offset-2 outline-[2px] outline items-center justify-center z-10 shadow-sm rounded-full transition-colors ease-out duration-200"
              :class="{
                'bg-gray-400 outline-gray-400': index !== activeIndex, // Gris si inactif
                'bg-accent outline-accent': index === activeIndex, // Rouge si actif
              }"
            >
            </span>
          </template>

          <template #content="slotProps">
            <p>{{ slotProps.item.year }}</p>
            <h3>{{ slotProps.item.event }}</h3>
          </template>
        </Timeline>
      </template>
    </Card>
  </div>
</template>

<style scoped>
/* Ajout d'une transition fluide */
</style>
