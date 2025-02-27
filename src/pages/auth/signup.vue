<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold text-center mb-4 text-gray-700">Sign Up</h2>
        <form @submit.prevent="handleSignup" class="space-y-4">
          <input v-model="username" placeholder="Username" class="input" required />
          <input v-model="email" type="email" placeholder="Email" class="input" required />
          <input v-model="password" type="password" placeholder="Password" class="input" required />
          <button type="submit" class="btn">Sign Up</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const username = ref("");
  const email = ref("");
  const password = ref("");
  
  const handleSignup = async () => {
    try {
      const response = await $fetch("/api/auth/signup", {
        method: "POST",
        body: { username: username.value, email: email.value, password: password.value },
      });
      alert(response.message);
    } catch (error) {
      alert(error.message);
    }
  };
  </script>
  
  <style scoped>
  
  </style>
  