<script setup lang="ts">
import type { Review } from '@/types'
import { defineProps, computed } from 'vue'
import ReviewGrade from './review_grade.vue'

const props = defineProps<{
  review: Review
}>()

const finalGrade = computed(
  () => (Object.values(props.review.grades).reduce((total, grade) => total + grade, 0) / 20) * 100
)
</script>

<template>
  <div class="flex flex-row flex-wrap my-4 justify-content-between">
    <ReviewGrade
      v-for="(grade, name) in props.review.grades"
      :key="name"
      :name="name"
      :max-grade="5"
      :grade="grade"
    ></ReviewGrade>
  </div>
  <div>
    <span class="text-4xl font-bold">Note finale : {{ finalGrade.toFixed(0) }}%</span>
  </div>
</template>

<style scoped></style>
