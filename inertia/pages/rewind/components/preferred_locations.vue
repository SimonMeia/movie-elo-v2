<script setup lang="ts">
import { PreferredLocations } from '@/app/types'

defineProps<{ data: PreferredLocations }>()
</script>

<template>
  {{ data }}
</template>
