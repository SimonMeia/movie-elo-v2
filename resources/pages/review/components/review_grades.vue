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
  <div class="flex flex-row flex-wrap justify-between my-4">
    <ReviewGrade
      v-for="grade in props.review.grades"
      :key="grade.id"
      :name="grade.gradeTypeName"
      :max-grade="grade.maxGrade"
      :grade="grade.grade"
    ></ReviewGrade>
  </div>
  <div>
    <span class="text-4xl font-bold">Note finale : {{ totalGrade.toFixed(0) }}%</span>
  </div>
</template>

<style scoped></style>
