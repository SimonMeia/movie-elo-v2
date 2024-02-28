<script setup lang="ts">
import type { ReviewResponse } from '@/types'
import { router } from '@inertiajs/vue3'
import Button from 'primevue/button'
import { useGrades } from '@/composables/useGrades'
import Tag from 'primevue/tag'

const { calculateTotalGrade } = useGrades()

const props = defineProps<{ review: ReviewResponse }>()
</script>

<template>
  <div class="relative border border-gray-200 rounded-lg shadow">
    <Tag
      :value="calculateTotalGrade(review.review.grades)"
      severity="info"
      class="absolute top-2 right-2"
    />
    <img
      :src="`https://image.tmdb.org/t/p/original${review.movie.posterPath}`"
      alt="movie poster"
      class="object-cover w-full rounded-t-lg"
    />
    <div class="flex flex-col justify-between p-5 h-26">
      <h2 class="mb-2 font-bold text-l">
        {{ review.movie.title }}
      </h2>

      <Button label="Voir la review" link @click="router.get(`/reviews/${review.review.id}`)" />
    </div>
  </div>
</template>

<style scoped></style>
