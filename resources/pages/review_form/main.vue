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

const props = defineProps<ReviewFormResponse>()

const tmdbMovieId = ref(parseInt(props.homeTmdbMovieId))

const grades = ref(props.dbGradeTypes.map((grade) => ({ gradeTypeId: grade.id, grade: 1 })))
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
  })
}
</script>

<template>
  <Layout>
    <div class="mt-8 container">
      <form @submit.prevent="submit">
        <pre v-if="props.errors">{{ props.errors }}</pre>
        <h1>Rate a movie</h1>
        <div class="flex flex-col gap-4">
          <div>
            <label class="block mb-1 text-lg font-titles" for="">Movie</label>
            <SearchTmdbMovieBar
              @update="tmdbMovieId = $event.tmdbMovieId"
              :initial-value="homeTmdbMovieTitle"
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
            <Calendar inline v-model="date" :max-date="new Date()" class="w-full" />
          </div>

          <LocationPartnerSelection
            location-or-partner="location"
            :items="dbLocations"
            @update="locations = $event"
          />
          <LocationPartnerSelection
            location-or-partner="partner"
            :items="dbPartners"
            @update="partners = $event"
          />
          <div>
            <label class="block mb-1 text-lg font-titles" for="">Commentaire</label>
            <Textarea class="w-full" rows="5" v-model="comment" autoResize />
          </div>
        </div>

        <Button type="submit" class="w-full my-2" label="Ajouter la review"></Button>
      </form>
    </div>
  </Layout>
</template>
