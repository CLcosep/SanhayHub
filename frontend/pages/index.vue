<template>
  <div>
    <!-- header -->
    <header class="shadow-sm">
      <nav class="container mx-auto p-4 flex justify-between items-center">
        <NuxtLink to="/" class="text-3xl tracking-widest">Sanhayhub</NuxtLink>
        <ul class="flex gap-5">
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/about">About</NuxtLink></li>
          <li><NuxtLink to="/">Explore</NuxtLink></li>
          <li>
            <NuxtLink to="/authen/register" class="btn">Sign in</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>

    <div
      class="container display-box border mx-auto flex items-center justify-center p-4"
    >
      <div class="bg-white flex flex-1 basis-0 justify-center">
        <img src="~/assets/student1.1.png" alt="" />
      </div>

      <div class="flex-1 basis-0">
        <p class="text-black text-8xl font-serif text-opacity-75">
          Empowering Education, <br />
          One Module at a Time.
        </p>
        <p class="mb-4 text-black text-opacity-55">
          Enrich educational journeys by curating a versatile and inclusive
          library of school modules, fostering collaboration among educators and
          students for enhanced learning experiences.
        </p>
        <NuxtLink to="/" class="btn px-6 py-3 text-lg">Explore Now</NuxtLink>
      </div>
    </div>
    <div class="container mx-auto p-4 my-12">
      <h4 class="text-center font-bold text-5xl font-serif pb-24">
        Why
        <span class="bg-blue-400 rounded-full p-4 font-sans text-white"
          >Sanhayhub</span
        >
        delivers
      </h4>
      <div class="grid grid-cols-3 p-4">
        <div class="text-center px-8">
          <img src="/why1.png" class="h-56 mx-auto" alt="" />
          <h5 class="font-medium text-3xl">Personalized Learning</h5>
          <p class="text-lg font-normal">
            Students get to learn on their own pace. Discover and expect
            resources from various level filling the unkown paths to learning
            process
          </p>
        </div>
        <div class="text-center px-8">
          <img src="/why2.png" class="h-56 mx-auto" alt="" />
          <h5 class="font-medium text-3xl">Trusted Content</h5>
          <p class="text-lg font-normal">
            Sanhay Hub's open-source library, crafted by experts, provides
            trustworthy educational resources, including lessons and practice
            materials in mathematics, science, and various subjects. This
            valuable resource is consistently accessible without charge for both
            students and educators.
          </p>
        </div>
        <div class="text-center px-8">
          <img src="/why3.png" class="h-56 mx-auto" alt="" />
          <h5 class="font-medium text-3xl">Collaborative student efforts</h5>
          <p class="text-lg font-normal">
            Our resources is backed by a community of students and educators who
            are passionate in sharing their knowledge and experience to help
            others. And making difficult lessons easier to understand.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
h1 {
  margin-bottom: 20px;
  font-size: 36px;
}
p {
  margin: 20px 0;
}
</style>
