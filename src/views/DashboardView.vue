<script setup lang="ts">
import { ref, onMounted } from 'vue'

import router from '../router.ts'
import { isUserLoggedIn, getCurrentTasks, createTask } from '../helpers/supabase'

let currentTasks = ref<Object | null>([])

let currentTaskName = ref<string>("")

const onCreateTask = async () => {
  await createTask(currentTaskName.value)
  await getCurrentTasks()
}

onMounted(async () => {
  const u = await isUserLoggedIn()
  if(u) {
    console.log('getting tasks')
    currentTasks.value = await getCurrentTasks()
  } else {
    router.push('/')
  }
})
</script>

<template>
  <div>Dashboard.vue route</div>
  <div v-if="currentTasks">
    <div v-for="{ name, due_date=null } in currentTasks">
      <div>
        <div>{{ name }}</div>
        <div v-if="due_date">Due date: {{ due_date }}</div>
      </div>
    </div>
  </div>
  <div>
    <form @submit.prevent="onCreateTask">
      <input type="text" id="currentTaskName" name="currentTaskName" v-model="currentTaskName" />
      <input type="submit" value="+" />
    </form>
  </div>
</template>