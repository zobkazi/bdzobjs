<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 class="text-2xl font-bold text-center mb-4 text-gray-700">User Profile</h2>
  
        <a-skeleton v-if="loading" active />
  
        <div v-else>
          <a-avatar size="large" class="block mx-auto mb-4">
            {{ user?.name.charAt(0).toUpperCase() }}
          </a-avatar>
  
          <p class="text-lg font-semibold text-center">{{ user?.name }}</p>
          <p class="text-gray-600 text-center">{{ user?.email }}</p>
          <p class="text-sm text-gray-500 text-center">
            Member since: {{ formatDate(user?.createdAt) }}
          </p>
  
          <a-button type="primary" class="mt-4 w-full" @click="logout">Logout</a-button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { notification } from "ant-design-vue";
  import { useRouter } from "vue-router";
  
  const user = ref(null);
  const loading = ref(true);
  const router = useRouter();
  
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
  
      const response = await $fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      user.value = response.user;
    } catch (error) {
      notification.error({ message: "Error", description: error.message });
      router.push("/login");
    } finally {
      loading.value = false;
    }
  };
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Notify user of successful logout
    notification.success({ message: "Logout Successful", description: "You have been logged out." });
    // Redirect to login page
    router.push("/auth/login");
  };
  
  onMounted(fetchUserData);
  </script>
  