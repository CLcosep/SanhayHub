<script setup>
    const form = reactive({
        username: '',
        password: '',
    })

     definePageMeta({
        layout: 'default'
    })

   async function formHandler(e) {
        const API = useRuntimeConfig().public.API
        const data = await $fetch(`${ API}/users`, {
            method: 'POST',
            body: JSON.stringify({
                username: form.username,
                password: form.password
            })
        })
        .catch(error => {
            alert(error.data.message)
        })
        if (data){
            alert(`Successfuly registered ${data.username}`)
        }
    }

    const userObj = useUserObj().value
    console.log(userObj)

</script>


<template>
>

    <div class="container mx-auto flex flex-col items-center mb-40">
        <div class="flex justify-center">
            <img src="~/assets/anhs_logo.png" alt="" class="w-24 h-24 mb-8"/>
        </div>
        <div class="form-box rounded-2xl w-full max-w-md">
            <h1 class="relative" ref="titleRef">
                Sign Up
                <span class="custom-after"></span>
            </h1>
            <form>
                <div class="h-[280px]">
                    <div class="input-field" ref="nameFieldRef">
                        <input type="text" v-model="form.username" placeholder="UserName">
                    </div>
                    <div class="input-field" >
                        <input type="password" v-model="form.password" placeholder="Password">
                    </div>
                </div>
            </form>
           <div class="signBtn flex flex-col gap-4 justify-center">
                <button @click="formHandler" class="bg-[#102A71] py-4 rounded-md text-white font-bold">
                    Register
                </button>
            <NuxtLink to="/authen/login" class="underline " >already have an account? <span class="text-[#102A71]">Login</span></NuxtLink>
           </div>
        </div>
    </div>
</template>


<style scoped>
    .form-box{
        border: 2px solid;
        border-color: black;
        padding: 50px 60px 70px;
        text-align: center;
    }
    .form-box h1 {
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 60px;
        color: black;
        position: relative;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }
    .custom-after::after{
        content: '';
        width: 30px;
        height: 4px;
        border-radius: 3px;
        background: black;
        position: absolute;
        bottom: -12px;
        left: 50%;
        transform: translateX(-50%);
    }
    .input-field {
        background: #eaeaea;
        margin: 15px 0px;
        border-radius: 3px;
        display: flex;
        align-items: center;
        max-height: 65px;
        transition: max-height 0.5s;
        overflow: hidden;
    }
    input{ 
        width: 100%;
        background: transparent;
        border: 0;
        outline: 0;
        padding: 18px 15px;
    }
    
</style>