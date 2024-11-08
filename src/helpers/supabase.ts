import { ref } from 'vue'

import { supabase } from '../database'

interface User {
  id?: string
}
const getCurrentUser = async () => {
  const {data: {user}} = await supabase.auth.getUser()
  return user
}

const isUserLoggedIn = async () => {
  const user = await getCurrentUser()
  return !!user
}

const logIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password})
  return { data, error }
}

const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email, password
  })

  console.log('from signUp()', data, error)
  return { data, error }
}

const getCurrentTasks = async () => {
  let u:User|null = await getCurrentUser()

  let { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', u?.id)

  if(!error) return data
}

const createTask = async (name: string, due_date=null) => {
  let u:User|null = await getCurrentUser()

  const { data, error } = await supabase
    .from('tasks')
    .insert([
      { 
        user_id: u?.id,
        name,
        due_date,
      }
    ])

  if(error) console.error(error)
  else return data
}

const removeTask = async (id: number) => {
  const { error }= await supabase
    .from('tasks')
    .delete()
    .eq('id', id)

  if(error) console.error(error)
}

export { getCurrentUser, isUserLoggedIn, getCurrentTasks, signUp, logIn, createTask, removeTask }