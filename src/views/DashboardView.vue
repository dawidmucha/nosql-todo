<script setup lang="ts">
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import router from '../router.ts'
import { isUserLoggedIn, getCurrentTasks, createTask, removeTask } from '../helpers/supabase'

dayjs.extend(relativeTime)

const currentTasks = ref<any[] | null | undefined>([])
const currentTaskName = ref<string>("")
const date = ref(null)

const onCreateTask = async () => {
  await createTask(currentTaskName.value, date.value)
  currentTasks.value = await getCurrentTasks()
  currentTaskName.value = ""
}

const onRemoveTask = async (id: number) => {
  console.log('removing', id)
  await removeTask(id)
  currentTasks.value = await getCurrentTasks()
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
  <div>Dashboard.vue route {{ date }}</div>
  <div v-if="currentTasks">
    <div v-for="{ name, id, due_date=null } in currentTasks">
      <div>
        <div>{{ name }} ({{ id }}) <button :key="id" @click="onRemoveTask(id)">X</button></div>
        <div v-if="due_date">Due date: {{ due_date }} {{ dayjs().to(dayjs(due_date)) }}</div>
      </div>
    </div>
  </div>
  <div>
    <form @submit.prevent="onCreateTask">
      <input type="text" id="currentTaskName" name="currentTaskName" v-model="currentTaskName" />
      <VueDatePicker v-model="date" model-type="iso" />
      <input type="submit" value="+" />
    </form>
  </div>
</template>