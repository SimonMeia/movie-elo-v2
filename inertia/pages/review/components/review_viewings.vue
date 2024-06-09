<script setup lang="ts">
import Chip from 'primevue/chip'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import type { Viewing } from '@/app/types'
import { Ref, ref, watch } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Calendar from 'primevue/calendar'
import LocationPartnerSelection from '@/components/location_partner_selection.vue'
import { router } from '@inertiajs/vue3'

const props = defineProps<{
  reviewId: number
  viewings: Viewing[]
  dbLocations: string[]
  dbPartners: string[]
  errors?: {
    date?: string[]
    locations?: string[]
    partners?: string[]
  }
}>()

const isDialogVisible = ref(false)

const localErrors = ref(props.errors || {})
watch(
  () => props.errors,
  (newErrors) => {
    localErrors.value = newErrors || {}
  }
)

const partners: Ref<string[]> = ref([])
const locations: Ref<string[]> = ref([])
const date = ref(new Date())

function submitNewViewing() {
  console.log('submit')
  const review = {
    reviewId: props.reviewId,
    locations: locations.value,
    partners: partners.value,
    date: date.value.toISOString().split('T')[0],
  }

  console.log(review)

  router.visit('/viewings', {
    method: 'post',
    data: review,
    preserveState: true,
    preserveScroll: true,
    onSuccess: () => {
      partners.value = []
      locations.value = []
      date.value = new Date()
      isDialogVisible.value = false
    },
  })
}
</script>

<template>
  <div class="flex flex-row items-center gap-2">
    <h2 class="my-6">Derniers visionnages</h2>
    <Button
      label="+"
      rounded
      :pt="{ root: { class: 'w-6 h-6 !p-0' } }"
      :pt-options="{ mergeProps: true }"
      @click="isDialogVisible = true"
    />
  </div>
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
            <Chip :label="partner.name" />
          </div>
        </div>
      </div>
    </AccordionTab>
  </Accordion>

  <Dialog
    v-model:visible="isDialogVisible"
    modal
    :pt="{
      content: '!pb-6',
    }"
    :ptOptions="{
      mergeProps: true,
    }"
    :draggable="false"
    @hide="localErrors = {}"
  >
    <template #header>
      <h3>Ajouter un visionnage</h3>
    </template>
    <form @submit.prevent="submitNewViewing">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-1">
          <label class="block mb-1 text-lg font-titles" for="">Date </label>
          <Calendar v-model="date" :max-date="new Date()" />
          <small v-if="localErrors?.date" class="text-red-500">{{ localErrors?.date[0] }}</small>
        </div>
        <div class="flex flex-col gap-1">
          <LocationPartnerSelection
            location-or-partner="partner"
            :items="dbPartners"
            :error="localErrors?.partners"
            @update="partners = $event"
          />
        </div>
        <div class="flex flex-col gap-1">
          <LocationPartnerSelection
            location-or-partner="location"
            :items="dbLocations"
            :error="localErrors?.locations"
            @update="locations = $event"
          />
        </div>
      </div>
      <div class="flex justify-end gap-4 mt-6">
        <Button
          label="Annuler"
          class="p-button-text"
          severity="contrast"
          @click="isDialogVisible = false"
        />
        <Button label="Créer" class="p-button-text" type="submit" />
      </div>
    </form>
  </Dialog>
</template>

<style scoped></style>
