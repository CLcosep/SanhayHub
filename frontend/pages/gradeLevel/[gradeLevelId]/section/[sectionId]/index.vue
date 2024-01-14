
<script setup lang="ts">
    const gradeLevelId = useRoute().params.gradeLevelId
    const sectionId = useRoute().params.sectionId
    const API = useRuntimeConfig().public.API
    console.log(API)
    const { data: data1 } = await useFetch<{id: number, name: string, gradeNo: number, sections: [{id: number, name: string, gradeId: number}] }>(`${API}/gradeLevels/${gradeLevelId}`)
    const { data } = await useFetch<{id: number, name: string, gradeId: number, subjects: [{id: number, name: string, sectionId: number}] }>(`${API}/sections/${sectionId}`)
    console.log(data.value)


       //             // button

   const errors = ref([])

async function buttonHandler() {
    const API = useRuntimeConfig().public.API
    const token = useCookie('auth_token').value
    const data = await $fetch<[{id: number, name: string, gradeNo: number}]>(`${ API}/sections/${useRoute().params.sectionId}`, {
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
<!-- change some to subject -->

<template>
    <div class="h-screen">
        <!-- nav -->
        <div class="flex items-center justify-center">
            <p class="text-black text-opacity-50">~/<span><NuxtLink to="/gradeLevel/">Gradelevel</NuxtLink></span>/{{ data1?.name }}/<NuxtLink :to="`/gradeLevel/${gradeLevelId}`">Section</NuxtLink>/{{ data?.name }}</p>        
        </div>

        <div class="flex flex-1 basis-0 items-center justify-center">
                <button @click="buttonHandler">Delete</button>
            </div>

        <!-- display dommino -->
        <div class="container display-box border mx-auto flex items-center justify-center p-4">
            <div class="grid grid-cols-5">           
                <NuxtLink :to="`/gradeLevel/${gradeLevelId}/section/${sectionId}/subject/create`">
                    <div class="flex items-center justify-center border-2 bg-blue-500 h-20 w-64 mr-10 rounded-md">
                        <p class="text-center text-2xl">Add new</p>
                    </div>
                </NuxtLink>
                <NuxtLink v-for="subject in data!.subjects" :to="`/gradelevel/${gradeLevelId}/section/${sectionId}/subject/${subject.id.toString()}`">
                    <div  class="flex border-2 border-blue-700 gap-4 h-20 w-64  rounded-md">
                        <div class="flex flex-1 basis-0 p-4  text-2xl  items-center justify-center ">
                            <p class="flex-1 basis-0 text-center">{{ subject.name }}</p>
                        </div>
                    </div>
               </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>