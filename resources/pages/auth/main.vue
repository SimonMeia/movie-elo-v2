<script setup lang="ts">
import { router } from '@inertiajs/vue3'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { computed } from 'vue'
import { ref } from 'vue'

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

const coverHeight = computed(() => (isLoginFormDisplayed.value ? 'h-1/3' : 'h-1/6'))
const formHeight = computed(() => (isLoginFormDisplayed.value ? 'h-2/3' : 'h-5/6'))

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
  })
}
</script>

<template>
  <div class="flex flex-col h-screen lg:flex-row">
    <div :class="coverHeight" class="w-full overflow-hidden lg:w-1/2 lg:h-full">
      <img
        src="@/assets/images/the-trueman-show-poster.png"
        alt="hero"
        class="object-cover w-full h-full"
      />
    </div>
    <div :class="formHeight" class="flex flex-col w-full px-4 lg:w-1/2 lg:h-full sm:px-6 md:px-8">
      <form @submit.prevent="submit" class="flex flex-col w-full h-full my-3 md:my0">
        <h1 class="flex flex-col justify-end pt-1 mb-0 text-2xl font-bold md:text-4xl grow">
          Welcome back
        </h1>
        <div class="flex flex-col justify-center gap-3 grow md:gap-4">
          <div v-if="!isLoginFormDisplayed">
            <label for="">Prénom</label><br />
            <InputText v-model="firstName" class="w-full" />
          </div>
          <div v-if="!isLoginFormDisplayed">
            <label for="">Nom</label><br />
            <InputText v-model="lastName" class="w-full" />
          </div>
          <div v-if="!isLoginFormDisplayed">
            <label for="">Nom d'utilisateur</label><br />
            <InputText v-model="username" class="w-full" />
          </div>
          <div>
            <label for="">Email</label><br />
            <InputText v-model="email" class="w-full" />
          </div>
          <div>
            <label for="">Password</label><br />
            <InputText type="password" v-model="password" class="w-full" />
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
