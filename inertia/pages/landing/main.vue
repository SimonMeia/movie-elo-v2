<script setup lang="ts">
import Fold from '@/pages/landing/fold.vue'
import MainFeatures from '@/pages/landing/main_features.vue'
import OtherFeatures from '@/pages/landing/other_features.vue'
import MovieEloLogo from '@/assets/icons/movieelo_logo.vue'
import TryIt from '@/pages/landing/try_it.vue'
import Story from '@/pages/landing/story.vue'
</script>

<template>
  <header class="py-4 border-b border-accent">
    <div class="container flex items-center justify-between mx-auto">
      <MovieEloLogo></MovieEloLogo>

      <nav class="hidden sm:block">
        <ul class="flex gap-8">
          <li><a href="#">Home</a></li>
          <li><a href="#main-features">Fonctionnalités</a></li>
          <li><a href="#story">L'histoire</a></li>
        </ul>
      </nav>

      <Button label="Login"></Button>
    </div>
  </header>

  <main class="container mx-auto space-y-48">
    <Fold />

    <MainFeatures />

    <OtherFeatures />

    <TryIt />

    <!-- <Story /> -->
  </main>

  <footer class="py-8 border-t mt-36 border-accent">
    <div class="container mx-auto">
      <p class="text-center">© {{ new Date().getFullYear() }} Movie Elo. Tous droits reservés.</p>
    </div>
  </footer>
</template>
