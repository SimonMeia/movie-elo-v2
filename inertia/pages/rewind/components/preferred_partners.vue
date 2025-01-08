<script setup lang="ts">
import { PreferredPartners } from '@/app/types'

defineProps<{ data: PreferredPartners }>()
</script>

<template>
  {{ data }}
</template>
