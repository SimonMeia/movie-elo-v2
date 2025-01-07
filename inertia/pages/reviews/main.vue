<script setup lang="ts">
import type { PaginationMeta, ReviewResponse } from '@/app/types'
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

const props = defineProps<{ data: ReviewResponse[]; meta: PaginationMeta }>()
const isLoaderVisible = ref(false)

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
  router.visit(`/reviews?page=${props.meta.currentPage + 1}`, {
    method: 'get',
    only: ['data', 'meta'],
    replace: true,
    preserveScroll: true,
  })
}
</script>

<template>
  <Layout>
    <div class="container">
      <h1 class="my-8">Mes reviews</h1>
      <Tabs value="0">
        <TabList>
          <Tab value="0"><i class="mr-2 pi pi-star"></i>Notes</Tab>
          <!--          <Tab value="1"><i class="mr-2 pi pi-calendar"></i>Visionnages</Tab>-->
        </TabList>
        <TabPanels :pt="{ root: '!p-0' }">
          <TabPanel value="0">
            <GradesTable :reviews="data" />
            <div
              v-if="meta.currentPage < meta.lastPage"
              v-element-visibility="onElementVisibility"
              class="h-24 text-center flex items-center justify-center"
            >
              <i
                v-if="isLoaderVisible"
                class="pi pi-spinner animate-spin text-accent"
                style="font-size: 2rem"
              ></i>
            </div>
          </TabPanel>
          <TabPanel value="1">
            <ViewingsTable :reviews="data" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </Layout>
</template>

<style scoped></style>
