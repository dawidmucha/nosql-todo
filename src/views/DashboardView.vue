<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'

import { supabase } from '../database'

const user: Ref<Object | undefined> = ref("")

const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser()
  if(!error) user.value = data.user
}

onMounted(() => {
  getCurrentUser()
})
</script>

<template>
  <div>Dashboard.vue route</div>
</template>