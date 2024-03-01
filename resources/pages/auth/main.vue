<script setup lang="ts">
import { router } from '@inertiajs/vue3'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { watch } from 'vue'
import { computed } from 'vue'
import { ref } from 'vue'

const props = defineProps<{
  errors?: {
    email?: string
    password?: string
    username?: string
    firstName?: string
    lastName?: string
  }
}>()

const email = ref('simon@me.com')
const password = ref('1234')
const username = ref('')
const firstName = ref('')
const lastName = ref('')

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

function submit() {
  const destination = isLoginFormDisplayed.value ? 'login' : 'register'
  const userData = {
    email: email.value,
    password: password.value,
  }
  if (!isLoginFormDisplayed.value) {
    userData['username'] = username.value
    userData['firstName'] = firstName.value
    userData['lastName'] = lastName.value
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
    props.errors.firstName = undefined
    props.errors.lastName = undefined
  }
}
</script>

<template>
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
            <label for="">Prénom</label><br />
            <InputText v-model="firstName" class="w-full" />
            <small v-if="props.errors?.firstName" class="text-red-500">
              {{ props.errors.firstName[0] }}
            </small>
          </div>
          <div v-if="!isLoginFormDisplayed">
            <label for="">Nom</label><br />
            <InputText v-model="lastName" class="w-full" />
            <small v-if="props.errors?.lastName" class="text-red-500">
              {{ props.errors.lastName[0] }}
            </small>
          </div>
          <div v-if="!isLoginFormDisplayed">
            <label for="">Nom d'utilisateur</label><br />
            <InputText v-model="username" class="w-full" />
            <small v-if="props.errors?.username" class="text-red-500">
              {{ props.errors.username[0] }}
            </small>
          </div>
          <div>
            <label for="">Email</label><br />
            <InputText v-model="email" class="w-full" />
            <small v-if="props.errors?.email" class="text-red-500">
              {{ props.errors.email[0] }}
            </small>
          </div>
          <div>
            <label for="">Password</label><br />
            <InputText type="password" v-model="password" class="w-full" />
            <small v-if="props.errors?.password" class="text-red-500">
              {{ props.errors.password[0] }}
            </small>
          </div>
        </div>
        <div class="flex flex-col items-center grow">
          <Button type="submit" class="w-full" :label="sumbitButtonLabel"></Button>
          <div class="flex flex-row items-center gap-2 mt-2">
            <span>{{ changeFormLabel }}</span>
            <Button
              link
              :label="changeFormButtonLabel"
              @click="isLoginFormDisplayed = !isLoginFormDisplayed"
            ></Button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
