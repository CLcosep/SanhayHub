<script setup lang="ts">
 const sectionId = useRoute().params.sectionId
 const subjectId = useRoute().params.subjectId
    const gradeLevelId = useRoute().params.gradeLevelId
    const form = reactive<{topicName: string, file: File | null}>({
        topicName: '',
        file: null
    })

     definePageMeta({
        layout: 'default'
    })

    const errors = ref([])

    async function buttonHandler() {
    const formData = new FormData()
    formData.append("name", form.topicName)
    formData.append("subjectId", subjectId.toString())
    formData.append("file", form.file as File)
    const API = useRuntimeConfig().public.API
    const token = useCookie('auth_token').value
    const data = await $fetch<any>(`${ API}/topics`, {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .catch(error => {
        errors.value = error.data.errors
    })
    if (data){
      alert(`Successfully created ${data.name}`)
      await navigateTo(`/gradeLevel/${gradeLevelId}/section/${sectionId}/subjects/${subjectId}/topics/${data.id}`)
    }
}


import { useFileDialog } from '@vueuse/core'
import { stringifyQuery } from 'vue-router';

const { files, open, reset, onChange } = useFileDialog({
  accept: 'application/pdf', // Set to accept only image files
  directory: false, // Select directories instead of files if set true
})

onChange((files) => {
  form.file = files?.[0] as File
  
})

//topic form
</script>


<template>
>

    <div class="container mx-auto flex flex-col items-center mb-40">
        <div class="flex justify-center">
            <img src="~/assets/anhs_logo.png" alt="" class="w-24 h-24 mb-8"/>
        </div>
        <div class="form-box rounded-2xl w-full max-w-md">
            <h1 class="relative" ref="titleRef">
               Topic form 
                <span class="custom-after"></span>
            </h1>
            <form>
                <div class="h-[280px]">
                    <div class="input-field" ref="nameFieldRef">
                        <input type="text" v-model="form.topicName" placeholder="Topic name">
                    </div>
                    <button type="button" @click="(open as any)">
                         Choose file
                    </button>
                    <div v-if="files">
                    <p>You have selected: <b>{{ `${files.length} ${files.length === 1 ? 'file' : 'files'}` }}</b></p>
                        <li v-for="file of files" :key="file.name">
                            {{ file.name }}
                        </li>
                </div>
                    <!-- <form class="max-w-lg mx-auto">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Upload file</label>
                        <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file">
                    </form> -->
                </div> 
                
            </form>
           <div class="signBtn flex flex-col gap-4 justify-center">
                <button @click="buttonHandler" class="bg-[#102A71] py-4 rounded-md text-white font-bold">
                    Add subject
                </button>
            <NuxtLink to="/gradeLevel" class="underline " > <span class="text-[#102A71]">Cancel</span></NuxtLink>
           </div>
        </div>
    </div>
</template>


<style scoped>
    .form-box{
        border: 2px solid;
        border-color: black;
        padding: 50px 60px 70px;
        text-align: center;
    }
    .form-box h1 {
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 60px;
        color: black;
        position: relative;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }
    .custom-after::after{
        content: '';
        width: 30px;
        height: 4px;
        border-radius: 3px;
        background: black;
        position: absolute;
        bottom: -12px;
        left: 50%;
        transform: translateX(-50%);
    }
    .input-field {
        background: #eaeaea;
        margin: 15px 0px;
        border-radius: 3px;
        display: flex;
        align-items: center;
        max-height: 65px;
        transition: max-height 0.5s;
        overflow: hidden;
    }
    input{ 
        width: 100%;
        background: transparent;
        border: 0;
        outline: 0;
        padding: 18px 15px;
    }
    
</style>