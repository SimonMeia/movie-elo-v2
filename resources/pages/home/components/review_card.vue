<script setup lang="ts">
import type { ReviewResponse } from '@/types'
import { router } from '@inertiajs/vue3'
import Button from 'primevue/button'
import { useGrades } from '@/composables/useGrades'
import Tag from 'primevue/tag'

const { calculateTotalGrade } = useGrades()

const props = defineProps<{ review: ReviewResponse }>()
const totalGrade = calculateTotalGrade(props.review.review.grades)
const tagColor = totalGrade > 80 ? 'success' : totalGrade <= 50 ? 'danger' : 'warning'
</script>

<template>
  <div
    class="card relative border border-gray-200 rounded-lg shadow flex flex-col"
    @click="router.get(`/reviews/${review.review.id}`)"
  >
    <Tag :value="totalGrade" :severity="tagColor" class="absolute top-2 right-2" />
    <img
      :src="`https://image.tmdb.org/t/p/original${review.movie.backdropPath}`"
      alt="movie poster"
      class="object-cover w-full rounded-t-lg"
    />
    <div class="flex flex-col justify-between p-5 h-full">
      <span>
        <h2 class="mb-2 inline link-underline link-underline-black">
          {{ review.movie.title }}
        </h2>
      </span>
      <Button label="Voir la review" link @click="router.get(`/reviews/${review.review.id}`)" />
    </div>
  </div>
</template>

<style scoped>
.link-underline {
  border-bottom-width: 0;
  background-image: linear-gradient(transparent, transparent), linear-gradient(#fff, #fff);
  background-size: 0 3px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: background-size 0.5s ease-in-out;
}

.link-underline-black {
  background-image: linear-gradient(transparent, transparent), linear-gradient(#c21313, #c21313);
}

.link-underline:hover {
  background-size: 100% 3px;
  background-position: 0 100%;
}

.card:hover .link-underline {
  background-size: 100% 3px;
  background-position: 0 100%;
}
</style>
