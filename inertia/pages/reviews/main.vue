<script setup lang="ts">
import type { PaginationMeta, ReviewResponse } from '@/app/types'
import Layout from '@/layouts/default.vue'
import GradesTable from './components/grades_table.vue'
import ViewingsTable from './components/viewings_table.vue'
import Button from 'primevue/button'
import Tabs from 'primevue/tabs'
import Tab from 'primevue/tab'
import TabList from 'primevue/tablist'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import { router } from '@inertiajs/vue3'

const props = defineProps<{ data: ReviewResponse[]; meta: PaginationMeta }>()

function loadMore() {
  if (props.meta.currentPage < props.meta.lastPage) {
    console.log('load more')
    router.visit(`/reviews?page=${props.meta.currentPage + 1}`, {
      method: 'get',
      only: ['data', 'meta'],
      replace: true,
      preserveScroll:true
    })
  }
}
</script>

<template>
  <Layout>
    <div class="container">
      <h1 class="my-8">Mes reviews</h1>
      <pre>{{ meta }}</pre>
      <Tabs value="0">
        <TabList>
          <Tab value="0"><i class="mr-2 pi pi-star"></i>Notes</Tab>
          <Tab value="1"><i class="mr-2 pi pi-calendar"></i>Visionnages</Tab>
        </TabList>
        <TabPanels :pt="{ root: '!p-0' }">
          <TabPanel value="0">
            <GradesTable :reviews="data" />
            <div class="bg-red-800 h-96"></div>
            <div class="bg-red-800 h-96"></div>
            <div class="bg-red-800 h-96"></div>
            <div class="bg-red-800 h-96"></div>

            <Button label="more" @click="loadMore"></Button>
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
@/app/types
