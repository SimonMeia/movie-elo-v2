<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import MovieEloLogo from '@/icons/movieelo_logo.vue'
import Avatar from 'primevue/avatar'
</script>

<template>
  <header class="sticky top-0 z-5 bg-primary-reverse border-bottom-1 h-4rem">
    <div class="flex align-items-center justify-content-between py-2 p-container">
      <Link href="/" :preserve-scroll="true" :preserve-state="true" aria-label="Homepage" class="h-3rem">
        <MovieEloLogo></MovieEloLogo>
      </Link>

      <Avatar
        label="V"
        class="mr-2"
        size="normal"
        style="background-color: #ece9fc; color: #2a1261"
        shape="circle"
      />
    </div>
  </header>
</template>

<style scoped></style>
