<script setup lang="ts">
import SearchTmdbMovieBar from '@/components/search_tmdb_movie_bar.vue'
import CategoryRating from './components/category_rating.vue'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import { Ref, ref, watchEffect } from 'vue'
import { router } from '@inertiajs/vue3'
import LocationPartnerSelection from '@/components/location_partner_selection.vue'
import Layout from '@/layouts/default.vue'
import type { ReviewFormResponse } from '@/app/types'
import Card from 'primevue/card'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import DatePicker from 'primevue/datepicker'

const props = defineProps<ReviewFormResponse>()

const tmdbMovieId = ref(parseInt(props.homeTmdbMovieId ?? '0'))

const grades = ref(props.dbGradeTypes.map((type) => ({ gradeTypeId: type.id, grade: 1 })))
const locations: Ref<string[]> = ref([])
const partners: Ref<string[]> = ref([])
const date = ref(new Date())
const comment = ref('')

watchEffect(() => console.log(date.value))
watchEffect(() => console.log(new Date(date.value)))

function updateGrade(gradeTypeId: number, grade: number) {
  const index = grades.value.findIndex((g) => g.gradeTypeId === gradeTypeId)
  if (index === -1) {
    grades.value.push({ gradeTypeId, grade })
  } else {
    grades.value[index].grade = grade
  }
}

function submit() {
  const formatedDate =
    date.value.getFullYear() +
    '-' +
    String(date.value.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(date.value.getDate()).padStart(2, '0')

  const review = {
    tmdbMovieId: tmdbMovieId.value,
    grades: grades.value,
    locations: locations.value,
    partners: partners.value,
    date: formatedDate,
    comment: comment.value === '' ? null : comment.value,
  }

  router.visit('/app/reviews', {
    method: 'post',
    data: review,
    preserveState: true,
    preserveScroll: true,
  })
}
</script>

<template>
  <Layout>
    <div class="container mt-8">
      <h1 class="mb-4">Ajout d'une nouvelle review</h1>
      <div class="flex flex-row gap-8">
        <form @submit.prevent="submit" class="flex flex-col w-full max-w-lg gap-4 md:gap-8">
          <div>
            <label class="block mb-1 text-lg font-titles" for="">Movie</label>
            <SearchTmdbMovieBar
              @update="tmdbMovieId = $event.tmdbMovieId"
              :initial-value="homeTmdbMovieTitle"
              :error="props.errors?.tmdbMovieId"
            />
          </div>
          <CategoryRating
            v-for="gradeType in dbGradeTypes"
            :key="gradeType.id"
            :category-name="gradeType.name"
            :max-grade="gradeType.maxGrade"
            :form-grade-type="dbGradeTypes.find((g) => g.id === gradeType.id)"
            @update="updateGrade(gradeType.id, $event)"
          />
          <div>
            <label class="block mb-1 text-lg font-titles" for="">Date de visionnage</label>
            <DatePicker
              inline
              selectOtherMonths
              v-model="date"
              :max-date="new Date()"
              class="w-full"
            />
          </div>

          <LocationPartnerSelection
            location-or-partner="location"
            :items="dbLocations"
            :error="props.errors?.locations"
            @update="locations = $event"
          />
          <LocationPartnerSelection
            location-or-partner="partner"
            :items="dbPartners"
            :error="props.errors?.partners"
            @update="partners = $event"
          />
          <div>
            <label class="block mb-1 text-lg font-titles" for="">Commentaire</label>
            <Textarea class="w-full" rows="5" v-model="comment" autoResize />
          </div>

          <Button type="submit" class="w-full my-2" label="Ajouter la review"></Button>
        </form>

        <div class="sticky hidden w-full max-w-lg top-24 lg:block h-fit">
          <Card>
            <template #title>Système de notes</template>
            <template #content>
              <Accordion>
                <AccordionPanel
                  v-for="gradeType in dbGradeTypes"
                  :key="gradeType.id"
                  :value="gradeType.id"
                >
                  <AccordionHeader>{{ gradeType.name }}</AccordionHeader>
                  <AccordionContent>
                    <div class="grid grid-cols-1 gap-2">
                      <div v-for="grade in gradeType.grades" :key="grade.id">
                        <h4 class="text-accent">{{ grade.grade }} - {{ grade.description }}</h4>
                        <p>{{ grade.movie }}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionPanel>
              </Accordion>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </Layout>
</template>
