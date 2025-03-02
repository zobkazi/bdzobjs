<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-semibold mb-8 text-center text-gray-800">Create New Project</h1>

    <!-- Button to toggle the form visibility -->
    <Button
      label="Create Project"
      icon="pi pi-plus"
      @click="showForm = !showForm"
      class="mb-6 p-button-outlined p-button-sm w-full sm:w-auto"
    ></Button>

    <!-- Conditional form rendering -->
    <div  class="bg-white p-8 rounded-lg shadow-xl">
      <h2 class="text-2xl font-semibold mb-6 text-gray-700">Project Details</h2>

      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 gap-6">
          <!-- Title Field -->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <InputText
              v-model="form.title"
              id="title"
              class="w-full mt-2 p-3 border border-gray-300 rounded-md"
              :feedback="false"
            ></InputText>
            <p v-if="errors.title" class="text-red-500 text-sm">{{ errors.title }}</p>
          </div>

          <!-- Description Field -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <Textarea
              v-model="form.description"
              id="description"
              class="w-full mt-2 p-3 border border-gray-300 rounded-md"
              :feedback="false"
            ></Textarea>
            <p v-if="errors.description" class="text-red-500 text-sm">{{ errors.description }}</p>
          </div>

          <!-- Project URL Field -->
          <div>
            <label for="url" class="block text-sm font-medium text-gray-700">Project URL (Optional)</label>
            <InputText
              v-model="form.url"
              id="url"
              class="w-full mt-2 p-3 border border-gray-300 rounded-md"
              :feedback="false"
            ></InputText>
          </div>

          <!-- GitHub URL Field -->
          <div>
            <label for="github" class="block text-sm font-medium text-gray-700">GitHub URL (Optional)</label>
            <InputText
              v-model="form.github"
              id="github"
              class="w-full mt-2 p-3 border border-gray-300 rounded-md"
              :feedback="false"
            ></InputText>
          </div>

          <!-- Project Image URL Field -->
          <div>
            <label for="image" class="block text-sm font-medium text-gray-700">Image URL (Optional)</label>
            <InputText
              v-model="form.image"
              id="image"
              class="w-full mt-2 p-3 border border-gray-300 rounded-md"
              :feedback="false"
            ></InputText>
          </div>

          <!-- Tech Stack Field -->
          <div>
            <label for="techStack" class="block text-sm font-medium text-gray-700">Tech Stack</label>
            <MultiSelect
              v-model="form.techStack"
              :options="techStackOptions"
              optionLabel="name"
              class="w-full mt-2 p-3 border border-gray-300 rounded-md"
              :placeholder="'Select Tech Stack'"
            ></MultiSelect>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end mt-6">
            <Button
              label="Create Project"
              icon="pi pi-check"
              type="submit"
              class="p-button-primary"
            ></Button>
          </div>
        </div>
      </form>
    </div>

    <!-- Toast Notifications -->
    <Toast></Toast>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import Button from 'primevue/button';


import technologies from './technologies'


const form = ref({
  title: '',
  description: '',
  url: '',
  image: '',
  github: '',
  techStack: []
});

const errors = ref({
  title: '',
  description: '',
});

const techStackOptions = ref(technologies);

const toast = useToast();
const router = useRouter();

const validateForm = () => {
  errors.value = { title: '', description: '' }; // Reset errors before validation

  let isValid = true;

  // Validate title field
  if (!form.value.title) {
    errors.value.title = 'Title is required';
    isValid = false;
  }

  // Validate description field
  if (!form.value.description) {
    errors.value.description = 'Description is required';
    isValid = false;
  }

  return isValid;
};

const submitForm = async () => {
  if (!validateForm()) {
    return; // Prevent form submission if validation fails
  }

  try {
    // Map the techStack values to only include the names (strings) of selected technologies
    const techStackNames = form.value.techStack.map((item) => item.name);

    // Update the form data with the extracted tech stack names
    const response = await $fetch('/api/projects/create', {
      method: 'POST',
      body: { ...form.value, techStack: techStackNames }
    });


    if (response.success) {
      toast.add({ severity: 'success', summary: 'Project Created', detail: 'The project was created successfully.' });
      router.push('/dashboard/projects');
    } else {
      toast.add({ severity: 'error', summary: 'Error', detail: response.message || 'Failed to create project.' });
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while creating the project.' });
  }
};
</script>

<style scoped>
/* Tailwind Custom Styles */
.container {
  max-width: 800px;
}

button {
  transition: background-color 0.2s ease-in-out;
}

button:hover {
  background-color: #4b56d2;
}

textarea,
input {
  border-color: #d1d5db;
}

textarea:focus,
input:focus {
  outline: none;
  border-color: #4b56d2;
}

input,
textarea,
button {
  transition: border-color 0.2s ease-in-out;
}
</style>
