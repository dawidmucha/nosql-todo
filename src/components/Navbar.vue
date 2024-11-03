<script setup lang="ts">
import { ref } from 'vue'

import { supabase } from '../database'
import { getCurrentUser } from '../helpers/supabase'

const email = ref<string | undefined>("")

supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session)

  if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') {
    email.value = session?.user.email
  } else if (event === 'SIGNED_OUT') {
    email.value = ""
  } else if (event === 'PASSWORD_RECOVERY') {
    // handle password recovery event
  } else if (event === 'TOKEN_REFRESHED') {
    // handle token refreshed event
  } else if (event === 'USER_UPDATED') {
    // handle user updated event
  }
})
</script>

<template>
  this is navbar {{ email }}
  <nav>
    <RouterLink to="/"><button>Go to /</button></RouterLink>
    <RouterLink to="/dashboard"><button>Go to /dashboard</button></RouterLink>
    <RouterLink to="/register"><button>Go to /register</button></RouterLink>
  </nav>
</template>