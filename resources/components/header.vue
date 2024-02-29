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
    icon: 'pi pi-home',
  },
  {
    label: 'Ajouter une review',
    icon: 'pi pi-star',
  },
  {
    label: 'Mes reviews',
    icon: 'pi pi-search',
  },
  {
    label: 'Elo ranking',
    icon: 'pi pi-envelope',
    badge: 3,
  },
  {
    label: 'Rewind',
    icon: 'pi pi-envelope',
    badge: 3,
  },
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
        <a class="flex items-center" v-bind="props.action">
          <!-- <span :class="item.icon" /> -->
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
