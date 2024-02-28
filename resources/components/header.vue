<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3'
import MovieEloLogo from '@/assets/icons/movieelo_logo.vue'
import Avatar from 'primevue/avatar'
</script>

<template>
  <header class="sticky top-0 z-50 border-b bg-surface-0 border-accent">
    <div class="flex items-center justify-between py-3 p-container">
      <Link href="/" :preserve-scroll="true" :preserve-state="true" aria-label="Homepage">
        <MovieEloLogo></MovieEloLogo>
      </Link>

      <Avatar
        label="V"
        style="background-color: #ece9fc; color: #2a1261"
        shape="circle"
        @click="router.get('/auth/logout')"
      />
    </div>
  </header>
</template>

<style scoped></style>
