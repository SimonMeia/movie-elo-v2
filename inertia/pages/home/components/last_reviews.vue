<script setup lang="ts">
import Button from 'primevue/button'
import ReviewCard from './review_card.vue'
import type { ReviewsResponse } from '@/app/types'
import { router } from '@inertiajs/vue3'

const props = defineProps<ReviewsResponse>()
</script>

<template>
  <div class="relative">
    <h2 class="mb-4 text-3xl font-bold">Dernières reviews</h2>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <ReviewCard v-for="review in props.reviews" :key="review.review.id" :review="review" />
    </div>
    <div class="flex justify-end mt-4">
      <Button
        label="Voir toutes les reviews"
        link
        icon="pi pi-arrow-right"
        iconPos="right"
        @click="router.get('/reviews')"
      />
    </div>
  </div>
</template>

<style scoped></style>
@/app/types
