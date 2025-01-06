<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3'
import MovieEloLogo from '@/assets/icons/movieelo_logo.vue'
import MovieEloLogoSmall from '@/assets/icons/movieelo_logo_small.vue'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import { ref } from 'vue'
import Badge from 'primevue/badge'

const items = ref([
  {
    label: 'Home',
    action: () => router.get('/'),
  },
  {
    label: 'Ajouter une review',
    action: () => router.get('/review-form'),
  },
  {
    label: 'Mes reviews',
    action: () => router.get('/reviews'),
  },
  // {
  //   label: 'Elo ranking',
  //   action: () => router.get('/elo-rankings'),
  // },
  // {
  //   label: 'Rewind',
  //   action: () => router.get('/rewind'),
  // },
])
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-accent">
    <Menubar :model="items" :pt="{ root: '!bg-white' }">
      <template #start>
        <Link href="/" :preserve-scroll="true" :preserve-state="true" aria-label="Homepage">
          <div class="hidden mr-4 md:block">
            <MovieEloLogo></MovieEloLogo>
          </div>
          <div class="block h-8 md:hidden">
            <MovieEloLogoSmall></MovieEloLogoSmall>
          </div>
        </Link>
      </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <a class="flex items-center" @click="item.action()" v-bind="props.action">
          <span>{{ item.label }}</span>
        </a>
      </template>
      <template #end>
        <Avatar
          label="V"
          style="background-color: #ece9fc; color: #2a1261"
          shape="circle"
          @click="router.get('/profile')"
        />
      </template>
    </Menubar>
  </header>
</template>

<style scoped></style>
