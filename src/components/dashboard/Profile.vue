<template>
    <div class="p-3 mb-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
      <router-link to="/profile" class="flex items-center">
        <Avatar 
          :image="user.avatarUrl || 'https://primefaces.org/cdn/primevue/images/avatar/defaultuser.png'" 
          class="mr-3" 
          size="large" 
          shape="circle" 
        />
        <div class="flex flex-col items-start overflow-hidden">
          <span class="font-medium text-gray-800 dark:text-gray-200 truncate max-w-full">
            {{ user.name }}
          </span>
          <span class="text-sm text-gray-500 dark:text-gray-400 truncate max-w-full">
            {{ user.email }}
          </span>
        </div>
        <i class="pi pi-chevron-right ml-auto text-gray-400"></i>
      </router-link>
    </div>
  </template>
  
  <script setup>
  import { useAuthStore } from '@/store/auth';
  
  const authStore = useAuthStore();
  const user = computed(() => authStore.user || {});
  </script>