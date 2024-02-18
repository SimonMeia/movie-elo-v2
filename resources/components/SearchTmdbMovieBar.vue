<script setup lang="ts">
import { ref } from 'vue'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import AutoComplete from 'primevue/autocomplete'
import type { TmdbSearchResponse } from '@/types'

const emit = defineEmits<{
  (event: 'update', tmdbMovieId: number): void
}>()

const inputValue = ref('')
const suggestions = ref([])

async function search() {
  fetch(`/tmdb/search?id=${inputValue.value}`)
    .then((response) => response.json())
    .then((data: TmdbSearchResponse) => {
      suggestions.value = data.results.sort((a, b) => b.vote_average - a.vote_average).map((movie) => {
        return { title: movie.title, tmdbMovieId: movie.id }
      })
    })
}
</script>

<template>
  <IconField iconPosition="left">
    <InputIcon>
      <i class="pi pi-search" />
    </InputIcon>
    <AutoComplete
      v-model="inputValue"
      optionLabel="title"
      :suggestions="suggestions"
      @complete="search"
      @item-select="$emit('update', $event.value.tmdbMovieId)"
      placeholder="Search"
    />
  </IconField>
</template>
