<template>
    <div>
      <div class="flex">
        <Sidebar />
        <main class="flex-1 p-6">
          <slot />
        </main>
      </div>
   
    </div>
  </template>
  
  <script setup>
  import Sidebar from "@/components/dashboard/Sidebar.vue";

  </script>
  