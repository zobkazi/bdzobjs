<template>
    <div class="p-4 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg">
      <div class="flex items-center mb-2">
        <i class="pi pi-exclamation-circle mr-2"></i>
        <span class="font-medium">Authentication Error</span>
      </div>
      <p class="text-sm">{{ error }}</p>
      <button 
        @click="$emit('login')" 
        class="mt-3 w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
      >
        Go to Login
      </button>
    </div>
  </template>
  
  <script setup>
  defineProps({
    error: {
      type: String,
      required: true
    }
  });
  
  defineEmits(['login']);
  </script>