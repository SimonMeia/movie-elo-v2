<script setup lang="ts">
import type { ReviewCard } from '@/app/types'
import { router } from '@inertiajs/vue3'
import Tag from 'primevue/tag'

const props = defineProps<{ review: ReviewCard }>()

const tagColor = props.review.grade >= 80 ? 'success' : props.review.grade <= 50 ? 'danger' : 'warn'
</script>

<template>
  <div
    class="relative flex flex-col border border-gray-200 rounded-lg shadow cursor-pointer card"
    @click="router.get(`/app/reviews/${review.reviewId}`)"
  >
    <Tag :value="review.grade" :severity="tagColor" class="absolute top-2 right-2" />
    <img
      :src="`https://image.tmdb.org/t/p/original${review.backdropPath}`"
      alt="movie poster"
      class="object-cover w-full rounded-t-lg"
    />
    <div class="flex flex-col justify-between h-full p-5">
      <!--    The span is needed for the underline animation    -->
      <span>
        <h2 class="inline mb-2 link-underline link-underline-black">
          {{ review.title }}
        </h2>
      </span>
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
@/app/types
