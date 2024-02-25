<script setup lang="ts">
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
</script>

<template>
  <div class="min-h-full flex flex-column">
    <Header />

    <slot />

    <Footer />
  </div>
</template>

<style scoped></style>
