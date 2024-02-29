<script setup lang="ts">
import SearchTmdbMovieBar from '@/components/search_tmdb_movie_bar.vue'
import Layout from '@/layouts/default.vue'
import LastReviews from './components/last_reviews.vue'
import { router } from '@inertiajs/vue3'
import Button from 'primevue/button'
import { ref } from 'vue'
import type { ReviewsResponse } from '@/types'

const props = defineProps<ReviewsResponse>()

const tmdbMovieId = ref(0)
const tmdbMovieTitle = ref('')
</script>

<template>
  <Layout>
    <div class="container">
      <div class="flex flex-col gap-2 sm:flex-row my-12">
        <SearchTmdbMovieBar
          @update="
            {
              ;(tmdbMovieId = $event.tmdbMovieId), (tmdbMovieTitle = $event.title)
            }
          "
        />
        <Button
          label="Ajouter une review"
          class="min-w-fit"
          @click="
            router.get('/review-form', {
              homeTmdbMovieId: tmdbMovieId,
              homeTmdbMovieTitle: tmdbMovieTitle,
            })
          "
        ></Button>
      </div>
      <LastReviews :reviews="props.reviews" />
    </div>
  </Layout>
</template>
