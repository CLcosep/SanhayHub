
<script setup lang="ts">
    const gradeLevel = useRoute().params.gradeLevel
    const sectionId = useRoute().params.sectionId
    const gradeLevelId = useRoute().params.gradeLevelId
    const API = useRuntimeConfig().public.API
    console.log(API)
    const { data,refresh } = await useFetch<{id: number, name: string, gradeNo: number, sections: [{id: number, name: string, gradeId: number}] }>(`${API}/gradeLevels/${gradeLevelId}`)
    console.log(data.value)

           //             // button

   const errors = ref([])

async function buttonHandler() {
    const API = useRuntimeConfig().public.API
    const token = useCookie('auth_token').value
    const data = await $fetch<[{id: number, name: string, gradeNo: number}]>(`${ API}/gradeLevels/${useRoute().params.gradeLevelId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .catch(error => {
        alert(error.data.message)
    })
    if (data){
      alert(`Successfully Deleted`)
      await navigateTo(`/gradeLevel/${gradeLevelId}/section/${sectionId}`)
    }
}


</script>
<!-- change some to section -->

<template>
    <div class="h-screen">
        <!-- nav -->

            <div class="flex items-center justify-center">
                <p class="text-black text-opacity-50">~/<span><NuxtLink to="/gradeLevel/">gradeLevel</NuxtLink></span>/ {{ data?.name }}</p>        
            </div>
            <div class="flex flex-1 basis-0 items-center justify-center">
                <button @click="buttonHandler">Delete</button>
            </div>
        
 
        <!-- display dommino -->
        <div class="container display-box border mx-auto flex items-center justify-center p-4">
            <div class="grid grid-cols-5">           
                <NuxtLink :to="`/gradeLevel/${gradeLevelId}/section/create`">
                    <div class="flex items-center justify-center border-2 bg-blue-500 h-20 w-64 mr-10 rounded-md">
                        <p class="text-center text-2xl">Add new</p>
                    </div>
                </NuxtLink>
               <NuxtLink v-for="section in data!.sections" :to="`/gradelevel/${gradeLevelId}/section/${section.id.toString()}`">
                    <div  class="flex border-2 border-blue-700 gap-4 h-20 w-64  rounded-md">
                        <div class="flex flex-1 basis-0 p-4  text-2xl  items-center justify-center ">
                            <p class="flex-1 basis-0 text-center">{{ section.name }}</p>
                        </div>
                    </div>
               </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>