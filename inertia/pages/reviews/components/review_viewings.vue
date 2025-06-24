<script setup lang="ts">
import type { Viewing } from '@/app/types'
import LocationPartnerSelection from '@/components/location_partner_selection.vue'
import { router } from '@inertiajs/vue3'
import Accordion from 'primevue/accordion'
import AccordionContent from 'primevue/accordioncontent'
import AccordionHeader from 'primevue/accordionheader'
import AccordionPanel from 'primevue/accordionpanel'
import Button from 'primevue/button'
import DatePicker from 'primevue/calendar'
import Chip from 'primevue/chip'
import Dialog from 'primevue/dialog'
import { Ref, ref, watch } from 'vue'

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
  const formatedDate =
    date.value.getFullYear() +
    '-' +
    String(date.value.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(date.value.getDate()).padStart(2, '0')

  const review = {
    reviewId: props.reviewId,
    locations: locations.value,
    partners: partners.value,
    date: formatedDate,
  }

  router.visit('/app/viewings', {
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
  <div class="flex flex-row items-center gap-1">
    <h2 class="my-6">Derniers visionnages</h2>
    <div class="flex items-center p-2 cursor-pointer" @click="isDialogVisible = true">
      <i class="pi pi-plus-circle text-accent" @click="isDialogVisible = true" />
    </div>
  </div>
  <Accordion>
    <AccordionPanel v-for="viewing of viewings" :key="viewing.id" :value="viewing.id">
      <AccordionHeader>{{ new Date(viewing.date).toLocaleDateString('fr-CH') }}</AccordionHeader>
      <AccordionContent>
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
      </AccordionContent>
    </AccordionPanel>
  </Accordion>

  <Dialog
    v-model:visible="isDialogVisible"
    modal
    :pt="{ root: 'w-[95%] !max-w-lg', header: '!pb-2' }"
    :draggable="false"
    @hide="localErrors = {}"
  >
    <template #header>
      <h3 class="text-xl">Ajouter un visionnage</h3>
    </template>
    <form @submit.prevent="submitNewViewing">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-1">
          <label class="block mb-1 text-lg font-titles" for="">Date </label>
          <DatePicker v-model="date" :max-date="new Date()" />
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
        <Button label="Annuler" severity="secondary" @click="isDialogVisible = false" />
        <Button label="Créer" type="submit" />
      </div>
    </form>
  </Dialog>
</template>
