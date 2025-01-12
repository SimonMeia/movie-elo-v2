<script setup lang="ts">
import type { ViewingWithMovieTitle } from '@/app/types'
import { router } from '@inertiajs/vue3'
import Column from 'primevue/column'
import DataTable, { DataTableSortEvent } from 'primevue/datatable'
import Button from 'primevue/button'

defineProps<{
  data: ViewingWithMovieTitle[]
  isChangingTab: boolean
  sortOrder: number
  sortField: string
}>()

const emits = defineEmits<{
  (event: 'sort', payload: { field: string; order: number }): void
}>()

function sort(event: DataTableSortEvent) {
  const { sortField, sortOrder } = event
  emits('sort', { field: sortField as string, order: sortOrder ?? 0 })
}
</script>

<template>
  <DataTable
    stripedRows
    size="small"
    :value="data"
    :sortField="sortField"
    :sortOrder="sortOrder"
    removableSort
    @rowClick="router.get('/reviews/' + $event.data.reviewId)"
    @sort="sort"
    :pt="{ bodyRow: 'cursor-pointer hover:!bg-gray-100', thead: '!h-12' }"
    lazy
  >
    <template #empty>
      <div v-if="isChangingTab" class="text-center py-4">
        <i class="pi pi-spinner animate-spin text-accent" style="font-size: 2rem"></i>
      </div>
      <div v-else class="text-center py-4 space-y-4">
        Votre tableau de critiques est aussi vide qu'une salle de cinéma avant la projection.<br />
        <Button label="Ajouter une review" @click="router.get(`/review-form`)" />
      </div>
    </template>
    <Column field="title" :sortable="true">
      <template #header>
        <div class="md:ml-4">
          <span class="font-bold">Film</span>
        </div>
      </template>
      <template #body="slotProps">
        <div class="md:ml-4">
          <span class="font-bold">{{ slotProps.data.title }}</span>
        </div>
      </template>
    </Column>

    <Column field="date" header="Date" :sortable="true">
      <template #body="slotProps">
        <span>
          {{
            new Date(slotProps.data.date).toLocaleDateString('fr-CH', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          }}
        </span>
      </template>
    </Column>

    <Column field="locations" header="Lieux" class="hidden md:table-cell">
      <template #body="slotProps">
        <span>{{ slotProps.data.locations.join(', ') }}</span>
      </template>
    </Column>

    <Column field="partners" header="Partenaires" class="hidden md:table-cell">
      <template #body="slotProps">
        <span>{{ slotProps.data.partners.join(', ') }}</span>
      </template>
    </Column>
  </DataTable>
</template>

<style scoped></style>
@/app/types
