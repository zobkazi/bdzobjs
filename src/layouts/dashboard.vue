<template>
    <div>
      <DashboardHeader />
      <div class="flex">
        <Sidebar />
        <main class="flex-1 p-6">
          <slot />
        </main>
      </div>
      <DashboardFooter />
    </div>
  </template>
  
  <script setup>
  import DashboardHeader from "@/components/dashboard/DashboardHeader.vue";
  import Sidebar from "@/components/dashboard/Sidebar.vue";
  import DashboardFooter from "@/components/dashboard/DashboardFooter.vue";
  </script>
  