<script setup lang="ts">
import AutoComplete from 'primevue/autocomplete'
import type { Ref } from 'vue'
import { watchEffect } from 'vue'
import { ref } from 'vue'

const props = defineProps<{
  placeOrPartner: 'place' | 'partner'
}>()

const emit = defineEmits<{
  update: [value: string[]]
}>()

const label = props.placeOrPartner === 'place' ? 'Lieu' : 'Partenaire'
const inputValue: Ref<string[]> = ref([])
const items =
  label === 'Lieu'
    ? ref(['Cinema', 'Maison', 'La Neuveville'])
    : ref(['Solo', 'Jean-Luc', 'Pierre'])
const suggestions: Ref<string[]> = ref([])

watchEffect(() => console.log(inputValue.value))
async function search(event) {
  // suggestions.value = items.value.flat()
  suggestions.value = items.value.filter(
    (s) =>
      s.toLocaleLowerCase().includes(event.query.toLocaleLowerCase()) &&
      !inputValue.value.includes(s)
  )
  if (event.query !== '') {
    const includesQuery = items.value.some(
      (value) => value.toLowerCase() === event.query.toLowerCase()
    )

    if (!includesQuery) {
      suggestions.value.push(`Ajouter : ${event.query}`)
    }
  }
}
</script>

<template>
  <div>
    <label for="">{{ label }}</label>
    <br />
    <AutoComplete
      multiple
      dropdown
      v-model:model-value="inputValue"
      :suggestions="suggestions"
      @complete="search"
      placeholder="Search"
    ></AutoComplete>
    <!-- @item-select="$emit('update', $event.value.tmdbMovieId)"s -->
  </div>
</template>
