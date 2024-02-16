<script setup lang="ts">
import SelectButton from 'primevue/selectbutton'
import GradeDescription from './grade_description.vue'
import { computed, ref } from 'vue'

const props = defineProps<{
  maxGrade: number
  categoryName: string
}>()

const emit = defineEmits<{
  update: [grade: number]
}>()

const value = ref(1)
const options = computed(() => Array.from({ length: props.maxGrade }, (_, i) => i + 1))
const fieldId = computed(() => `${props.categoryName.toLocaleLowerCase()}-grade-input`)
</script>

<template>
  <div>
    <label :for="fieldId">{{ categoryName }}</label>
    <GradeDescription :max-grade="maxGrade" />
    <SelectButton
      :id="fieldId"
      v-model="value"
      :options="options"
      :allowEmpty="false"
      @change="emit('update', value)"
      :pt="{
        root: { style: { width: '100%', display: 'flex', height: '3rem' } },
        button: { style: { 'flex-grow': 1 } },
      }"
    />
  </div>
</template>
