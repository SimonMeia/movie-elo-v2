<script setup lang="ts">
import { router } from '@inertiajs/vue3'
import InputText from 'primevue/inputtext'
import { nextTick, ref, watch } from 'vue'
import Button from 'primevue/button'
import { Notification } from '@/app/types'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import Password from 'primevue/password'
import Divider from 'primevue/divider'

const props = defineProps<{
  notification: { notification: Notification }
  token: string | null
  errors?: { password?: string }
}>()

const toast = useToast()

const password = ref('')
const passwordConfirmation = ref('')

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

function submit() {
  console.log(password.value)
  router.post(
    `/reset-password`,
    {
      token: props.token,
      password: password.value,
      passwordConfirmation: passwordConfirmation.value,
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
        class="flex flex-col w-full h-full gap-4 my-3 md:my-0 justify-center"
      >
        <h1 class="my-4 text-2xl font-bold md:text-4xl">Réinitialistion du mot de passe</h1>
        <p>Entrez votre nouveau mot de passe.</p>
        <div>
          <label for="">Mot de passe</label><br />
          <Password
            v-model="password"
            class="w-full"
            :feedback="true"
            promptLabel="Entrez un mot de passe"
            weakLabel="Trop simple"
            mediumLabel="Complexité moyenne"
            strongLabel="Mot de passe complèxe"
          >
            <template #footer>
              <Divider />
              <ul class="pl-2 ml-2 my-0 leading-normal">
                <li>Min. 1 minuscule</li>
                <li>Min. 1 majuscule</li>
                <li>Min. 1 chiffre</li>
                <li>Min. 8 caractères</li>
              </ul>
            </template>
          </Password>
          <small v-if="props.errors?.password" class="text-red-500">
            {{ props.errors.password[0] }}
          </small>
        </div>
        <div>
          <label for="">Confirmer le mot de passe</label><br />
          <InputText type="password" v-model="passwordConfirmation" class="w-full" />
        </div>
        <Button type="submit" class="w-full md:w-fit" label="Réinitialiser" />
      </form>
    </div>
  </div>
</template>

<style scoped></style>
