<script setup lang="ts">
import type { ReviewsResponse } from '@/types'
import { watchEffect } from 'vue'
import Layout from '@/layouts/default.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { computed } from 'vue'
import type { Ref } from 'vue'
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'

interface ReviewListItem {
  reviewId: number
  title: string
}

const props = defineProps<ReviewsResponse>()
const selectedReview: Ref<ReviewListItem | null> = ref(null)

const reviewsList = computed(() =>
  props.reviews.map((review): ReviewListItem => {
    return { reviewId: review.review.id, title: review.movie.title }
  })
)

function onRowSelect(event) {
  console.log(event.data.title)
  router.get('/reviews/' + event.data.reviewId)
}
</script>

<template>
  <Layout>
    <div class="p-container">
      <DataTable
        :value="reviewsList"
        v-model:selection="selectedReview"
        selectionMode="single"
        @rowSelect="onRowSelect"
      >
        <Column field="title"></Column>
      </DataTable>
    </div>
  </Layout>
</template>

<style scoped></style>
