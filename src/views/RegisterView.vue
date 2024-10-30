<script setup lang="ts">
import { ref, onMounted } from 'vue'

import router from '../router.ts'
import { getCurrentUser } from '../helpers/supabase'

const isUserLoggedIn = ref<Promise<boolean> | boolean>(false)

const checkIfUserLoggedIn = async () => {
  const user = await getCurrentUser()
  console.log('current user:', !!user)
  return !!user
}

onMounted(async () => {
  isUserLoggedIn.value = await checkIfUserLoggedIn()

  if(isUserLoggedIn.value) router.push('/')
})
</script>

<template>
  <div>Regiter.vue route</div>
  <div>{{ !!isUserLoggedIn }}</div>
</template>