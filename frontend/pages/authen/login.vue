<script setup>
    const form = reactive({
        username: '',
        password: '',
    })

     definePageMeta({
        layout: 'default'
    })

    function formHandler(e) {
        console.log(form.username);
        console.log(form.password);
    }

</script>


<template>

    <!-- nav -->
    <header class="shadow-sm">
            <nav class="container mx-auto p-4 flex justify-between items-center">
                <NuxtLink to="/" class="font-bold text-2xl">Sanhayhub</NuxtLink>
                <ul class="flex gap-5">
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/about">About</NuxtLink></li>
                    <li><NuxtLink to="/">Explore</NuxtLink></li>
                    <li><NuxtLink to="/authen/register" class="btn">Sign in</NuxtLink></li>
                </ul>
            </nav>
        </header>

    <div class="container mx-auto">
        <div class="form-box">
            <h1 class="relative" ref="titleRef">
                Log In
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
            <button @click="formHandler" class="border-2 bg-[#FFDC5F] py-4 rounded-md">Login</button>
            <button><NuxtLink to="/authen/register">Register</NuxtLink></button>
           </div>
        </div>
    </div>
</template>


<style scoped>
    .form-box{
        width: 90%;
        max-width: 450px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #102A71;
        padding: 50px 60px 70px;
        text-align: center;
    }
    .form-box h1 {
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 60px;
        color: white;
        position: relative;
    }
    .custom-after::after{
        content: '';
        width: 30px;
        height: 4px;
        border-radius: 3px;
        background: white;
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