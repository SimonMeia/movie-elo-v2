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

const props = defineProps<{
  meta: PaginationMeta
  gradesTabData: GradedReview[]
  viewingsTabData: ViewingWithMovieTitle[]
  tab: string
}>()
const isLoaderVisible = ref(false)
const isChangingTab = ref(false)

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
  router.visit(`?page=${props.meta.currentPage + 1}&tab=${props.tab}`, {
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
</script>

<template>
  <Layout>
    <div class="container">
      <h1 class="my-8">Mes reviews</h1>
      <Tabs :value="tab ?? 'grades'" @update:value="changeTab($event as string)">
        <TabList>
          <Tab value="grades"><i class="mr-2 pi pi-star"></i>Notes</Tab>
          <Tab value="viewings"><i class="mr-2 pi pi-calendar"></i>Visionnages</Tab>
        </TabList>
        <TabPanels :pt="{ root: '!p-0' }">
          <TabPanel value="grades">
            <GradesTable :data="gradesTabData" />
          </TabPanel>
          <TabPanel value="viewings">
            <ViewingsTable :data="viewingsTabData" />
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
