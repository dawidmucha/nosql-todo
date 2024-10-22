<script setup lang="ts">
import { RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar /> 
  <RouterView />
  <div id="debug">
    <HelloWorld  />
  </div>
</template>

<style scoped>
#debug {
  background-color: green;
  position: absolute;
  bottom: 5rem;
}
</style>
