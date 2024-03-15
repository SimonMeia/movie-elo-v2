<script setup lang="ts">
import { router } from '@inertiajs/vue3'
import Button from 'primevue/button'
import Layout from '@/layouts/default.vue'
</script>

<template>
  <Layout>
    <div class="container">
      <h1 class="my-8">Mon profil</h1>
      <Button label="Deconnexion" @click="router.get('/auth/logout')"></Button>
    </div>
  </Layout>
</template>

<style scoped></style>
