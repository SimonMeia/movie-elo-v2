<script setup lang="ts">
import { AverageGrades } from '@/app/types'

defineProps<{ data: AverageGrades }>()
</script>

<template>
  {{ data }}
</template>
