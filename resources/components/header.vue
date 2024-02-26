<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3'
import MovieEloLogo from '@/icons/movieelo_logo.vue'
import Avatar from 'primevue/avatar'
</script>

<template>
  <header class="sticky top-0 z-5 bg-primary-reverse border-bottom-1">
    <div class="flex align-items-center justify-content-between py-3 p-container">
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
