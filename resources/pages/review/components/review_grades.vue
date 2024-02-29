<script setup lang="ts">
import type { Review } from '@/types'
import { computed } from 'vue'
import ReviewGrade from './review_grade.vue'
import { useGrades } from '@/composables/useGrades'

const props = defineProps<{
  review: Review
}>()

const { calculateTotalGrade } = useGrades()

const totalGrade = calculateTotalGrade(props.review.grades)
</script>

<template>
  <h2 class="my-6">Notes</h2>
  <div class="grid grid-cols-2 gap-4 my-6 md:grid-cols-3">
    <ReviewGrade
      v-for="grade in props.review.grades"
      :key="grade.id"
      :name="grade.gradeTypeName"
      :max-grade="grade.maxGrade"
      :grade="grade.grade"
    />
  </div>
  <div class="my-8 text-center">
    <span class="text-2xl">Note finale : </span>
    <span class="text-4xl font-bold text-accent font-titles">{{ totalGrade.toFixed(0) }}%</span>
  </div>
</template>

<style scoped></style>
