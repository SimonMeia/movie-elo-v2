<script setup lang="ts">
import {FormGradeType, ReviewResponse} from '@/app/types'
import ReviewHeader from './components/review_header.vue'
import ReviewGrades from './components/review_grades.vue'
import ReviewViewings from './components/review_viewings.vue'
import Layout from '@/layouts/default.vue'

defineProps<{
  review: ReviewResponse
  dbLocations: string[]
  dbPartners: string[]
  dbGradeTypes: FormGradeType[]
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
      :backdrop-path="review.movie.backdropPath"
      :title="review.movie.title"
      :synopsis="review.movie.synopsis"
    />
    <div class="container">
      <ReviewGrades :review="review.review" :form-grade-types="dbGradeTypes"></ReviewGrades>
      <ReviewViewings
        :review-id="review.review.id"
        :viewings="review.review.viewings"
        :db-locations="dbLocations"
        :db-partners="dbPartners"
        :errors="errors"
      ></ReviewViewings>
    </div>
  </Layout>
</template>

<style scoped></style>
@/app/types
