<script setup lang="ts">
import type { ReviewResponse } from '@/types'

const props = defineProps<ReviewResponse>()
</script>

<template>
  <h1>Rating</h1>
  <pre>
    {{ props }}
  </pre>
</template>

<style scoped></style>
