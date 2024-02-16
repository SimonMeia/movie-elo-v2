<script setup lang="ts">
import SearchTmdbMovieBar from '@/components/SearchTmdbMovieBar.vue'
import CategoryRating from './components/category_rating.vue'
import AutoComplete from 'primevue/autocomplete'
import Calendar from 'primevue/calendar'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import LocationPartnerSelection from './components/location_partner_selection.vue'

const props = defineProps<{
  csrfToken: string
}>()

const tmdbMovieId = ref(0)
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

  router.visit('/review', {
    method: 'post',
    data: review,
    headers: { 'X-CSRF-Token': props.csrfToken },
  })
}
</script>

<template>
  <div>
    <form @submit.prevent="submit">
      <h1>Rate a movie</h1>
      <SearchTmdbMovieBar @update="tmdbMovieId = $event" />
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
        <label for="">Date de visionnage</label><br /><br />
        <Calendar inline v-model="date" :max-date="new Date()" />
      </div>

      <LocationPartnerSelection place-or-partner="place" @update="locations = $event" />
      <LocationPartnerSelection place-or-partner="partner" @update="partners = $event" />
      <div>
        <label for="">Commentaire</label><br />
        <Textarea rows="5" cols="30" v-model="comment" />
      </div>
      <Button type="submit">Ajouter la note</Button>
    </form>
  </div>
</template>
