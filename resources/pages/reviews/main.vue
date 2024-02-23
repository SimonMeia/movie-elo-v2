<script setup lang="ts">
import type { ReviewsResponse } from '@/types'
import { watchEffect } from 'vue'

const props = defineProps<ReviewsResponse>()

watchEffect(() => {
  console.log(props)
})
</script>

<template>
  <div>
    <ul>
      <li v-for="review of props.reviews">
        {{ review.movie.title }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
