<script setup lang="ts">
import Fold from '@/pages/landing/fold.vue'
import MainFeatures from '@/pages/landing/main_features.vue'
import OtherFeatures from '@/pages/landing/other_features.vue'
import MovieEloLogo from '@/assets/icons/movieelo_logo.vue'
import TryIt from '@/pages/landing/try_it.vue'
import { router } from '@inertiajs/vue3'
import PopcornIcon from '@/pages/landing/icons/popcorn_icon.vue'
// import Story from '@/pages/landing/story.vue'
</script>

<template>
  <header class="py-4 border-b border-accent sticky top-0 bg-white z-50">
    <div class="container flex items-center justify-between mx-auto">
      <MovieEloLogo></MovieEloLogo>

      <nav class="hidden sm:block">
        <ul class="flex gap-8">
          <li
            class="py-2 px-4 rounded hover:bg-gray-200 cursor-pointer transition-all ease-linear duration-100"
          >
            <a href="#">Home</a>
          </li>
          <li
            class="py-2 px-4 rounded hover:bg-gray-200 cursor-pointer transition-all ease-linear duration-100"
          >
            <a href="#main-features">Fonctionnalités</a>
          </li>
        </ul>
      </nav>

      <Button label="Login" @click="router.visit('/auth')"></Button>
    </div>
  </header>

  <div class="absolute inset-0">
    <div
      class="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]"
    ></div>
  </div>

  <main class="container mx-auto space-y-24 lg:space-y-48">
    <Fold />

    <MainFeatures />

    <OtherFeatures />

    <TryIt />

    <!-- <Story /> -->
  </main>

  <footer class="py-8 border-t mt-36 border-accent">
    <div
      class="flex flex-col text-center lg:flex-row lg:text-left justify-between items-center gap-4 container"
    >
      <div class="text-center">
        © {{ new Date().getFullYear() }} Movie Elo. Tous droits reservés.
      </div>

      <div>
        This product uses the
        <a href="https://developer.themoviedb.org/" target="_blank" class="font-bold underline"
          >TMDB API</a
        >
        but is not endorsed or certified by TMDB.
      </div>

      <div class="flex items-center gap-2">
        Fait avec du
        <PopcornIcon />
        par
        <a href="https://github.com/SimonMeia" target="_blank" class="text-accent font-bold">
          Simon Meia
        </a>
      </div>
    </div>
  </footer>
</template>
