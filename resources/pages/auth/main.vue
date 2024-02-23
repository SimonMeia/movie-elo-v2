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
  <div>
    <h1>Auth</h1>
    <form @submit.prevent="submit" class="flex flex-column gap-2 w-6">
      <div v-if="!isLoginFormDisplayed">
        <label for="">Prénom</label><br />
        <InputText v-model="firstName" class="w-6" />
      </div>
      <div v-if="!isLoginFormDisplayed">
        <label for="">Nom</label><br />
        <InputText v-model="lastName" class="w-6" />
      </div>
      <div v-if="!isLoginFormDisplayed">
        <label for="">Nom d'utilisateur</label><br />
        <InputText v-model="username" class="w-6" />
      </div>
      <div>
        <label for="">Email</label><br />
        <InputText v-model="email" class="w-6" />
      </div>
      <div>
        <label for="">Password</label><br />
        <InputText type="password" v-model="password" class="w-6" />
      </div>
      <div>
        <div class="flex flex-row gap-2 align-items-center">
          <span>{{ changeFormLabel }}</span>
          <Button
            link
            :label="changeFormButtonLabel"
            @click="isLoginFormDisplayed = !isLoginFormDisplayed"
          ></Button>
          <Button type="submit" :label="sumbitButtonLabel"></Button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
