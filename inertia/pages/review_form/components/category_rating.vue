<script setup lang="ts">
import SelectButton from 'primevue/selectbutton'
import { computed, ref } from 'vue'

const props = defineProps<{
  maxGrade: number
  categoryName: string
  grade?: number
  error?: string
}>()

const emit = defineEmits<{
  update: [grade: number]
}>()

const value = ref(props.grade ?? 1)
const options = computed(() => Array.from({ length: props.maxGrade }, (_, i) => i + 1))
const fieldId = computed(() => `${props.categoryName.toLocaleLowerCase()}-grade-input`)
</script>

<template>
  <div>
    <label class="block mb-1 text-lg font-titles" :for="fieldId">{{ categoryName }}</label>
    <SelectButton
      :id="fieldId"
      v-model="value"
      :options="options"
      :allowEmpty="false"
      @change="emit('update', value)"
      :pt="{
        root: 'flex w-full h-10',
        button: { style: { 'flex-grow': 1, 'justify-content': 'center' } },
      }"
    />
    <small v-if="props.error" class="text-red-500">
      {{ props.error }}
    </small>
  </div>
</template>
