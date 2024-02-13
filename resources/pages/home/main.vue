<script setup lang="ts">
import { computed, ref } from 'vue'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import AutoComplete from 'primevue/autocomplete'
import { router } from '@inertiajs/vue3'

const props = defineProps<{
  search: string
}>()

const inputValue = ref(props.search)
const suggestions = ref([])

async function search() {
  fetch(`/search?query=${inputValue.value}`)
    .then((response) => response.json())
    .then((data) => {
      suggestions.value = data.results.map((movie) => movie.title)
    })
}
</script>

<template>
  <div>
    <h1>Home</h1>
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
  </div>
</template>

<style scoped></style>
