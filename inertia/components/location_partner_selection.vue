<script setup lang="ts">
import AutoComplete, { AutoCompleteCompleteEvent } from 'primevue/autocomplete'
import type { Ref } from 'vue'
import { ref } from 'vue'

const props = defineProps<{
  locationOrPartner: 'location' | 'partner'
  items: string[]
  error?: string[]
  selectedValues?: string[]
}>()

const emit = defineEmits<{
  update: [selection: string[]]
}>()

const label = props.locationOrPartner === 'location' ? 'Lieu' : 'Partenaire'
const selectedValues: Ref<string[]> = ref(props.selectedValues || [])
const items = ref(props.items)
const suggestions: Ref<string[]> = ref([])
const addNewItemLabel = 'Ajouter : '

function select(event) {
  if (event.value.includes(addNewItemLabel)) {
    const newItem = event.value.split(addNewItemLabel)[1]
    items.value.push(newItem)
    selectedValues.value[selectedValues.value.length - 1] = newItem
  }
  emit('update', selectedValues.value)
}

function search(event: AutoCompleteCompleteEvent) {
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
    <label class="block mb-1 text-lg font-titles" for="">{{ label }}</label>
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
    <small v-if="props.error" class="text-red-500">
      {{ props.error[0] }}
    </small>
  </div>
</template>
