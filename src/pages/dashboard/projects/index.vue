<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-semibold mb-6">Projects Dashboard</h1>
    
      <!-- Projects Table -->
      <div class="overflow-x-auto bg-white shadow-md rounded-lg">
        <table class="min-w-full table-auto">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-left text-sm font-medium text-gray-700">Title</th>
              <th class="px-6 py-3 text-left text-sm font-medium text-gray-700">Created At</th>
              <th class="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projects" :key="project.id">
              <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ project.title }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ project.createdAt }}</td>
              <td class="px-6 py-4 text-sm">
                <Button icon="pi pi-pencil" label="Edit" class="mr-2" @click="editProject(project.id)" />
                <Button icon="pi pi-trash" label="Delete" class="p-button-danger" @click="deleteProject(project.id)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Pagination -->
      <div class="mt-4 flex justify-end">
        <Paginator 
          :rows="itemsPerPage" 
          :totalRecords="totalProjects" 
          :page="currentPage" 
          @page="onPageChange"
          class="p-mt-4"
        />
      </div>
    </div>
    <Toast></Toast>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useToast } from 'primevue/usetoast';
  import { useRouter } from 'vue-router';
  
  import Button from 'primevue/button';
  import Paginator from 'primevue/paginator';
  import { $fetch } from 'ofetch'; // Make sure you have this set up for fetching data.
  
  const projects = ref([]);
  const totalProjects = ref(0);
  const currentPage = ref(1);
  const itemsPerPage = ref(10);
  
  const toast = useToast();
  const router = useRouter();
  
  const fetchProjects = async () => {
    try {
      const response = await $fetch('/api/projects', {
        method: 'GET',
        query: {
          page: currentPage.value,
          limit: itemsPerPage.value,
        }
      });
  
      if (response.success) {
        projects.value = response.projects;
        totalProjects.value = response.totalProjects; // Assuming response includes the total count of projects
      } else {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch projects.' });
      }
    } catch (error) {
      toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching the projects.' });
    }
  };
  
  const onPageChange = (event) => {
    currentPage.value = event.page + 1; // PrimeVue paginator is 0-based, so increment the page
    fetchProjects();
  };
  
  const editProject = (id) => {
    router.push(`/dashboard/projects/edit/${id}`);
  };
  
  const deleteProject = async (id) => {
    try {
      const response = await $fetch(`/api/projects/delete/${id}`, {
        method: 'DELETE'
      });
  
      if (response.success) {
        toast.add({ severity: 'success', summary: 'Project Deleted', detail: 'The project was deleted successfully.' });
        fetchProjects(); // Reload projects after deletion
      } else {
        toast.add({ severity: 'error', summary: 'Error', detail: response.message || 'Failed to delete project.' });
      }
    } catch (error) {
      toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while deleting the project.' });
    }
  };
  
  // Fetch projects on initial mount
  onMounted(() => {
    fetchProjects();
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  
  th, td {
    text-align: left;
  }
  
  table {
    width: 100%;
  }
  
  p-button {
    margin-right: 0.5rem;
  }
  
  .paginator {
    max-width: 300px;
    margin-top: 20px;
  }
  </style>
  