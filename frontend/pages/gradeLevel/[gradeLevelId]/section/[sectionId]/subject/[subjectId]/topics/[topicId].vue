<script setup lang="ts">
    const topicId = useRoute().params.topicId
    const subjectId = useRoute().params.subjectId
    const sectionId = useRoute().params.sectionId
    const gradeLevelId = useRoute().params.gradeLevelId
    const API = useRuntimeConfig().public.API
    console.log(API)
    const { data } = await useFetch<{id: number, name: string, sectionId: number, file: string }>(`${API}/topics/${topicId}`)
    const { data: data3 } = await useFetch<{id: number, name: string, sectionId: number, topics: [{id: number, name: string, subjectId: number}] }>(`${API}/subjects/${subjectId}`)
    const { data: data1 } = await useFetch<{id: number, name: string, gradeNo: number, sections: [{id: number, name: string, gradeId: number}] }>(`${API}/gradeLevels/${gradeLevelId}`)
    const { data: data2 } = await useFetch<{id: number, name: string, gradeId: number, subjects: [{id: number, name: string, sectionId: number}] }>(`${API}/sections/${sectionId}`)
    console.log(data.value)




    //             // button

    const errors = ref([])

async function buttonHandler() {
    const API = useRuntimeConfig().public.API
    const token = useCookie('auth_token').value
    const data1 = await $fetch<[{id: number, name: string, gradeNo: number}]>(`${ API}/topics/${useRoute().params.topicId}`, {
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
      await navigateTo(`/gradeLevel/${gradeLevelId}/section/${sectionId}/subject/${subjectId}`)
    }
}

</script>

<template>

    <!-- nav -->
    <div class="flex items-center justify-center">
        <p class="text-black text-opacity-50">~/<span><NuxtLink to="/gradeLevel/">Grade level</NuxtLink></span>/{{ data1?.name }}/<NuxtLink :to="`/gradeLevel/${gradeLevelId}`">Section</NuxtLink>/{{ data2?.name }}
        /<NuxtLink :to="`/gradeLevel/${gradeLevelId}/section/${sectionId}`">Subject</NuxtLink>/{{ data3?.name }}/<NuxtLink :to="`/gradeLevel/${gradeLevelId}/section/${sectionId}/subject/${subjectId}`">Topic</NuxtLink>/{{ data?.name }}</p>              
    </div>

    <div class="flex flex-1 basis-0 items-center justify-center">
                <button @click="buttonHandler">Delete</button>
            </div>


<!-- header -->
<div class="container display-box border mx-auto p-4">
    <p class="text-4xl font-mono font-extrabold">{{ data?.name }}</p>
</div>

<!-- display -->
<div class="container display-box border mx-auto p-4">  
    <div class="w-full h-full   ">
        <object :data="data?.file" width="100%" height="1000px">
        <p>Unable to display PDF file. <a :href="data?.file">Download</a> instead.</p>
        </object>
    </div>
</div>

</template>



<style scoped>

</style>