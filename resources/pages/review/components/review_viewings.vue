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
  <h2 class="my-6">Derniers visionnages</h2>
  <Accordion>
    <AccordionTab
      v-for="viewing of viewings"
      :key="viewing.id"
      :header="new Date(viewing.date).toLocaleDateString('fr-CH')"
    >
      <div class="flex flex-col gap-2">
        <div>
          <h3>Endroit :</h3>
          <div
            v-for="location in viewing.locations"
            :key="location.id"
            class="inline-block mb-1 mr-1 grow"
          >
            <Chip :label="location.name" />
          </div>
        </div>
        <div>
          <h3>Partners :</h3>
          <div
            v-for="partner in viewing.partners"
            :key="partner.id"
            class="inline-block mb-1 mr-1 grow"
          >
            <Chip :label="partner.name"/>
          </div>
        </div>
      </div>
    </AccordionTab>
  </Accordion>
</template>

<style scoped></style>
