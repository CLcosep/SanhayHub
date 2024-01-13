
import type userVue from '~/pages/user.vue';
<script setup lang="ts">
      const userObj = useUserObj()

      async function Logout(){
        userObj.value = {
        isLogin: false,
        username: '',

        }
        const token = useCookie('auth_token')
        token.value = null
        await navigateTo('/')
      }
</script>

<template>
        <header class="shadow-sm">
      <nav class="container mx-auto p-4 flex justify-between items-center">
        <div class="flex justify-center items-center">
            <img src="/logo.png" alt="" class="h-24 bg-white rounded-full object-zoom">
            <NuxtLink to="/" class="text-3xl tracking-widest ml-0">Sanhayhub</NuxtLink>
        </div>
        <ul class="flex gap-5">
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/about">About</NuxtLink></li>
          <li><NuxtLink to="/gradeLevel/">Explore</NuxtLink></li>
          <li v-if="!userObj.isLogin">
            <NuxtLink to="/authen/login" class="btn">Sign in</NuxtLink>
          </li>
          <li v-else class="flex gap-4">
            <div class="underline">{{ userObj.username }}</div>
            <button class="btn" @click="Logout">Logout</button>
          </li>
        </ul>
      </nav>
    </header>

</template>



<style scoped>

</style>