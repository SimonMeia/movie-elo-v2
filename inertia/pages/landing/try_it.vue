<script setup lang="ts">
import { router } from '@inertiajs/vue3'
</script>

<template>
  <div class="space-y-4 text-center" id="try-it">
    <p>Envie d'avoir une historique des films que vous avez vu ?</p>
    <h2 class="text-4xl sm:text-5xl font-titles text-accent">Essayez Movie Elo gratuitement</h2>
    <Button label="S'inscrire" @click="router.visit('/app/auth')"></Button>
  </div>
</template>
