import { useUserObj } from "~/composables/states"

export default defineNuxtPlugin(async (nuxtApp) => {
    const token = useCookie("auth_token").value
    if (token){
        console.log("user has token")
        const API = useRuntimeConfig().public.API
        const data = await $fetch<{username: string, id: number}>(`${ API}/users/validate`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .catch(error =>{
            return
        })
        if (data){
            const userObj = useUserObj().value
            userObj.isLogin = true
            userObj.username = data.username
        }
    } else {
        console.log('no token')
    }
    
  })