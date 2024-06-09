<script setup lang="ts">
import { useGrades } from '@/composables/use_grades'
import type { ReviewsResponse } from '@/app/types'
import { router } from '@inertiajs/vue3'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import { type Ref, ref } from 'vue'

const props = defineProps<ReviewsResponse>()

interface ReviewListItem {
  reviewId: number
  title: string
  totalGrade: number
  [key: number]: {
    gradeTypeName: string
    grade: number
  }
}

const { calculateTotalGrade } = useGrades()

const selectedReview: Ref<ReviewListItem | null> = ref(null)

const gradeTypes = props.reviews[0]?.review.grades.map((grade) => {
  return {
    gradeTypeId: grade.gradeType.id,
    gradeTypeName: grade.gradeType.name,
  }
})

const reviewsList: ReviewListItem[] = props.reviews
  .map((review) => {
    const line: ReviewListItem = {
      reviewId: review.review.id,
      title: review.movie.title,
      totalGrade: calculateTotalGrade(
        review.review.grades.map((grade) => {
          return {
            grade: grade.givenGrade,
            maxGrade: grade.gradeType.maxGrade,
          }
        })
      ),
    }
    for (const grade of review.review.grades) {
      line[grade.gradeType.id] = {
        gradeTypeName: grade.gradeType.name,
        grade: grade.givenGrade,
      }
    }
    return line
  })
  .sort((a, b) => a.title.localeCompare(b.title))
  .sort((a, b) => b.totalGrade - a.totalGrade)
</script>

<template>
  <DataTable
    stripedRows
    selectionMode="single"
    size="small"
    v-model:selection="selectedReview"
    :value="reviewsList"
    @rowSelect="router.get('/reviews/' + $event.data.reviewId)"
  >
    <Column field="title">
      <template #header>
        <div class="ml-4">
          <span class="font-bold">Film</span>
        </div>
      </template>
      <template #body="slotProps">
        <div class="ml-4">
          <span class="font-bold">{{ slotProps.data.title }}</span>
        </div>
      </template>
    </Column>
    <template v-for="gradeType in gradeTypes" :key="gradeType.gradeTypeId">
      <Column :field="`${gradeType.gradeTypeId}.grade`" :header="gradeType.gradeTypeName"></Column>
    </template>
    <Column field="totalGrade">
      <template #header>
        <div class="mr-4">
          <span class="font-bold">Note finale</span>
        </div>
      </template>
      <template #body="slotProps">
        <div class="mr-4">
          <span class="font-bold">{{ slotProps.data.totalGrade.toFixed(0) }}%</span>
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<style scoped></style>
@/app/types
