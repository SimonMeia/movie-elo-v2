<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3'
import MovieEloLogo from '@/assets/icons/movieelo_logo.vue'
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
  <header class="sticky top-0 z-50 py-1 border-b bg-surface-0 border-accent">
    <Menubar :model="items">
      <template #start>
        <Link href="/" :preserve-scroll="true" :preserve-state="true" aria-label="Homepage">
          <MovieEloLogo></MovieEloLogo>
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
          @click="router.get('/auth/logout')"
        />
      </template>
    </Menubar>
  </header>

  <!-- <div class="container flex items-center justify-between py-3">
    <div class="flex justify-end mr-12 grow">
      <Button label="Ajouter une review" link @click="router.get('/review-form')" />
      <Button label="Mes reviews" link @click="router.get('/reviews')" />
      <Button label="Elo ranking" link disabled @click="router.get('/elo-ranking')" />
      <Button label="Rewind" link disabled @click="router.get('/rewind')" />
    </div>
  </div> -->
</template>

<style scoped></style>
