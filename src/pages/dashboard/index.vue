<template>
    <div>
      <h1 class="text-4xl font-bold text-green-500">Dashboard Home</h1>
    </div>
  </template>
  
  <script setup>
  definePageMeta({ layout: "dashboard", middleware: "auth", });
  </script>
  