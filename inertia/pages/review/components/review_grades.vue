<script setup lang="ts">
import type {FormGradeType, Review} from '@/app/types'
import ReviewGrade from './review_grade.vue'
import { useGrades } from '@/composables/use_grades'
import { ref } from 'vue'
import CategoryRating from '@/pages/review_form/components/category_rating.vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import { router } from '@inertiajs/vue3'

const props = defineProps<{
  review: Review
  formGradeTypes: FormGradeType[]
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

const isDialogVisible = ref(false)

const grades = ref(
  props.review.grades.map((grade) => ({ gradeTypeId: grade.gradeType.id, grade: grade.givenGrade }))
)
const dbGradeTypes = props.review.grades.map((grade) => grade.gradeType)

function updateGrade(gradeTypeId: number, grade: number) {
  const index = grades.value.findIndex((g) => g.gradeTypeId === gradeTypeId)
  if (index === -1) {
    grades.value.push({ gradeTypeId, grade })
  } else {
    grades.value[index].grade = grade
  }
}

function applyChanges() {
  router.visit('/reviews/' + props.review.id + '/grades', {
    method: 'patch',
    data: {
      grades: grades.value,
    },
    preserveState: true,
    preserveScroll: true,
  })

  isDialogVisible.value = false
}
</script>

<template>
  <div class="flex flex-row items-center gap-1">
    <h2 class="my-6">Notes</h2>
    <div class="flex items-center p-2 cursor-pointer" @click="isDialogVisible = true">
      <i class="pi pi-pen-to-square text-accent"></i>
    </div>
  </div>
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

  <Dialog
    v-model:visible="isDialogVisible"
    modal
    :pt="{ root: 'w-[95%] !max-w-lg', header: '!pb-2' }"
    :draggable="false"
  >
    <template #header>
      <h3 class="text-xl">Créer une catégorie</h3>
    </template>
    <form @submit.prevent="applyChanges" class="flex flex-col w-full max-w-lg gap-4">
      <CategoryRating
        v-for="gradeType in dbGradeTypes"
        :key="gradeType.id"
        :form-grade-type="formGradeTypes.find((g) => g.id === gradeType.id)"
        :category-name="gradeType.name"
        :max-grade="gradeType.maxGrade"
        :grade="grades.find((g) => g.gradeTypeId === gradeType.id)?.grade"
        @update="updateGrade(gradeType.id, $event)"
      />
      <div class="flex justify-end gap-4 mt-6">
        <Button
          label="Annuler"
          severity="secondary"
          @click="isDialogVisible = false"
        />
        <Button label="Modifier" type="submit" />
      </div>
    </form>
  </Dialog>
</template>

