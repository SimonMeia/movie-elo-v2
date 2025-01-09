<script setup lang="ts">
import Layout from '@/layouts/default.vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
</script>
<template>
  <Layout>
    <div class="container flex justify-center mt-8">
      <Card class="w-fit p-8 text-center">
        <template #content>
          <div class="space-y-4">
            <h1 class="text-9xl text-accent">404</h1>
            <h2 class="title">Page not found</h2>
            <div>La page souhaitée n'est pas disponible</div>
            <Button label="Retour à la homepage" />
          </div>
        </template>
      </Card>
    </div>
  </Layout>
</template>
