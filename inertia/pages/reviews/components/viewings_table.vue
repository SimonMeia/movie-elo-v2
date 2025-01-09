<script setup lang="ts">
import type { ViewingWithMovieTitle } from '@/app/types'
import { router } from '@inertiajs/vue3'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import { type Ref, ref } from 'vue'
import Button from 'primevue/button'

defineProps<{ data: ViewingWithMovieTitle[]; isChangingTab: boolean }>()

// interface ViewingListItem {
//   reviewId: number
//   movieTitle: string
//   date: Date
//   locations: string[]
//   partners: string[]
// }

const selectedReview: Ref<ViewingWithMovieTitle | null> = ref(null)
</script>

<template>
  <DataTable
    stripedRows
    selectionMode="single"
    size="small"
    v-model:selection="selectedReview"
    :value="data"
    @rowSelect="router.get('/reviews/' + $event.data.reviewId)"
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
    <Column field="title">
      <template #header>
        <div class="ml-4">
          <span class="font-bold">Film</span>
        </div>
      </template>
      <template #body="slotProps">
        <div class="ml-4">
          <span class="font-bold">{{ slotProps.data.title }}</span>
        </div>
      </template>
    </Column>

    <Column field="date" header="Date">
      <template #body="slotProps">
        <span>{{
          new Date(slotProps.data.date).toLocaleDateString('fr-CH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        }}</span>
      </template>
    </Column>

    <Column field="locations" header="Lieux">
      <template #body="slotProps">
        <span>{{ slotProps.data.locations.join(', ') }}</span>
      </template>
    </Column>

    <Column field="partners" header="Partenaires">
      <template #body="slotProps">
        <span>{{ slotProps.data.partners.join(', ') }}</span>
      </template>
    </Column>
  </DataTable>
</template>

<style scoped></style>
@/app/types
