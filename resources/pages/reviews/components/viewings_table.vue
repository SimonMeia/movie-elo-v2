<script setup lang="ts">
import type { ReviewsResponse } from '@/types'
import { router } from '@inertiajs/vue3'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import { type Ref, ref } from 'vue'

const props = defineProps<ReviewsResponse>()

interface ViewingListItem {
  reviewId: number
  movieTitle: string
  date: Date
  locations: string[]
  partners: string[]
}

const selectedReview: Ref<ViewingListItem | null> = ref(null)

const viewingsList: ViewingListItem[] = []
for (const review of props.reviews) {
  for (const viewing of review.review.viewings) {
    viewingsList.push({
      reviewId: review.review.id,
      movieTitle: review.movie.title,
      date: new Date(viewing.date),
      locations: viewing.locations.map((location) => location.name),
      partners: viewing.partners.map((partner) => partner.name),
    })
  }
}
</script>

<template>
  <DataTable
    stripedRows
    selectionMode="single"
    size="small"
    v-model:selection="selectedReview"
    :value="viewingsList"
    @rowSelect="router.get('/reviews/' + $event.data.reviewId)"
  >
    <Column field="movieTitle">
      <template #header>
        <div class="ml-4">
          <span class="font-bold">Film</span>
        </div>
      </template>
      <template #body="slotProps">
        <div class="ml-4">
          <span class="font-bold">{{ slotProps.data.movieTitle }}</span>
        </div>
      </template>
    </Column>

    <Column field="date" header="Date">
      <template #body="slotProps">
        <span>{{ slotProps.data.date.toLocaleDateString('fr-CH', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
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
