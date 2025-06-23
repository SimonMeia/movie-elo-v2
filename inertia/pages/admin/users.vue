<script setup lang="ts">
import AdminLayout from '@/layouts/admin.vue'
import type { AdminUserProfile, User } from '@/app/types'
import { Column, DataTable } from 'primevue'

defineProps<{ users: AdminUserProfile[] }>()
</script>

<template>
  <AdminLayout>
    <div class="container">
      <DataTable :value="users">
        <Column field="username" header="Code"></Column>
        <Column field="email" header="Name"></Column>
        <Column field="createdAt" header="Created at"></Column>
        <Column field="updatedAt" header="Updated at"></Column>
        <Column field="hasValidatedGradeTypes" header="Grades types validated"></Column>
        <Column field="totalReviews" header="Total reviews"></Column>
        <Column field="totalLocations" header="Total locations"></Column>
        <Column field="totalGradeTypes" header="Total grade types"></Column>
        <Column field="totalPartners" header="Total partners"></Column>
      </DataTable>
    </div>
  </AdminLayout>
</template>
