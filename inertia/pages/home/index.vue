<script setup lang="ts">
import type { ReviewCard } from '@/app/types'
import SearchTmdbMovieBar from '@/components/search_tmdb_movie_bar.vue'
import WelcomeModal from '@/components/welcome-modal.vue'
import Layout from '@/layouts/default.vue'
import { router } from '@inertiajs/vue3'
import Button from 'primevue/button'
import { onMounted, ref } from 'vue'
import LastReviews from './components/last_reviews.vue'

defineProps<{ lastReviews: ReviewCard[] }>()

const tmdbMovieId = ref(0)
const tmdbMovieTitle = ref('')
const welcomeModalVisible = ref(false)

onMounted(() => {
  if (localStorage.getItem('welcomeModalSeen') === 'true') {
    welcomeModalVisible.value = false
  }
})

function handleWelcomeModalClose() {
  welcomeModalVisible.value = false
  localStorage.setItem('welcomeModalSeen', 'true')
  router.get('/app/grade-types')
}
</script>

<template>
  <Layout>
    <div class="container">
      <div class="my-12">
        <h2 class="mb-4 text-3xl font-bold">Ajouter une reviews</h2>
        <div class="flex flex-col gap-2 sm:flex-row">
          <SearchTmdbMovieBar
            @update="
              (event) => {
                tmdbMovieId = event.tmdbMovieId
                tmdbMovieTitle = event.title
              }
            "
          />
          <Button
            label="Ajouter une review"
            class="min-w-fit"
            @click="
              router.get('/app/reviews/create', {
                homeTmdbMovieId: tmdbMovieId,
                homeTmdbMovieTitle: tmdbMovieTitle,
              })
            "
          ></Button>
        </div>
      </div>
      <LastReviews :last-reviews="lastReviews" />
    </div>

    <WelcomeModal :visible="welcomeModalVisible" @close="handleWelcomeModalClose" />
  </Layout>
</template>
