<script setup lang="ts">
import { router } from '@inertiajs/vue3'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { computed } from 'vue'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
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
  })
}
</script>

<template>
  <div class="flex flex-column lg:flex-row h-screen">
    <div class="w-full lg:w-6 lg:h-full" style="height: 30%;">
      <img
        src="https://fr.web.img3.acsta.net/pictures/22/05/16/16/32/4176595.jpg"
        alt="hero"
        class="h-full w-full"
        style="object-fit: cover"
      />
    </div>
    <div class="w-full lg:w-6 lg:h-full flex flex-column justify-content-center px-8" style="height: 70%;">
      <h1>Welcome back</h1>
      <form @submit.prevent="submit" class="flex flex-column gap-4 w-full">
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
        <div>
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
