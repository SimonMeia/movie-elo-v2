<script setup lang="ts">
import { GradedReview, PaginationMeta, ViewingWithMovieTitle } from '@/app/types'
import Layout from '@/layouts/default.vue'
import GradesTable from './components/grades_table.vue'
import ViewingsTable from './components/viewings_table.vue'
import Tabs from 'primevue/tabs'
import Tab from 'primevue/tab'
import TabList from 'primevue/tablist'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import { router } from '@inertiajs/vue3'
import { vElementVisibility } from '@vueuse/components'
import { onMounted, onUnmounted, ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const props = defineProps<{
  meta: PaginationMeta
  gradesTabData: GradedReview[]
  viewingsTabData: ViewingWithMovieTitle[]
  tab: string
  searchQuery: string
}>()
const isLoaderVisible = ref(false)
const isChangingTab = ref(false)
const searchQuery = ref(props.searchQuery)
const STORAGE_KEY = 'scrollPosition'

// ✅ Fonction pour sauvegarder la position du scroll
const saveScrollPosition = () => {
  localStorage.setItem(STORAGE_KEY, window.scrollY.toString())
}

// ✅ Fonction pour restaurer la position du scroll
const restoreScrollPosition = () => {
  const savedPosition = localStorage.getItem(STORAGE_KEY)
  if (savedPosition) {
    window.scrollTo(0, parseInt(savedPosition, 10))
  }
}

onMounted(() => {
  // Restaurer la position du scroll au montage
  restoreScrollPosition()

  // Sauvegarder la position lors du scroll
  window.addEventListener('scroll', saveScrollPosition)
})

onUnmounted(() => {
  // Nettoyer l'événement au démontage
  window.removeEventListener('scroll', saveScrollPosition)
})

function onElementVisibility(divVisiblity: boolean) {
  if (divVisiblity && props.meta.currentPage < props.meta.lastPage) {
    isLoaderVisible.value = true
    loadMore()
  } else {
    isLoaderVisible.value = false
  }
}

function loadMore() {
  router.visit(`?page=${props.meta.currentPage + 1}&tab=${props.tab}&search=${searchQuery.value}`, {
    only: ['gradesTabData', 'viewingsTabData', 'meta'],
    replace: true,
    preserveScroll: true,
  })
}

function changeTab(newTab: string) {
  isChangingTab.value = true
  router.visit(`/reviews?tab=${newTab}`, {
    replace: true,
  })
}

function search() {
  router.visit(`/reviews?searchQuery=${searchQuery.value}&tab=${props.tab}`, {
    replace: true,
  })
}
</script>

<template>
  <Layout>
    <div class="container">
      <h1 class="my-8">Mes reviews</h1>
      <div class="items-center w-full justify-end md:hidden flex mb-4">
        <InputText
          size="small"
          v-model="searchQuery"
          placeholder="Rechercher un film"
          class="w-full"
        />
        <Button
          icon="pi pi-search"
          class="ml-2"
          :pt="{ root: 'aspect-square !min-w-10' }"
          @click="search"
        ></Button>
      </div>
      <Tabs :value="tab ?? 'grades'" @update:value="changeTab($event as string)">
        <TabList>
          <Tab value="grades"><i class="mr-2 pi pi-star"></i>Notes</Tab>
          <Tab value="viewings"><i class="mr-2 pi pi-calendar"></i>Visionnages</Tab>
          <div class="items-center w-full justify-end hidden md:flex">
            <InputText
              size="small"
              v-model="searchQuery"
              placeholder="Rechercher un film"
              class="w-64"
            />
            <Button
              icon="pi pi-search"
              class="ml-2"
              :pt="{ root: 'aspect-square !w-10' }"
              @click="search"
            ></Button>
          </div>
        </TabList>
        <TabPanels :pt="{ root: '!p-0' }">
          <TabPanel value="grades">
            <GradesTable :data="gradesTabData" :isChangingTab />
          </TabPanel>
          <TabPanel value="viewings">
            <ViewingsTable :data="viewingsTabData" :isChangingTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <div
        v-if="meta.currentPage < meta.lastPage && !isChangingTab"
        v-element-visibility="onElementVisibility"
        class="h-24 text-center flex items-center justify-center"
      >
        <i
          v-if="isLoaderVisible"
          class="pi pi-spinner animate-spin text-accent"
          style="font-size: 2rem"
        ></i>
      </div>
    </div>
  </Layout>
</template>

<style scoped></style>
