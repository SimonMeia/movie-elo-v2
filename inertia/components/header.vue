<script setup lang="ts">
import { Link, router, usePage } from '@inertiajs/vue3'
import MovieEloLogo from '@/assets/icons/movieelo_logo.vue'
import MovieEloLogoSmall from '@/assets/icons/movieelo_logo_small.vue'
import Avatar from 'primevue/avatar'
import Menubar from 'primevue/menubar'
import Message from 'primevue/message'
import { computed, ref } from 'vue'

const page = usePage()
const environment = computed(() => page.props.environment as 'production' | 'development')

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
      <template #item="{ item, props }">
        <a class="flex items-center" @click="item.action()" v-bind="props.action">
          <span>{{ item.label }}</span>
        </a>
      </template>
      <template #end>
        <div class="flex gap-2 items-center">
          <Message severity="info" v-if="environment === 'development'" class="m-2" closable>
            Environnement : {{ environment }}
          </Message>
          <Avatar icon="pi pi-user" @click="router.get('/profile')" class="cursor-pointer" />
        </div>
      </template>
    </Menubar>
  </header>
</template>

<style scoped></style>
