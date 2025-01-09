<script setup lang="ts">
import { AverageGrades } from '@/app/types'
import ProgressBar from 'primevue/progressbar'

defineProps<{ data: AverageGrades }>()
</script>

<template>
  <div class="h-full w-full flex items-center justify-center flex-col gap-8">
    <span class="text-center">Note moyenne de chaque catégorie :</span>
    <div class="w-full space-y-4">
      <div v-for="gradeType of data.gradeTypes" :key="gradeType.name" class="w-full">
        <label>{{ gradeType.name }}</label>

        <div class="w-full flex gap-4 items-center">
          <ProgressBar
            :value="(gradeType.average / gradeType.maxGrade) * 100"
            :showValue="false"
            :pt="{ root: 'grow !h-4', value: '!bg-accent' }"
          />
          <span class="w-12 text-center">
            {{ gradeType.average.toFixed(1) }} / {{ gradeType.maxGrade }}
          </span>
        </div>
      </div>
    </div>
    <div class="flex gap-2 items-baseline">
      Note moyenne des films :
      <h2 class="text-accent text-2xl">
        {{ data.overallAverage.toFixed(1) }}
      </h2>
      / {{ data.maxOverallGrade }}
    </div>
  </div>
</template>
