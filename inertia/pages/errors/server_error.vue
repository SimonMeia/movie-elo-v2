<script setup lang="ts">
import Button from 'primevue/button'
import Card from 'primevue/card'
import { router } from '@inertiajs/vue3'

defineProps<{ errorCode: number }>()
</script>
<template>
  <div class="container flex justify-center mt-8">
    <Card class="w-fit p-8 text-center">
      <template #content>
        <div class="space-y-4">
          <h1 class="text-9xl text-accent">{{ errorCode }}</h1>
          <h2 class="title">Server error</h2>
          <div>La page souhaitée n'est pas disponible</div>
          <Button label="Retour à la homepage" @click="router.get('/home')" />
        </div>
      </template>
    </Card>
  </div>
</template>
