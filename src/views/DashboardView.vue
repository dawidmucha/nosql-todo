<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'

import { supabase } from '../database'

const user: Ref<Object | undefined> = ref("")

const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser()
  if(!error) user.value = data.user
}

const fetchTasks = async () => {
  let { data: tasks, error } = await supabase
  .from('tasks')
  .select('*')
  
  if(!error) console.log('fetched tasks:', tasks)
}

onMounted(async () => {
  await getCurrentUser()
  await fetchTasks()
})
</script>

<template>
  <div>Dashboard.vue route</div>
</template>