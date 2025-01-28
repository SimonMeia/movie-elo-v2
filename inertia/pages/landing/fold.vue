<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Category {
  label: string
  options: number[]
  selected: number | null // Peut être un nombre ou null
}

interface Film {
  title: string
  actors: string
  genres: string
  year: number
  poster: string
  categories: Category[]
}

const films = ref<Film[]>([
  {
    title: 'Forrest Gump',
    actors: 'Tom Hanks, Robin Wright, Gary Sinise',
    genres: 'Drama, Romance, Adventure',
    year: 1994,
    poster: 'https://image.tmdb.org/t/p/original/A0Th0x8QIzP0njrFAJnYQ5ouIoB.jpg',
    categories: [
      { label: 'Histoire', options: [1, 2, 3, 4], selected: null },
      { label: 'Acting', options: [1, 2, 3], selected: null },
      { label: 'Musique', options: [1, 2, 3], selected: null },
      { label: 'Note personnelle', options: [1, 2, 3, 4, 5], selected: null },
    ],
  },
  {
    title: 'The Shawshank Redemption',
    actors: 'Tim Robbins, Morgan Freeman',
    genres: 'Drama, Crime',
    year: 1994,
    poster: 'https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    categories: [
      { label: 'Histoire', options: [1, 2, 3, 4, 5], selected: null },
      { label: 'Personnages', options: [1, 2], selected: null },
      { label: 'Photographie', options: [1, 2, 3], selected: null },
      { label: 'Originalité', options: [1, 2, 3], selected: null },
    ],
  },
  {
    title: 'Inception',
    actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt',
    genres: 'Sci-Fi, Thriller, Action',
    year: 2010,
    poster: 'https://image.tmdb.org/t/p/original/aej3LRUga5rhgkmRP6XMFw3ejbl.jpg',
    categories: [
      { label: 'Réalisation', options: [1, 2, 3], selected: null },
      { label: 'Musique', options: [1, 2, 3], selected: null },
      { label: 'Effet visuels', options: [1, 2, 3, 4, 5], selected: null },
      { label: 'Envie de le revoir', options: [1, 2], selected: null },
    ],
  },
])

const currentFilmIndex = ref(0)
const displayedTitle = ref('')
const typing = ref(false)

const currentFilm = computed(() => films.value[currentFilmIndex.value])

// Effet de typing pour le titre
const typeTitle = async (title: string) => {
  typing.value = true
  displayedTitle.value = ''
  while (displayedTitle.value.length > 0) {
    displayedTitle.value = displayedTitle.value.slice(0, -1)
    await new Promise((resolve) => setTimeout(resolve, 50))
  }
  for (const char of title) {
    displayedTitle.value += char
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
  typing.value = false
}

// Désélection progressive des notes
const deselectRatings = async () => {
  for (const category of currentFilm.value.categories) {
    if (category.selected !== null) {
      category.selected = null
    }
  }
}

// Sélection progressive des nouvelles notes
const selectRatings = async () => {
  for (const category of currentFilm.value.categories) {
    const randomIndex = Math.floor(Math.random() * category.options.length)
    category.selected = category.options[randomIndex]
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
}

// Cycle des films avec animations
let intervalId: number | null = null

onMounted(async () => {
  const cycleFilms = async () => {
    const nextIndex = (currentFilmIndex.value + 1) % films.value.length
    await typeTitle(films.value[nextIndex].title)
    await deselectRatings() // Désélectionner les notes actuelles
    await new Promise((resolve) => setTimeout(resolve, 500)) // Pause après désélection
    currentFilmIndex.value = nextIndex // Changer le film
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Pause après désélection
    await selectRatings() // Sélectionner les nouvelles notes
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Pause après sélection
    await cycleFilms() // Reappeler la fonction pour continuer la boucle
  }

  await typeTitle(currentFilm.value.title) // Lancer le typing pour le premier film
  await selectRatings() // Initialiser les notes pour le premier film
  await cycleFilms() // Démarrer la boucle
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <div class="h-[90dvh] grid grid-cols-2 gap-12">
    <div class="flex justify-center flex-col">
      <h1 class="text-5xl font-titles">Classez vos films selon vos propres critères</h1>
      <p class="pr-24">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, quidem. Quos? Quae, quidem.
        Quos?
      </p>
      <Button label="Explorer les fonctionnalités" class="mt-6 w-fit" />
    </div>
    <div
      class="h-fit my-auto border-2 shadow-2xl border-accent rounded-xl p-6 category-rating flex flex-col gap-4"
    >
      <div>
        <label class="block mb-1 text-lg font-titles" for="movie-name">Nom du film</label>
        <InputText
          :value="displayedTitle"
          id="movie-name"
          readonly
          class="w-full text-black! font-bold"
          size="large"
        />
      </div>

      <div class="border-2 border-accent rounded-xl p-4 flex items-center gap-4 shadow-lg">
        <img
          :src="currentFilm.poster"
          class="object-contain h-48 rounded-lg shadow-md"
          alt="movie poster"
        />
        <div>
          <h2 class="text-2xl font-bold">{{ currentFilm.title }}</h2>
          <p class="text-lg">{{ currentFilm.actors }}</p>
          <p class="text-lg">{{ currentFilm.genres }}</p>
          <p class="text-lg">{{ currentFilm.year }}</p>
        </div>
      </div>

      <div v-for="(category, index) in currentFilm.categories" :key="index">
        <label class="block mb-1 text-lg font-titles" :for="'category-' + index">{{
          category.label
        }}</label>
        <SelectButton
          :pt="{ root: '!flex !w-full !h-10' }"
          :options="category.options.map((option) => ({ label: option.toString(), value: option }))"
          optionLabel="label"
          optionValue="value"
          :model-value="category.selected"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
