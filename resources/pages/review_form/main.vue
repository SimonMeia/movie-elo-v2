<script setup lang="ts">
import SearchTmdbMovieBar from '@/components/search_tmdb_movie_bar.vue'
import CategoryRating from './components/category_rating.vue'
import Calendar from 'primevue/calendar'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import LocationPartnerSelection from './components/location_partner_selection.vue'
import Layout from '@/layouts/default.vue'
import type { ReviewFormResponse } from '@/types'
import Card from 'primevue/card'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'

const props = defineProps<ReviewFormResponse>()

const tmdbMovieId = ref(parseInt(props.homeTmdbMovieId))

const grades = ref(props.dbGradeTypes.map((type) => ({ gradeTypeId: type.id, grade: 1 })))
const locations = ref([])
const partners = ref([])
const date = ref(new Date())
const comment = ref('')

function submit() {
  console.log('submit')
  const review = {
    tmdbMovieId: tmdbMovieId.value,
    grades: grades.value,
    locations: locations.value,
    partners: partners.value,
    date: date.value.toISOString().split('T')[0],
    comment: comment.value === '' ? null : comment.value,
  }

  router.visit('/reviews', {
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
      <div class="flex flex-row justify-center gap-8 md:justify-evenly">
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
            @update="grades.find((g) => g.gradeTypeId === gradeType.id).grade = $event"
          />
          <div>
            <label class="block mb-1 text-lg font-titles" for="">Date de visionnage</label>
            <Calendar
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
        <Card class="sticky hidden w-full max-w-lg top-24 lg:block h-fit">
          <template #title>Système de notes</template>
          <template #content>
            <Accordion>
              <AccordionTab v-for="gradeType in dbGradeTypes" :key="gradeType.id">
                <template #header>
                  {{ gradeType.name }}
                </template>
                <div class="grid grid-cols-1 gap-2">
                  <div v-for="grade in gradeType.grades" :key="grade.id">
                    <h4 class="text-accent">{{ grade.grade }} - {{ grade.description }}</h4>
                    <p>Pas encore de film</p>
                  </div>
                </div>
              </AccordionTab>
            </Accordion>
          </template>
        </Card>
      </div>
    </div>
  </Layout>
</template>
