<script setup lang="ts">
import type { User } from '@/app/types'
import AdminLayout from '@/layouts/admin.vue'

defineProps<{ users: User[] }>()
</script>

<template>
  <AdminLayout>
    <div class="container">Admin</div>
  </AdminLayout>
</template>
