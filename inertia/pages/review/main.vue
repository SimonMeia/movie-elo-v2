<script setup lang="ts">
import type { ReviewResponse } from '@/app/types'
import ReviewHeader from './components/review_header.vue'
import ReviewGrades from './components/review_grades.vue'
import ReviewViewings from './components/review_viewings.vue'
import Layout from '@/layouts/default.vue'
import { watch, watchEffect } from 'vue'

const props = defineProps<{
  review: ReviewResponse
  dbLocations: string[]
  dbPartners: string[]
  errors?: {
    tmdbMovieId?: string[]
    locations?: string[]
    partners?: string[]
  }
}>()
</script>

<template>
  <Layout>
    <ReviewHeader
      :backdrop-path="props.review.movie.backdropPath"
      :title="props.review.movie.title"
      :synopsis="props.review.movie.synopsis"
    />
    <div class="container">
      <ReviewGrades :review="props.review.review"></ReviewGrades>
      <ReviewViewings
        :review-id="props.review.review.id"
        :viewings="props.review.review.viewings"
        :db-locations="props.dbLocations"
        :db-partners="props.dbPartners"
        :errors="props.errors"
      ></ReviewViewings>
    </div>
  </Layout>
</template>

<style scoped></style>
@/app/types
