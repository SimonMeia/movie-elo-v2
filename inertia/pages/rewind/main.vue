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

defineProps<{ rewind: Rewind }>()

const isTimerRunning = ref(false)
let timerInterval = ref<number | undefined>(undefined)
let timer = ref(0)
const graphDuration = ref(6000)
const graphAdvancement = computed(() => (timer.value * 100) / graphDuration.value)
const step = ref(1)
const isRewindVisible = ref(true)

function move(direction: 'forward' | 'back') {
  if (direction === 'forward') {
    if (step.value >= 8) {
      stopTimer()
      // router.push({ name: 'home' })
    } else {
      step.value++
    }
  } else {
    if (step.value === 1) {
      stopTimer()
      // router.push({ name: 'home' })
    } else {
      step.value--
    }
  }
  timer.value = 0
}

function startTimer() {
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

// onMounted(() => startTimer())
</script>

<template>
  <Layout>
    <div class="container">
      <h1 class="my-8">Rewind pour l'année {{ rewind.year }}</h1>
      <div class="flex gap-2">
        <Button @click="move('back')" icon="pi pi-arrow-left" />
        <Button @click="startTimer" icon="pi pi-play" v-if="!isTimerRunning" />
        <Button @click="stopTimer" icon="pi pi-pause" v-if="isTimerRunning" />
        <Button @click="move('forward')" icon="pi pi-arrow-right" />
      </div>

      <Dialog
        position="top"
        v-model:visible="isRewindVisible"
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
                    index + 1 < step ? '100%' : index + 1 === step ? `${graphAdvancement}%` : '0%',
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
              @click="closeCallback"
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
          <div class="p-4 h-full">
            <YearlyMovies v-if="step === 1" :data="rewind.yearlyMovies" />
            <TimeSpent v-else-if="step === 2" :data="rewind.timeSpent" />
            <AverageRuntime v-else-if="step === 3" :data="rewind.averageRuntime" />
            <LongestShortestMovies v-else-if="step === 4" :data="rewind.longestShortestMovies" />
            <!--            <ViewingByMonth v-else-if="step === 5" :data="rewind.viewingsByMonth" />-->
            <PreferredGenres v-else-if="step === 5" :data="rewind.preferredGenres" />
            <!--            <PreferredActors v-else-if="step === 7" :data="rewind.preferredActors" />-->
            <PreferredLocations v-else-if="step === 6" :data="rewind.preferredLocations" />
            <PreferredPartners v-else-if="step === 7" :data="rewind.preferredPartners" />
            <AverageGrades v-else-if="step === 8" :data="rewind.averageGrades" />
          </div>
        </template>
      </Dialog>
      <!--      <pre>{{ rewind }}</pre>-->
    </div>
  </Layout>
</template>

<style scoped></style>
