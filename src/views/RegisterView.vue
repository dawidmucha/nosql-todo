<script setup lang="ts">
import { onMounted } from 'vue'

import router from '../router.ts'
import { isUserLoggedIn } from '../helpers/supabase'

onMounted(async () => {
  const u = await isUserLoggedIn()
  if(!u) router.push('/')
})
</script>

<template>
  <div>Regiter.vue route</div>
  <div>{{ !!isUserLoggedIn() }}</div>
</template>