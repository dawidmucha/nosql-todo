<script setup lang="ts">
import { ref, onMounted } from 'vue'

import router from '../router.ts'
import { isUserLoggedIn, signUp } from '../helpers/supabase'

const isLoggedIn = ref<boolean>(true) // default true for hiding register form
const registerValidationErrorMsg = ref<string>("")
const email = ref<string>("")
const password1 = ref<string>("")
const password2 = ref<string>("")

const onRegister = async () => {
  console.log("onRegister:", email, password1, password2)

  if(password1.value !== password2.value) {
    registerValidationErrorMsg.value = "Passwords to not match"
    password1.value = ""
    password2.value = ""
    
    return 
  }

  let { data, error }:any = await signUp(email.value, password1.value)

  if(error) {
    registerValidationErrorMsg.value = error
    password1.value = ""
    password2.value = ""
  } else {
    registerValidationErrorMsg.value = ""
  }
}

onMounted(async () => {
  const u = await isUserLoggedIn()
  if(u) router.push('/')
  else isLoggedIn.value = false
})
</script>

<template>
  <div>Regiter.vue route</div>

  <div v-if="!isLoggedIn">
    <form @submit.prevent="() => onRegister()">
      <label for="email">Email:</label>
      <input type="text" id="email" name="email" v-model="email"></input> <br />
  
      <label for="password1">Password:</label>
      <input type="password" id="password1" name="password1" v-model="password1"></input> <br />
  
      <label for="password2">Confirm password:</label>
      <input type="password" id="password2" name="password2" v-model="password2"></input> <br />
  
      <input type="submit" value="Create account"></input>
      <div>{{ registerValidationErrorMsg }}</div>
    </form>
  </div>
</template>