<script setup lang="ts">
import { Notification } from '@/app/types'
import { router } from '@inertiajs/vue3'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import Divider from 'primevue/divider'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { computed, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  notification: { notification: Notification }
  errors?: {
    email?: string
    password?: string
    username?: string
    firstName?: string
    lastName?: string
  }
}>()

const toast = useToast()

const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const username = ref('')
const rememberMe = ref(true)

const isLoginFormDisplayed = ref(true)
const sumbitButtonLabel = computed(() =>
  isLoginFormDisplayed.value ? 'Se connecter' : "S'inscrire"
)
const changeFormLabel = computed(() =>
  isLoginFormDisplayed.value ? 'Pas encore de compte ? ' : 'Déjà un compte ? '
)
const changeFormButtonLabel = computed(() =>
  isLoginFormDisplayed.value ? "S'inscrire" : 'Se connecter'
)

watch(isLoginFormDisplayed, () => {
  resetErrors()
})

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

function submit() {
  const destination = isLoginFormDisplayed.value ? 'login' : 'register'
  const userData = {
    username: username.value,
    email: email.value,
    password: password.value,
    passwordConfirmation: passwordConfirmation.value,
    rememberMe: isLoginFormDisplayed ? rememberMe.value : false,
  }

  router.visit(`/auth/${destination}`, {
    method: 'post',
    data: userData,
    preserveState: true,
    preserveScroll: true,
  })
}

function resetErrors() {
  if (props.errors) {
    props.errors.email = undefined
    props.errors.password = undefined
    props.errors.username = undefined
  }
}

onMounted(() => {
  if (props.notification.notification) {
    toast.add({
      severity: props.notification.notification.type,
      summary: getSummary(props.notification.notification.type ?? '') ?? '',
      detail: props.notification.notification.message,
      life: 3000,
    })
  }
})
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
      <form @submit.prevent="submit" class="flex flex-col w-full h-full gap-4 my-3 md:my-0">
        <h1 class="flex flex-col justify-end my-4 text-2xl font-bold lg:mb-0 md:text-4xl grow">
          Welcome back
        </h1>
        <div class="flex flex-col justify-center gap-3 grow md:gap-4">
          <div v-if="!isLoginFormDisplayed">
            <label for="">Nom d'utilisateur</label><br />
            <InputText v-model="username" class="w-full" />
            <small v-if="props.errors?.username" class="text-red-500">
              {{ props.errors.username }}
            </small>
          </div>
          <div>
            <label for="">Email</label><br />
            <InputText v-model="email" class="w-full" type="email" />
            <small v-if="props.errors?.email" class="text-red-500">
              {{ props.errors.email }}
            </small>
          </div>
          <div>
            <label for="">Mot de passe</label><br />
            <InputText
              type="password"
              v-model="password"
              class="w-full"
              v-if="isLoginFormDisplayed"
            />
            <Password
              v-model="password"
              v-if="!isLoginFormDisplayed"
              class="w-full"
              :feedback="true"
              promptLabel="Entrez un mot de passe"
              weakLabel="Trop simple"
              mediumLabel="Complexité moyenne"
              strongLabel="Mot de passe complèxe"
            >
              <template #footer>
                <Divider />
                <ul class="pl-2 my-0 ml-2 leading-normal">
                  <li>Min. 1 minuscule</li>
                  <li>Min. 1 majuscule</li>
                  <li>Min. 1 chiffre</li>
                  <li>Min. 8 caractères</li>
                </ul>
              </template>
            </Password>
            <small v-if="props.errors?.password" class="text-red-500">
              {{ props.errors.password }}
            </small>
            <a
              v-if="isLoginFormDisplayed"
              href="/forgot-password"
              class="block mt-2 font-bold text-gray-500 hover:underline"
            >
              Mot de passe oublie?
            </a>
          </div>
          <div v-if="!isLoginFormDisplayed">
            <label for="">Confirmer le mot de passe</label><br />
            <InputText type="password" v-model="passwordConfirmation" class="w-full" />
          </div>
          <div v-if="isLoginFormDisplayed" class="flex items-center gap-2">
            <Checkbox
              type="checkbox"
              inputId="remember-me"
              v-model="rememberMe"
              binary
              size="small"
            />
            <label for="remember-me">Se souvenir de moi</label>
          </div>
        </div>
        <div class="flex flex-col items-center grow">
          <Button type="submit" class="w-full" :label="sumbitButtonLabel" />
          <div class="flex flex-row items-center gap-2 mt-2">
            <span>{{ changeFormLabel }}</span>
            <Button
              link
              :label="changeFormButtonLabel"
              @click="isLoginFormDisplayed = !isLoginFormDisplayed"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
