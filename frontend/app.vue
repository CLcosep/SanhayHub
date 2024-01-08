<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :color="'yellow'" />
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
          <li>
            <NuxtLink to="/authen/register" class="btn">Sign in</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
    <NuxtPage />

    <footer class="bg-main">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <div class="flex justify-center items-center gap-4">
            <img
              src="/logo.png"
              class="h-24 bg-white rounded-full object-zoom"
              alt=""
            />
            <p class="font-bold text-white text-4xl">Sanhayhub</p>
          </div>

          <ul
            class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400"
          >
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6"
                >Privacy Policy</a
              >
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
            </li>
            <li>
              <a href="#" class="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
        <hr
          class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
        />
        <span
          class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"
          >© 2023
          <a href="https://flowbite.com/" class="hover:underline">SanhayHub™</a
          >. All Rights Reserved.</span
        >
      </div>
    </footer>
  </NuxtLayout>
</template>
