<template>
    <!-- Navigation -->
    <div>
        <header class="shadow-sm bg-purple-200">
            <nav class="container mx-auto p-4 flex justify-between items-center">
               <NuxtLink to="/" class="font-bold text-4xl text-yellow-400">Sanhayhub</NuxtLink>
                <ul class="flex gap-5">
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/about">About</NuxtLink></li>
                    <li><NuxtLink to="/">Explore</NuxtLink></li>
                    <li><NuxtLink to="/">Sign in</NuxtLink></li>
                </ul>
            </nav>
        </header>


        <!-- output page content -->
        <div class="container mx-auto ">
            <slot />
        </div>
    </div>
</template>

<style scoped>

</style>