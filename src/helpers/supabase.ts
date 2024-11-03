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

const isUserLoggedIn = async () => {
  const user = await getCurrentUser()
  return !!user
}

const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email, password
  })

  console.log('from signUp()', data, error)
  return { data, error }
}

const getCurrentTasks = async () => {
  let { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', currentUser.value?.id)
  
  if(!error) return tasks?.[0].tasks.tasks
}

export { getCurrentUser, isUserLoggedIn, getCurrentTasks, signUp }