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

const props = defineProps<{
  homeTmdbMovieId: string
  homeTmdbMovieTitle: string
  dbLocations: string[]
  dbPartners: string[]
}>()

console.log(props)

const tmdbMovieId = ref(parseInt(props.homeTmdbMovieId))

const grades = ref({
  story: 1,
  acting: 1,
  music: 1,
  directing: 1,
  feeling: 1,
  personal: 1,
})
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
    <div class="p-container">
      <form @submit.prevent="submit">
        <h1>Rate a movie</h1>
        <div class="flex flex-col gap-4">
          <div>
            <label for="">Movie</label>
            <SearchTmdbMovieBar
              @update="tmdbMovieId = $event.tmdbMovieId"
              :initial-value="homeTmdbMovieTitle"
            />
          </div>
          <CategoryRating category-name="Histoire" :max-grade="5" @update="grades.story = $event" />
          <CategoryRating category-name="Acting" :max-grade="3" @update="grades.acting = $event" />
          <CategoryRating category-name="Musique" :max-grade="3" @update="grades.music = $event" />
          <CategoryRating
            category-name="Réalisation"
            :max-grade="3"
            @update="grades.directing = $event"
          />
          <CategoryRating
            category-name="Feeling à la fin du film"
            :max-grade="2"
            @update="grades.feeling = $event"
          />
          <CategoryRating
            category-name="Appréciation personnelle"
            :max-grade="4"
            @update="grades.personal = $event"
          />
          <div>
            <label for="">Date de visionnage</label><br />
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
            <label for="">Commentaire</label><br />
            <Textarea class="w-full" rows="5" v-model="comment" autoResize />
          </div>
        </div>

        <Button type="submit" class="w-full my-2" label="Ajouter la review"></Button>
      </form>
    </div>
  </Layout>
</template>
