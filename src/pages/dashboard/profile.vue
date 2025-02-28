<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md text-center">
      <h2 class="text-2xl font-bold mb-4 text-gray-700">User Profile</h2>

      <Skeleton v-if="loading" class="h-32 w-full mb-4 rounded-lg" />

      <div v-else>
        <!-- User Avatar -->
        <Avatar
          :label="user?.name?.charAt(0).toUpperCase()"
          shape="circle"
          size="large"
          class="block mx-auto mb-4 text-xl font-semibold"
        />

        <!-- User Info -->
        <p class="text-lg font-semibold text-gray-800">{{ user?.name }}</p>
        <p class="text-gray-600">{{ user?.email }}</p>
        <p class="text-sm text-gray-500">Member since: {{ formatDate(user?.createdAt) }}</p>

        <!-- Logout Button -->
        <Button label="Logout" icon="pi pi-sign-out" class="mt-5 w-full p-button-danger" @click="logout" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import Skeleton from "primevue/skeleton";
import { useToast } from "primevue/usetoast";

const user = ref(null);
const loading = ref(true);
const router = useRouter();
const toast = useToast();

const fetchUserData = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    const response = await $fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    user.value = response.user;
  } catch (error) {
    toast.add({ severity: "error", summary: "Error", detail: "Failed to load user data", life: 3000 });
    router.push("/auth/login");
  } finally {
    loading.value = false;
  }
};

const formatDate = (date) => new Date(date).toLocaleDateString();

const logout = () => {
  localStorage.removeItem("token");
  toast.add({ severity: "success", summary: "Logout Successful", detail: "You have been logged out.", life: 3000 });
  router.push("/auth/login");
};

onMounted(fetchUserData);

definePageMeta({ layout: "dashboard", middleware: "auth", });
</script>
