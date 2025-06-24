<script setup lang="ts">
import { FormGradeType, ReviewResponse } from '@/app/types'
import ReviewHeader from './components/review_header.vue'
import ReviewGrades from './components/review_grades.vue'
import ReviewViewings from './components/review_viewings.vue'
import Layout from '@/layouts/default.vue'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
import Button from 'primevue/button'
import { router } from '@inertiajs/vue3'

const props = defineProps<{
  review: ReviewResponse
  dbLocations: string[]
  dbPartners: string[]
  dbGradeTypes: FormGradeType[]
  errors?: {
    tmdbMovieId?: string[]
    locations?: string[]
    partners?: string[]
  }
}>()

const confirm = useConfirm()

const confirmDelete = () => {
  confirm.require({
    message: 'Êtes-vous sûr de vouloir supprimer la review ?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Annuler',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Supprimer',
      severity: 'danger',
    },
    accept: () => {
      router.visit('/app/reviews/' + props.review.review.id, {
        method: 'delete',
        preserveState: true,
        preserveScroll: true,
      })
    },
    reject: () => {},
  })
}
</script>

<template>
  <Layout>
    <ReviewHeader
      :backdrop-path="review.movie.backdropPath"
      :title="review.movie.title"
      :synopsis="review.movie.synopsis"
    />
    <div class="container">
      <ReviewGrades :review="review.review" :form-grade-types="dbGradeTypes"></ReviewGrades>
      <ReviewViewings
        :review-id="review.review.id"
        :viewings="review.review.viewings"
        :db-locations="dbLocations"
        :db-partners="dbPartners"
        :errors="errors"
      ></ReviewViewings>

      <Button
        @click="confirmDelete"
        label="Supprimer la review"
        outlined
        severity="danger"
        class="w-full mt-8 sm:w-fit"
      ></Button>
      <ConfirmDialog />
    </div>
  </Layout>
</template>

<style scoped></style>
