<template>
    <div>
      <Header />
      <main class="">
        <slot />
      </main>
    </div>
  </template>
  
  <script setup>
  import Header from "@/components/common/Header.vue";
  </script>
  