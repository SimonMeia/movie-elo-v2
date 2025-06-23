<script setup lang="ts">
import AdminLayout from '@/layouts/admin.vue'
import type { User } from '@/app/types'

defineProps<{ users: User[] }>()
</script>

<template>
  <AdminLayout>
    <div class="container">Admin</div>
  </AdminLayout>
</template>
