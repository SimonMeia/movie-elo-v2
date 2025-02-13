<script setup lang="ts">
import { router } from '@inertiajs/vue3'
import InputText from 'primevue/inputtext'
import { nextTick, ref, watch } from 'vue'
import Button from 'primevue/button'
import { Notification } from '@/app/types'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const props = defineProps<{
  notification: { notification: Notification }
}>()

const toast = useToast()

watch(
  () => props.notification,
  async () => {
    if (props.notification.notification) {
      await nextTick()
      toast.add({
        severity: props.notification.notification.type,
        summary: getSummary(props.notification.notification.type ?? '') ?? '',
        detail: props.notification.notification.message,
        life: 3000,
      })
    }
  }
)

const email = ref('')

function submit() {
  router.post(
    `/app/forgot-password`,
    {
      email: email.value,
    },
    {
      preserveState: true,
      preserveScroll: true,
    }
  )
}

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
  <Toast />
  <div class="flex flex-col lg:flex-row">
    <div class="w-full h-56 overflow-hidden ease-in-out lg:w-1/2 lg:h-screen">
      <img
        src="@/assets/images/the-trueman-show-poster.png"
        alt="hero"
        class="object-cover w-full h-full"
      />
    </div>
    <div class="flex flex-col w-full px-4 lg:w-1/2 lg:h-screen sm:px-6 md:px-8">
      <form
        @submit.prevent="submit"
        class="flex flex-col justify-center w-full h-full gap-4 my-3 md:my-0"
      >
        <h1 class="my-4 text-2xl font-bold md:text-4xl">Mot de passe oublié</h1>
        <p>
          Vous avez oublié votre mot de passe ? Pas de panique, entrez votre adresse email et nous
          vous enverrons un lien de reinitialisation de mot de passe.
        </p>
        <div>
          <label for="">Email</label><br />
          <InputText v-model="email" class="w-full" type="email" />
        </div>
        <Button type="submit" class="w-full md:w-fit" label="Envoyer le lien de reinitialisation" />
      </form>
    </div>
  </div>
</template>

<style scoped></style>
