<script setup lang="ts">
import Fold from './fold.vue'
import MainFeatures from './main_features.vue'
import OtherFeatures from './other_features.vue'
import MovieEloLogo from '@/assets/icons/movieelo_logo.vue'
</script>

<template>
  <header class="border-b border-accent py-4">
    <div class="container mx-auto flex justify-between items-center">
      <MovieEloLogo></MovieEloLogo>

      <nav>
        <ul class="flex gap-4">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>

      <Button label="Login"></Button>
    </div>
  </header>

  <main class="container mx-auto space-y-48">
    <Fold />

    <MainFeatures />

    <OtherFeatures />
  </main>

  <footer class="border-t border-accent py-8 mt-12">
    <div class="container mx-auto">
      <p class="text-center">© {{ new Date().getFullYear() }} Movie Elo. Tous droits reservés.</p>
    </div>
  </footer>
</template>
