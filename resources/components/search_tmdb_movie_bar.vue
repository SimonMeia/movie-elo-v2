<script setup lang="ts">
import { ref } from 'vue'
import AutoComplete from 'primevue/autocomplete'
import type { TmdbSearchResponse } from '@/types'
import { watchEffect } from 'vue';

const props = defineProps<{
  initialValue?: string
}>()

watchEffect(() => console.log(props.initialValue))

const emit = defineEmits<{
  (event: 'update', tmdbMovie: { tmdbMovieId: number; title: string }): void
}>()

const inputValue = ref(props.initialValue || '')
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
  <AutoComplete
    v-model="inputValue"
    optionLabel="title"
    placeholder="Search"
    class="w-full"
    :suggestions="suggestions"
    @complete="search"
    @item-select="
      $emit('update', { tmdbMovieId: $event.value.tmdbMovieId, title: $event.value.title })
    "
  />
</template>
