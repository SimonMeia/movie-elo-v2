<script setup lang="ts">
import { ref } from 'vue'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import AutoComplete from 'primevue/autocomplete'
import type { TmdbSearchResponse } from '@/types'

const inputValue = ref('')
const suggestions = ref([])

async function search() {
  fetch(`/search?query=${inputValue.value}`)
    .then((response) => response.json())
    .then((data: TmdbSearchResponse) => {
      suggestions.value = data.results.map((movie) => movie.title)
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
      :suggestions="suggestions"
      @complete="search"
      placeholder="Search"
    />
  </IconField>
</template>
