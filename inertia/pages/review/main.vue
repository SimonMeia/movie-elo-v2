<script setup lang="ts">
import type { ReviewResponse } from '@/app/types'
import ReviewHeader from './components/review_header.vue'
import ReviewGrades from './components/review_grades.vue'
import ReviewViewings from './components/review_viewings.vue'
import Layout from '@/layouts/default.vue'

const props = defineProps<ReviewResponse>()
</script>

<template>
  <Layout>
    <ReviewHeader
      :backdrop-path="props.movie.backdropPath"
      :title="props.movie.title"
      :synopsis="props.movie.synopsis"
    />
    <div class="container">
      <ReviewGrades :review="props.review"></ReviewGrades>
      <ReviewViewings :viewings="props.review.viewings"></ReviewViewings>
    </div>
  </Layout>
</template>

<style scoped></style>
@/app/types
