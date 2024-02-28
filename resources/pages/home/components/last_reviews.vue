<script setup lang="ts">
import Button from 'primevue/button'
import ReviewCard from './review_card.vue'
import type { ReviewsResponse } from '@/types'
import { router } from '@inertiajs/vue3'

const props = defineProps<ReviewsResponse>()
</script>

<template>
  <div class="relative">
    <h2>Dernières reviews</h2>
    <div class="grid grid-cols-5 gap-6">
      <ReviewCard v-for="review in props.reviews" :key="review.review.id" :review="review" />
    </div>
    <div class="flex justify-end">
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
