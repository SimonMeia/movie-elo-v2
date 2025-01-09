<script setup lang="ts">
import Layout from '@/layouts/default.vue'
import { Rewind } from '@/app/types'
import { computed, ref } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import YearlyMovies from '@/pages/rewind/components/yearly_movies.vue'
import TimeSpent from '@/pages/rewind/components/time_spent.vue'
import AverageRuntime from '@/pages/rewind/components/average_runtime.vue'
import LongestShortestMovies from '@/pages/rewind/components/longest_shortest_movies.vue'
import PreferredLocations from '@/pages/rewind/components/preferred_locations.vue'
import PreferredPartners from '@/pages/rewind/components/preferred_partners.vue'
import PreferredGenres from '@/pages/rewind/components/preferred_genres.vue'
import AverageGrades from '@/pages/rewind/components/average_grades.vue'

defineProps<{ rewinds: Rewind[] }>()

const isTimerRunning = ref(false)
let timerInterval = ref<number | undefined>(undefined)
let timer = ref(0)
const graphDuration = ref(6000)
const graphAdvancement = computed(() => (timer.value * 100) / graphDuration.value)
const step = ref(1)
const visibleDialog = ref<number | null>(null) // Gestion du dialogue visible

// Fonction pour réinitialiser le rewind et démarrer le timer
function openRewind(year: number) {
  visibleDialog.value = year // Ouvrir le dialogue pour l'année spécifiée
  step.value = 1 // Réinitialiser l'étape
  startTimer() // Lancer le timer
}

function move(direction: 'forward' | 'back') {
  if (direction === 'forward') {
    if (step.value >= 8) {
      stopTimer()
      visibleDialog.value = null
    } else {
      step.value++
    }
  } else {
    if (step.value === 1) {
      stopTimer()
      visibleDialog.value = null
    } else {
      step.value--
    }
  }
  timer.value = 0
}

function startTimer() {
  if (isTimerRunning.value) return // Empêche de démarrer plusieurs fois
  timer.value = 0 // Réinitialise le timer
  timerInterval.value = setInterval(() => {
    if (timer.value >= graphDuration.value) {
      step.value++
      timer.value = 0
    } else {
      timer.value += 10
    }
  }, 10)
  isTimerRunning.value = true
}

function stopTimer() {
  if (!isTimerRunning.value) return
  clearInterval(timerInterval.value)
  isTimerRunning.value = false
}
</script>

<template>
  <Layout>
    <div class="container">
      <h1 class="my-8">Movie Elo rewinds</h1>
      <div v-for="rewind in rewinds" :key="rewind.year">
        <div class="flex items-center gap-2 mb-8">
          <span class="text-xl font-bold w-36">Rewind {{ rewind.year }}</span>
          <Button
            icon="pi pi-play"
            size="small"
            class="aspect-square"
            severity="secondary"
            @click="openRewind(rewind.year)"
          />
        </div>
        <Dialog
          position="top"
          :visible="visibleDialog === rewind.year"
          @update:visible="
            (val) => {
              if (!val) visibleDialog = null
              stopTimer()
            }
          "
          modal
          :pt="{ root: 'w-[95%] !max-w-lg aspect-[9/16]', header: '!pb-2' }"
        >
          <template #container="{ closeCallback }">
            <div class="absolute top-4 flex gap-2 w-full px-4">
              <div
                v-for="(_value, index) in Object.keys(rewind).length - 3"
                :key="index"
                class="bg-gray-200 h-1 grow rounded overflow-hidden"
              >
                <div
                  class="h-full bg-accent transition-all"
                  :style="{
                    width:
                      index + 1 < step
                        ? '100%'
                        : index + 1 === step
                          ? `${graphAdvancement}%`
                          : '0%',
                  }"
                ></div>
              </div>
            </div>
            <div class="absolute left-1/2 transform -translate-x-1/2 -bottom-8 flex gap-2">
              <Button
                @click="move('back')"
                icon="pi pi-arrow-left"
                severity="secondary"
                size="small"
                class="aspect-square"
              />

              <Button
                @click="stopTimer"
                severity="secondary"
                icon="pi pi-pause"
                v-if="isTimerRunning"
                size="small"
                class="aspect-square"
              />
              <Button
                @click="startTimer"
                severity="secondary"
                icon="pi pi-play"
                v-if="!isTimerRunning"
                size="small"
                class="aspect-square"
              />
              <Button
                @click="
                  () => {
                    closeCallback()
                    visibleDialog = null
                    stopTimer()
                  }
                "
                severity="secondary"
                icon="pi pi-times"
                size="small"
                class="aspect-square"
              />
              <Button
                @click="move('forward')"
                icon="pi pi-arrow-right"
                severity="secondary"
                size="small"
                class="aspect-square"
              />
            </div>
            <div class="p-8 h-full">
              <YearlyMovies v-if="step === 1" :data="rewind.yearlyMovies" />
              <TimeSpent v-else-if="step === 2" :data="rewind.timeSpent" />
              <AverageRuntime v-else-if="step === 3" :data="rewind.averageRuntime" />
              <LongestShortestMovies v-else-if="step === 4" :data="rewind.longestShortestMovies" />
              <PreferredGenres v-else-if="step === 5" :data="rewind.preferredGenres" />
              <PreferredLocations v-else-if="step === 6" :data="rewind.preferredLocations" />
              <PreferredPartners v-else-if="step === 7" :data="rewind.preferredPartners" />
              <AverageGrades v-else-if="step === 8" :data="rewind.averageGrades" />
            </div>
          </template>
        </Dialog>
      </div>
    </div>
  </Layout>
</template>

<style scoped></style>
