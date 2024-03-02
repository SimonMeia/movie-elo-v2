<script setup lang="ts">
import type { Review } from '@/types'
import { computed } from 'vue'
import ReviewGrade from './review_grade.vue'
import { useGrades } from '@/composables/use_grades'

const props = defineProps<{
  review: Review
}>()

const { calculateTotalGrade } = useGrades()

const totalGrade = calculateTotalGrade(
  props.review.grades.map((grade) => {
    return {
      grade: grade.givenGrade,
      maxGrade: grade.gradeType.maxGrade,
    }
  })
)

console.log(props.review)
</script>

<template>
  <h2 class="my-6">Notes</h2>
  <div class="grid grid-cols-2 gap-4 my-6 md:grid-cols-3">
    <ReviewGrade
      v-for="grade in props.review.grades"
      :key="grade.gradeType.id"
      :name="grade.gradeType.name"
      :max-grade="grade.gradeType.maxGrade"
      :grade="grade.givenGrade"
    />
  </div>
  <div class="my-8 text-center">
    <span class="text-2xl">Note finale : </span>
    <span class="text-4xl font-bold text-accent font-titles">{{ totalGrade.toFixed(0) }}%</span>
  </div>
</template>

<style scoped></style>
