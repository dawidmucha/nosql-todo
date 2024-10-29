<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { supabase } from '../database'

interface User {
  id?: string
}

let currentUser = ref<User | null>({})
let currentTasks = ref<Object | null>([])

const getCurrentUser = async () => {
  const {data: {user}} = await supabase.auth.getUser()
  return user
}

const getCurrentTasks = async () => {
  let { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', currentUser.value?.id)
  
  if(!error) return tasks?.[0].tasks.tasks
}

onMounted(async () => {
  currentUser.value = await getCurrentUser()
  currentTasks.value = await getCurrentTasks()
  // console.log(currentTasks.value)
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