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

const coverHeight = computed(() => (isLoginFormDisplayed.value ? '30%' : '15%'))
const formHeight = computed(() => (isLoginFormDisplayed.value ? '70%' : '85%'))

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
  <div class="flex flex-column lg:flex-row h-screen">
    <div class="w-full lg:w-6 lg:h-full overflow-hidden" :style="{ height: coverHeight }">
      <img
        src="@/images/the-trueman-show-poster.png"
        alt="hero"
        class="w-full h-full"
        style="object-fit: cover"
      />
    </div>
    <div
      class="w-full lg:w-6 lg:h-full flex flex-column px-4 sm:px-6 md:px-8"
      :style="{ height: formHeight }"
    >
      <form @submit.prevent="submit" class="flex flex-column w-full flex-grow-1 my-3 md:my0">
        <h1
          class="text-2xl md:text-4xl font-bold pt-1 mb-0 flex-grow-1 flex flex-column justify-content-end"
        >
          Welcome back
        </h1>
        <div class="flex-grow-1 flex justify-content-center flex-column gap-3 md:gap-4">
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
        <div class="flex flex-column align-items-center flex-grow-1">
          <Button type="submit" class="w-full" :label="sumbitButtonLabel"></Button>
          <div class="flex flex-row gap-2 align-items-center mt-2">
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
