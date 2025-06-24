<script setup lang="ts">
import type { AdminUserProfile } from '@/app/types'
import AdminLayout from '@/layouts/admin.vue'
import { Column, DataTable } from 'primevue'

defineProps<{ users: AdminUserProfile[] }>()
</script>

<template>
  <AdminLayout>
    <div class="container">
      <h2 class="my-4 text-3xl font-bold">Utilisateurs</h2>

      <DataTable :value="users">
        <Column field="username" header="Username"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="createdAt" header="Created at">
          <template #body="{ data }">
            {{ new Date(data.createdAt).toLocaleDateString('fr-FR') }}
          </template>
        </Column>

        <Column field="hasValidatedGradeTypes" header="Grades types validated">
          <template #body="{ data }">
            <Badge
              :severity="data.hasValidatedGradeTypes ? 'success' : 'danger'"
              class="!aspect-square"
            >
              <i
                class="!text-xs pi"
                :class="data.hasValidatedGradeTypes ? 'pi-check' : 'pi-times'"
              ></i>
            </Badge>
          </template>
        </Column>
        <Column field="totalReviews" header="Total reviews"></Column>
        <Column field="totalLocations" header="Total locations"></Column>
        <Column field="totalGradeTypes" header="Total grade types"></Column>
        <Column field="totalPartners" header="Total partners"></Column>
      </DataTable>
    </div>
  </AdminLayout>
</template>
