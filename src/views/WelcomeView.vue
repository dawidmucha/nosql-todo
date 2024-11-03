<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { logIn, isUserLoggedIn } from '../helpers/supabase'
import router from '../router.ts'

const email = ref<string>("")
const password = ref<string>("")
const loginValidationErrorMsg = ref<any>("")
const isLoggedIn = ref<boolean>(true) // default true for hiding login form

const onLogin = async () => {
  const { data, error } = await logIn(email.value, password.value)

  if(error) {
    email.value = ""
    password.value = ""
    loginValidationErrorMsg.value = error
  } else {
    router.push('/dashboard')
  }
}

onMounted(async () => {
  const u = await isUserLoggedIn()
  if(u) router.push('/dashboard')
  else isLoggedIn.value = false
})
</script>

<template>
  <div>Welcome.vue route</div>

  <div v-if="!isLoggedIn">
    <form @submit.prevent="onLogin">
      <label for="email">email:</label>
      <input type="text" id="email" name="email" v-model="email"></input>
  
      <label for="password">password:</label>
      <input type="password" id="password" name="password" v-model="password"></input>
      
      <input type="submit" value="Login" ></input>
    </form>
    <div>{{ loginValidationErrorMsg }}</div>
  </div>
</template>