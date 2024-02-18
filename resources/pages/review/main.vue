<script setup lang="ts">
import type { ReviewResponse } from '@/types'
import { watchEffect } from 'vue';

const props = defineProps<ReviewResponse>()

watchEffect(() => console.log(props))
</script>

<template>
  <h1>Rating</h1>
  <h2>Movie {{ props.movie.title }}</h2>
  <pre>
    {{ props.review }}
  </pre>
</template>

<style scoped></style>
