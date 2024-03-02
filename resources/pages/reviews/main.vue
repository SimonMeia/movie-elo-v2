<script setup lang="ts">
import type { ReviewsResponse } from '@/types'
import Layout from '@/layouts/default.vue'
import { ref } from 'vue'
import TabMenu from 'primevue/tabmenu'
import { watchEffect } from 'vue'
import GradesTable from './components/grades_table.vue'
import ViewingsTable from './components/viewings_table.vue'


const props = defineProps<ReviewsResponse>()


const active = ref(0)

const viewsItems = ref([
  { label: 'Notes', icon: 'pi pi-star', command: () => (active.value = 0) },
  { label: 'Visionnages', icon: 'pi pi-calendar', command: () => (active.value = 1) },
])

</script>

<template>
  <Layout>
    <div class="container">
      <h1 class="my-8">Mes reviews</h1>
      <TabMenu v-model:activeIndex="active" :model="viewsItems" />
      <GradesTable :reviews="props.reviews" v-if="active === 0"></GradesTable>
      <ViewingsTable :reviews="props.reviews" v-if="active === 1"></ViewingsTable>
    </div>
  </Layout>
</template>

<style scoped></style>
