<script setup lang="ts">
import { Notification } from '@/app/types'
import Footer from '@/components/footer.vue'
import Header from '@/components/header.vue'
import { usePage } from '@inertiajs/vue3'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { nextTick, watch } from 'vue'

const toast = useToast()

// Surveiller les flash messages d'Inertia
watch(
  () => usePage().props.notification,
  async (notification: any) => {
    const notif = notification.notification as Notification | null
    if (notif) {
      await nextTick()
      toast.add({
        severity: notif.type,
        summary: getSummary(notif.type ?? ''),
        detail: notif.message,
        life: 3000,
      })
    }
  },
  {
    immediate: true,
  }
)

function getSummary(type: string) {
  if (type == 'success') {
    return 'Success'
  } else if (type == 'danger') {
    return 'Erreur'
  } else if (type == 'warning') {
    return 'Attention'
  }
  return 'Info'
}
</script>

<template>
  <div class="flex flex-col min-h-full mb-4">
    <Toast :pt="{ root: 'max-w-[90vw]' }" />

    <Header />

    <slot />

    <Footer />
  </div>
</template>

<style scoped></style>
