<script setup lang="ts">
import { ref } from 'vue'
import AutoComplete from 'primevue/autocomplete'
import type { TmdbSearchResponse } from '@/types'
import { watchEffect } from 'vue'

const props = defineProps<{
  initialValue?: string
  error?: string[]
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
        .sort((a, b) => b.popularity - a.popularity)
        .map((movie) => {
          return {
            title: movie.title,
            tmdbMovieId: movie.id,
            releaseYear: new Date(movie.release_date).getFullYear(),
          }
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
  >
    <template #option="slotProps">
      <p>{{ slotProps.option.title }}</p>
      <p class="text-xs">{{ slotProps.option.releaseYear }}</p>
    </template>
  </AutoComplete>
  <small v-if="props.error" class="text-red-500">
    {{ props.error[0] }}
  </small>
</template>
