<script setup lang="ts">
import Chip from 'primevue/chip'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import type { Viewing } from '@/types'

const props = defineProps<{
  viewings: Viewing[]
}>()
</script>

<template>
  <Accordion>
    <AccordionTab
      v-for="viewing of viewings"
      :key="viewing.id"
      :header="new Date(viewing.date).toLocaleDateString('fr-CH')"
    >
      <div class="flex flex-col gap-2">
        <div class="flex flex-row items-center justify-start gap-2 h-2rem">
          <span>Endroit : </span>
          <Chip
            v-for="location in viewing.locations"
            :key="location.id"
            :label="location.name"
          ></Chip>
        </div>
        <div class="flex flex-row items-center justify-start gap-2 h-2rem">
          <span>Partners : </span>
          <Chip v-for="partner in viewing.partners" :key="partner.id" :label="partner.name"></Chip>
        </div>
      </div>
    </AccordionTab>
  </Accordion>
</template>

<style scoped></style>
