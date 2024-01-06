<template>
    <!-- Navigation -->
    <div class="bg-[#001840]">
        <header class="shadow-sm">
            <nav class="container mx-auto p-4 flex justify-between items-center text-white">
               <NuxtLink to="/" class="font-bold text-3xl">Sanhayhub</NuxtLink>
                <ul class="flex gap-5">
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/about">About</NuxtLink></li>
                    <li><NuxtLink to="/">Explore</NuxtLink></li>
                    <li><NuxtLink to="/">Sign in</NuxtLink></li>
                </ul>
            </nav>
        </header>


        <!-- output page content -->
        <div class="container mx-auto">
            <slot />
        </div>
    </div>
</template>

<style scoped>

</style>