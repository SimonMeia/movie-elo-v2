<script setup lang="ts">
import SelectButton from 'primevue/selectbutton'
import Dialog from 'primevue/dialog'
import { computed, ref } from 'vue'
import type { FormGradeType } from '@/app/types'

const props = defineProps<{
  maxGrade: number
  categoryName: string
  grade?: number
  error?: string
  formGradeType?: FormGradeType
}>()

const emit = defineEmits<{
  update: [grade: number]
}>()

const value = ref(props.grade ?? 1)
const options = computed(() =>
  Array.from({ length: props.maxGrade }, (_, i) => ({
    label: (i + 1).toString(),
    value: i + 1,
  }))
)
const isDialogVisible = ref(false)
const fieldId = computed(() => `${props.categoryName.toLocaleLowerCase()}-grade-input`)
</script>

<template>
  <div class="category-rating">
    <div class="flex flex-row items-center gap-1 mb-1">
      <label class="block text-lg font-titles" :for="fieldId">{{ categoryName }}</label>
      <div class="flex items-center p-2 cursor-pointer lg:hidden" @click="isDialogVisible = true">
        <i class="pi pi-eye text-accent" @click="isDialogVisible = true" />
      </div>
    </div>
    <SelectButton
      :id="fieldId.toString()"
      v-model="value"
      :options="options"
      optionLabel="label"
      optionValue="value"
      :allowEmpty="false"
      @change="emit('update', value)"
      :pt="{ root: 'flex w-full h-10' }"
    />
    <small v-if="props.error" class="text-red-500">
      {{ props.error }}
    </small>

    <Dialog
      v-model:visible="isDialogVisible"
      modal
      :draggable="false"
      :pt="{ root: 'w-[95%] !max-w-lg', header: '!pb-2' }"
    >
      <template #header>
        <h3 class="text-xl">{{ categoryName }}</h3>
      </template>
      <div class="grid grid-cols-1 gap-2">
        <div v-for="grade in formGradeType?.grades" :key="grade.id">
          <h4 class="text-accent">{{ grade.grade }} - {{ grade.description }}</h4>
          <p>{{ grade.movie }}</p>
        </div>
      </div>
    </Dialog>
  </div>
</template>
