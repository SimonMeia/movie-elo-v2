<script setup lang="ts">
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-full mb-4">
    <Header />

    <slot />

    <Footer />
  </div>
</template>

<style scoped></style>
