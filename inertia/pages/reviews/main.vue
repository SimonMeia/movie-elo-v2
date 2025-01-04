<script setup lang="ts">
import type { ReviewsResponse } from '@/app/types'
import Layout from '@/layouts/default.vue'
import GradesTable from './components/grades_table.vue'
import ViewingsTable from './components/viewings_table.vue'
import Tabs from 'primevue/tabs'
import Tab from 'primevue/tab'
import TabList from 'primevue/tablist'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'

const props = defineProps<ReviewsResponse>()

// const active = ref(0)

// const viewsItems = ref([
//   { label: 'Notes', icon: 'pi pi-star', command: () => (active.value = 0) },
//   { label: 'Visionnages', icon: 'pi pi-calendar', command: () => (active.value = 1) },
// ])
</script>

<template>
  <Layout>
    <div class="container">
      <h1 class="my-8">Mes reviews</h1>
      <Tabs value="0">
        <TabList>
          <Tab value="0"><i class="mr-2 pi pi-star"></i>Notes</Tab>
          <Tab value="1"><i class="mr-2 pi pi-calendar"></i>Visionnages</Tab>
        </TabList>
        <TabPanels :pt="{ root: '!p-0' }">
          <TabPanel value="0">
            <GradesTable :reviews="props.reviews" />
          </TabPanel>
          <TabPanel value="1">
            <ViewingsTable :reviews="props.reviews" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </Layout>
</template>

<style scoped></style>
@/app/types
