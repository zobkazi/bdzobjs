<template>
    <div class="max-w-full sm:max-w-6xl mx-auto py-6 px-4">
      <h1 class="text-3xl font-bold mb-4 text-center sm:text-left">Edit Project</h1>
  
      <Button 
        label="Back to Projects" 
        icon="pi pi-arrow-left" 
        class="mb-4 w-full sm:w-auto text-white bg-gray-700 hover:bg-gray-800" 
        @click="goBack" 
      />
  
      <!-- Edit Project Form -->
      <div v-if="project" class="bg-white p-6 shadow-md rounded-lg">
        <h2 class="text-xl mb-4">Project Details</h2>
  
        <form @submit.prevent="submitForm">
          <div class="grid grid-cols-1 gap-4">
            <!-- Title -->
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
              <InputText v-model="form.title" id="title" class="w-full" :feedback="false"></InputText>
            </div>
  
            <!-- Description -->
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
              <Textarea v-model="form.description" id="description" class="w-full" :feedback="false"></Textarea>
            </div>
  
            <!-- URL -->
            <div>
              <label for="url" class="block text-sm font-medium text-gray-700">Project URL (Optional)</label>
              <InputText v-model="form.url" id="url" class="w-full" :feedback="false"></InputText>
            </div>
  
            <!-- GitHub URL -->
            <div>
              <label for="github" class="block text-sm font-medium text-gray-700">GitHub URL (Optional)</label>
              <InputText v-model="form.github" id="github" class="w-full" :feedback="false"></InputText>
            </div>
                <!-- GitHub URL -->
                <div>
              <label for="github" class="block text-sm font-medium text-gray-700">GitHub URL (Optional)</label>
              <InputText v-model="form.image" id="github" class="w-full" :feedback="false"></InputText>
            </div>
  
            <!-- Tech Stack -->
            <div>
              <label for="techStack" class="block text-sm font-medium text-gray-700">Tech Stack</label>
              <MultiSelect 
                v-model="form.techStack" 
                :options="techStackOptions" 
                optionLabel="name" 
                   optionValue="code"
                class="w-full" 
                :placeholder="'Select Tech Stack'"
              ></MultiSelect>
            </div>
  
            <!-- Submit Button -->
            <div class="flex justify-end mt-4">
              <Button 
                label="Save Changes" 
                icon="pi pi-check" 
                type="submit" 
                class="p-button-primary"
              />
            </div>
          </div>
        </form>
      </div>
  
      <Toast></Toast>
    </div>
  </template>
  

  <script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import Button from 'primevue/button';
import Toast from 'primevue/toast';

import technologies from '../create/technologies'



interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  github: string;
  techStack: string[];
}

const project = ref<Project | null>(null);
const form = ref<Project>({
  id: '',
  title: '',
  description: '',
  url: '',
  image: '',
  github: '',
  techStack: [],
});

const techStackOptions = ref(technologies);

const route = useRoute();
const router = useRouter();
const toast = useToast();

const fetchProject = async () => {
  try {
    const response = await fetch(`/api/projects/getById/${route.params.id}`);
    const data = await response.json();

    if (data.success) {
      project.value = data.project;
      form.value = { ...data.project };
    } else {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Project not found', life: 3000 });
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch project details', life: 3000 });
  }
};

const submitForm = async () => {
  try {
    const response = await fetch(`/api/projects/edit/${route.params.id}`, {
      method: 'PUT',
      body: JSON.stringify(form.value),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    

    const data = await response.json();

    console.log("my update data is ++>", data)

    if (data.success) {
      toast.add({ severity: 'success', summary: 'Project Updated', detail: 'The project has been updated successfully.', life: 3000 });
      router.push('/dashboard/projects');
    } else {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to update project', life: 3000 });
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to update project', life: 3000 });
  }
};

const goBack = () => {
  router.push('/dashboard/projects');
};

onMounted(() => {
  fetchProject();
});

definePageMeta({
  layout: 'dashboard',
});
</script>



  <style scoped>
  /* Custom styles */
  .container {
    max-width: 800px;
  }
  
  /* Form Styling */
  input,
  textarea,
  button {
    border-radius: 8px;
    padding: 12px;
  }
  
  input:focus,
  textarea:focus {
    border-color: #3b82f6;
    outline: none;
  }
  
  button {
    transition: background-color 0.2s ease-in-out;
  }
  
  button:hover {
    background-color: #4b92f6;
  }
  </style>
  