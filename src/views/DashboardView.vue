<script setup lang="ts">
import { ref, onMounted } from 'vue'

import router from '../router.ts'
import { isUserLoggedIn, getCurrentTasks } from '../helpers/supabase'

let currentTasks = ref<Object | null>([])

onMounted(async () => {
  const u = await isUserLoggedIn()
  if(u) {
    currentTasks.value = await getCurrentTasks()
  } else {
    router.push('/')
  }
})
</script>

<template>
  <div>Dashboard.vue route</div>
  <div v-if="currentTasks">
    <div v-for="{ name, dueDate} in currentTasks">
      <div>
        <div>{{ name }}</div>
        <div>Due date: {{ dueDate }}</div>
      </div>
    </div>
  </div>
</template>