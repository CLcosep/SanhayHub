
<script setup lang="ts">
    const API = useRuntimeConfig().public.API
    console.log(API)
    const { data } = await useFetch<[{id: number, name: string, gradeNo: number}]>(`${API}/gradeLevels/`)
    console.log(data.value)




</script>


<template>
    <div class="h-screen">
        <!-- nav -->
        <div class="flex flex-1 basis-0 p-4 items-center justify-center">

            <div class="flex flex-1 basis-0 items-center justify-center">
                <p class="text-black text-opacity-50">~/gradeLevel/</p>        
            </div>
            <!-- <div class="flex flex-1 basis-0 items-center justify-center">
                <button @click="buttonHandler">Delete</button>
            </div> -->
        </div>
        <!-- display dommino -->
        <div class="container display-box border mx-auto flex items-center justify-center p-4">
            <div class="grid grid-cols-5">           
                <NuxtLink to="/gradeLevel/create">
                    <div class="flex items-center justify-center border-2 bg-blue-500 h-20 w-64 mr-10 rounded-md">
                        <p class="text-center text-2xl">Add new</p>
                    </div>
                </NuxtLink>
                <NuxtLink v-for="gradeLevel in data" :to="`/gradeLevel/${gradeLevel.id.toString()}`" class="flex border-2 border-blue-700 gap-4 h-20 w-64  rounded-md">
                    <div class="flex flex-1 basis-0 p-4  text-2xl  items-center justify-center ">
                        <p class="flex-1 basis-0 text-center">{{ gradeLevel.name }}</p>
                        <p class="flex-1 basis-0 text-center">{{ gradeLevel.gradeNo }}</p>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>