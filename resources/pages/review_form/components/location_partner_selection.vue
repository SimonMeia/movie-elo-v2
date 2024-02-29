<script setup lang="ts">
import AutoComplete from 'primevue/autocomplete'
import type { Ref } from 'vue'
import { mergeProps } from 'vue'
import { ref } from 'vue'

const props = defineProps<{
  locationOrPartner: 'location' | 'partner'
  items: string[]
}>()

const emit = defineEmits<{
  update: [selection: string[]]
}>()

const label = props.locationOrPartner === 'location' ? 'Lieu' : 'Partenaire'
const selectedValues: Ref<string[]> = ref([])
const items = ref(props.items)
const suggestions: Ref<string[]> = ref([])
const addNewItemLabel = 'Ajouter : '

function select(event) {
  if (event.value.includes(addNewItemLabel)) {
    const newItem = event.value.split(addNewItemLabel)[1]
    items.value.push(newItem)
    selectedValues.value[selectedValues.value.length - 1] = newItem
    const destination = props.locationOrPartner === 'location' ? 'locations' : 'partners'
  }
  emit('update', selectedValues.value)
}

function search(event) {
  suggestions.value = items.value.filter(
    (s) =>
      s.toLocaleLowerCase().includes(event.query.toLocaleLowerCase()) &&
      !selectedValues.value.includes(s)
  )
  if (event.query !== '') {
    const includesQuery = items.value.some(
      (value) => value.toLowerCase() === event.query.toLowerCase()
    )

    if (!includesQuery) {
      suggestions.value.push(`${addNewItemLabel}${event.query}`)
    }
  }
}
</script>

<template>
  <div>
    <label class="font-titles text-lg mb-1 block" for="">{{ label }}</label>
    <AutoComplete
      multiple
      dropdown
      autoOptionFocus
      completeOnFocus
      v-model:model-value="selectedValues"
      placeholder="Search"
      :suggestions="suggestions"
      class="w-full"
      @complete="search"
      @item-select="select"
    ></AutoComplete>
  </div>
</template>
