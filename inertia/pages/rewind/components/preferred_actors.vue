<script setup lang="ts">
import { PreferredActors } from '@/app/types'

defineProps<{ data: PreferredActors }>()
</script>

<template>
  {{ data }}
</template>
