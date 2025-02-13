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
  sortField: string
  sortOrder: string
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
  router.visit(`/app/reviews?tab=${newTab}`, {
    replace: true,
  })
}

function search() {
  const query = new URLSearchParams({ tab: props.tab || '', searchQuery: searchQuery.value })
  if (props.sortField) query.append('sortField', props.sortField)
  if (props.sortOrder) query.append('sortOrder', props.sortOrder)
  query.toString()
  router.visit(`/app/reviews?${query}`, {
    replace: true,
  })
}

function sort(event: { field: string; order: number }) {
  const order = event.order === 1 ? 'asc' : 'desc' // 1 = asc, -1 = desc

  const query = new URLSearchParams({ tab: props.tab || '', searchQuery: searchQuery.value })
  if (event.field) {
    query.append('sortField', event.field)
    query.append('sortOrder', order)
  }
  query.toString()

  router.visit(`/app/reviews?${query}`, { replace: true })
}
</script>

<template>
  <Layout>
    <div class="container">
      <h1 class="my-8">Mes reviews</h1>
      <div class="flex items-center justify-end w-full mb-4 md:hidden">
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
          <div class="items-center justify-end hidden w-full md:flex">
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
            <GradesTable
              :data="gradesTabData"
              :isChangingTab
              @sort="sort"
              :sort-field="sortField"
              :sort-order="sortOrder === 'asc' ? 1 : -1"
            />
          </TabPanel>
          <TabPanel value="viewings">
            <ViewingsTable
              :data="viewingsTabData"
              :isChangingTab
              @sort="sort"
              :sort-field="sortField"
              :sort-order="sortOrder === 'asc' ? 1 : -1"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <div
        v-if="meta.currentPage < meta.lastPage && !isChangingTab"
        v-element-visibility="onElementVisibility"
        class="flex items-center justify-center h-24 text-center"
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
