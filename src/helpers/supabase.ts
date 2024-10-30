import { ref } from 'vue'

import { supabase } from '../database'

interface User {
  id?: string
}

let currentUser = ref<User | null>({})
// let currentTasks = ref<Object | null>([])

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

export { getCurrentUser, getCurrentTasks }