<script setup lang="ts">
import type { ProfileStatistics, User } from '@/app/types'
import Layout from '@/layouts/default.vue'
import { router, usePage } from '@inertiajs/vue3'
import { Duration } from 'luxon'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { computed } from 'vue'

defineProps<{ statistics: ProfileStatistics }>()

const page = usePage()
const user = computed(() => page.props.user as User)
</script>

<template>
  <Layout>
    <div class="container">
      <h1 class="my-8">Mon profil</h1>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <template #title>Mes infos</template>
          <template #content>
            <div class="grid grid-cols-3 gap-2">
              <span>Username</span>
              <span class="col-span-2">{{ user.username }}</span>
              <span>Email</span>
              <span class="col-span-2">{{ user.email }}</span>
            </div>
          </template>
        </Card>
        <Card>
          <template #title>Statistiques</template>
          <template #content>
            <div class="grid grid-cols-2 gap-2 md:grid-cols-3">
              <span class="md:col-span-2">Member depuis</span>
              <span>{{ new Date(user.createdAt).toLocaleDateString() }}</span>
              <span class="md:col-span-2">Nombre de films vus</span>
              <span>{{ statistics.movieCount }}</span>
              <span class="md:col-span-2">Temps passé sur les films</span>
              <span>
                {{ Duration.fromObject({ minute: statistics.timeSpentMin }).toFormat("h'h'") }}
              </span>
            </div>
          </template>
        </Card>
      </div>
      <div class="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
        <Button label="Deconnexion" @click="router.get('/auth/logout')"></Button>
      </div>
    </div>
  </Layout>
</template>

<style scoped></style>
