<script setup lang="ts">
import Button from 'primevue/button'
import ReviewCard from './review_card.vue'
import type { ReviewCard as ReviewCardType } from '@/app/types'
import { router } from '@inertiajs/vue3'

defineProps<{ lastReviews: ReviewCardType[] }>()
</script>

<template>
  <div class="relative">
    <h2 class="mb-4 text-3xl font-bold">Dernières reviews</h2>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <ReviewCard v-for="review in lastReviews" :key="review.reviewId" :review="review" />
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
