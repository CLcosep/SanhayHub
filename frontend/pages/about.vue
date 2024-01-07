<template>
    <div>
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
        
        <div class="container display-box border mx-auto flex items-center justify-center p-4">  
            <div class="flex-1 basis-0">
                <p class="text-4xl font-bold mb-4">Unlocking Education: Free, Accessible Module Hosting for All</p>
                <p>Empowering educators worldwide with a platform that fosters knowledge sharing and learning enrichment through free,
                     accessible module hosting. Join our community, where the exchange of educational resources knows no boundaries</p>
            </div>
            
            <div class="bg-white flex flex-1 basis-0 justify-center">
                <img src="~/assets/student2.png" alt=""  />
            </div>
            

        </div>

        <div class="container display-box border mx-auto flex items-center justify-center p-4">  
           
            <div class="bg-white flex flex-1 basis-0 justify-center">
                <img src="~/assets/woman1.png" alt=""  />
            </div>
            
            <div class="flex-1 basis-0">
                <p class="text-4xl font-bold  mb-4">Diverse Learning Resources</p>
                <p>SanhayLearningHub.com is your inclusive digital repository, 
                    offering a broad range of learning resources tailored for various academic strands,
                     including STEM, HUMSS, and ABM, covering grades 11 and 12.</p>
            </div>
                

        </div>


    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>