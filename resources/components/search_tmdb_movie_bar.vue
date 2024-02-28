<script setup lang="ts">
import { ref } from 'vue'
import AutoComplete from 'primevue/autocomplete'
import type { TmdbSearchResponse } from '@/types'

const emit = defineEmits<{
  (event: 'update', tmdbMovieId: number): void
}>()

const inputValue = ref('')
const suggestions = ref([])

function search() {
  fetch(`/api/tmdb/search?id=${inputValue.value}`)
    .then((response) => response.json())
    .then((data: TmdbSearchResponse) => {
      suggestions.value = data.results
        .sort((a, b) => b.vote_average - a.vote_average)
        .map((movie) => {
          return { title: movie.title, tmdbMovieId: movie.id }
        })
    })
}
</script>

<template>
  <div class="w-full">
    <AutoComplete
      v-model="inputValue"
      optionLabel="title"
      placeholder="Search"
      class="w-full"
      :suggestions="suggestions"
      @complete="search"
      @item-select="$emit('update', $event.value.tmdbMovieId)"
    />
  </div>
</template>
