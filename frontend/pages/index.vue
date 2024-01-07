<template>
    <div>
        <!-- header -->
        <header class="shadow-sm">
            <nav class="container mx-auto p-4 flex justify-between items-center">
                <NuxtLink to="/" class="text-3xl tracking-widest  ">Sanhayhub</NuxtLink>
                <ul class="flex gap-5">
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/about">About</NuxtLink></li>
                    <li><NuxtLink to="/">Explore</NuxtLink></li>
                    <li><NuxtLink to="/authen/register" class="btn">Sign in</NuxtLink></li>
                </ul>
            </nav>
        </header>



        <div class="container display-box border mx-auto flex items-center justify-center p-4">
            <div class="bg-white flex flex-1 basis-0 justify-center">
                <img src="~/assets/student1.1.png" alt=""  />
            </div>

           
            <div class="flex-1 basis-0">
                <p class="text-black text-8xl font-serif text-opacity-75">Empowering Education, <br> One Module at a Time. </p>
                <p class=" mb-4 text-black text-opacity-55">Enrich educational journeys by curating a versatile and inclusive library of school modules, fostering collaboration among educators and students for enhanced learning experiences.</p>
                <NuxtLink to="/" class="btn px-6 py-3 text-lg">Explore Now</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
h1 {
        margin-bottom: 20px;
        font-size: 36px;
    }
    p {
        margin: 20px 0;
    }


</style>