<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'

import { supabase } from '../database'

const user: Ref<string | undefined> = ref("")

const createUser = async () => {
  try {
    let { data, error } = await supabase.auth.signUp({
      email: 'john@doe.com',
      password: 'hunter1'
    })

    if(data) console.log('data', data)
    else if(error) console.log('error', error)
  } catch (error) {
    console.log(error)
  }
}

const logInAsTest = async () => {
  try {
    await supabase.auth.signInWithPassword({
      email: 'test@test.com',
      password: 'hunter1'
    })
  } catch(error) {
    console.error(error)
  } finally {
    console.log('logged in!')
    getCurrentUser()
  }
}

const getTestData = async () => {
  const { data } = await supabase.from('testtable').select()
  console.log(data)
}

const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser()
  if(!error) user.value = data.user.email
  
  console.log('current user gotten!', data, error)
}

const signout = async () => {
  await supabase.auth.signOut()
  user.value = ""
}



onMounted(() => {
  getCurrentUser()
})
</script>

<template>
  hello world <br />

  currently logged in as {{ user || "nobody" }} on a route {{ $route.fullPath }}<br />

  <button @click="createUser">Create user</button>
  <button @click="logInAsTest">login as test@test.com</button>
  <button @click="getTestData">get test data</button>
  <button @click="getCurrentUser">get current user</button>
  <button @click="signout">sign out</button>
</template>
