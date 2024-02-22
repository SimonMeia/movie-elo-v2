<script setup lang="ts">
import type { ReviewResponse } from '@/types'
import Chip from 'primevue/chip'
import Divider from 'primevue/divider'
import { computed } from 'vue'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'

const props = defineProps<ReviewResponse>()

const finalGrade = computed(
  () => (Object.values(props.review.grades).reduce((total, grade) => total + grade, 0) / 20) * 100
)
</script>

<template>
  <h1>Rating</h1>
  <h2>Movie {{ props.movie.title }}</h2>
  <div>
    <div>
      <span>Histoire : </span>
      <span> {{ props.review.grades.story }}</span>
    </div>
    <div>
      <span>Acting : </span>
      <span> {{ props.review.grades.acting }}</span>
    </div>
    <div>
      <span>Réalisation : </span>
      <span> {{ props.review.grades.directing }}</span>
    </div>
    <div>
      <span>Musique : </span>
      <span> {{ props.review.grades.music }}</span>
    </div>
    <div>
      <span>Feeling à la fin du film : </span>
      <span> {{ props.review.grades.feeling }}</span>
    </div>
    <div>
      <span>Note personnel : </span>
      <span> {{ props.review.grades.personal }}</span>
    </div>
    <div>
      <span>Note :</span>
      <span>{{ finalGrade }}%</span>
    </div>
  </div>
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
