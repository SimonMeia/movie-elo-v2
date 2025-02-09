<script setup lang="ts">
import type { GradedReview } from '@/app/types'
import { router } from '@inertiajs/vue3'
import Column from 'primevue/column'
import DataTable, { DataTableSortEvent } from 'primevue/datatable'
import Button from 'primevue/button'

const props = defineProps<{
  data: GradedReview[]
  isChangingTab: boolean
  sortOrder: number
  sortField: string
}>()
const emits = defineEmits<{
  (event: 'sort', payload: { field: string; order: number }): void
}>()

interface ReviewListItem {
  reviewId: number
  title: string
  totalGrade: number

  [key: number]: {
    gradeTypeName: string
    grade: number
  }
}

const gradeTypes = props.data[0]?.grades.map((grade) => {
  return {
    gradeTypeId: grade.gradeType.id,
    gradeTypeName: grade.gradeType.name,
  }
})

const reviewsList: ReviewListItem[] = props.data.map((review) => {
  const line: ReviewListItem = {
    reviewId: review.id,
    title: review.title,
    totalGrade: review.totalGrade,
  }
  for (const grade of review.grades) {
    line[grade.gradeType.id] = {
      gradeTypeName: grade.gradeType.name,
      grade: grade.givenGrade,
    }
  }
  return line
})

function sort(event: DataTableSortEvent) {
  const { sortField, sortOrder } = event
  emits('sort', { field: sortField as string, order: sortOrder ?? 0 })
}
</script>

<template>
  <DataTable
    stripedRows
    size="small"
    :value="reviewsList"
    :sortField="sortField"
    :sortOrder="sortOrder"
    removableSort
    @rowClick="router.get('/reviews/' + $event.data.reviewId)"
    @sort="sort"
    :pt="{ bodyRow: 'cursor-pointer hover:!bg-gray-100', thead: '!h-12' }"
    lazy
  >
    <template #empty>
      <div v-if="isChangingTab" class="py-4 text-center">
        <i class="pi pi-spinner animate-spin text-accent" style="font-size: 2rem"></i>
      </div>
      <div v-else class="py-4 space-y-4 text-center">
        Votre tableau de critiques est aussi vide qu'une salle de cinéma avant la projection.<br />
        <Button label="Ajouter une review" @click="router.get(`/review-form`)" />
      </div>
    </template>

    <Column field="title" :sortable="true">
      <template #header>
        <div class="md:ml-4">
          <span class="font-bold">Film</span>
        </div>
      </template>
      <template #body="slotProps">
        <div class="md:ml-4">
          <span class="font-bold">{{ slotProps.data.title }}</span>
        </div>
      </template>
    </Column>
    <template v-for="gradeType in gradeTypes" :key="gradeType.gradeTypeId">
      <Column
        :field="`${gradeType.gradeTypeId}.grade`"
        :header="gradeType.gradeTypeName"
        class="hidden md:table-cell"
      ></Column>
    </template>
    <Column field="totalGrade" :sortable="true" header="Note finale">
      <template #body="slotProps">
        <div class="mr-4">{{ slotProps.data.totalGrade }}%</div>
      </template>
    </Column>
  </DataTable>
</template>

<style scoped></style>
@/app/types
