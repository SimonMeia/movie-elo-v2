<script setup lang="ts">
import type { ReviewResponse } from '@/types'
import Chip from 'primevue/chip'
import Divider from 'primevue/divider'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import ReviewHeader from './components/review_header.vue'
import ReviewGrades from './components/review_grades.vue'

const props = defineProps<ReviewResponse>()
</script>

<template>
  <ReviewHeader
    :backdrop-path="props.movie.backdropPath"
    :title="props.movie.title"
    :synopsis="props.movie.synopsis"
  ></ReviewHeader>
  <ReviewGrades :review="props.review"></ReviewGrades>
  <Divider />
  <Accordion>
    <AccordionTab
      v-for="viewing of props.review.viewings"
      :header="new Date(viewing.date).toLocaleDateString('fr-CH')"
    >
      <div class="flex flex-column gap-2">
        <div class="h-2rem flex flex-row justify-center align-items-center gap-2">
          <span>Endroit : </span>
          <Chip
            v-for="location in props.review.viewings[0].locations"
            :label="location.name"
          ></Chip>
        </div>
        <div class="h-2rem flex flex-row justify-center align-items-center gap-2">
          <span>Partners : </span>
          <Chip v-for="partner in props.review.viewings[0].partners" :label="partner.name"></Chip>
        </div>
      </div>
    </AccordionTab>
  </Accordion>

  <Divider />
  <div></div>
</template>

<style scoped></style>
