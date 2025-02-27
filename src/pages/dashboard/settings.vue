<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4 text-center">Settings</h2>
    
    <form @submit.prevent="handleUpdate" class="space-y-4">
      <div class="mb-4">
        <input
          v-model="name"
          type="text"
          placeholder="Name"
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>
      <div class="mb-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-500 transition duration-200"
      >
        Update User
      </button>
    </form>

    <div class="mt-6">
      <button
        @click="handleDelete"
        class="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-500 transition duration-200"
      >
        Delete Account
      </button>
    </div>

    <div v-if="message" class="mt-4 text-green-600">{{ message }}</div>
    <div v-if="error" class="mt-4 text-red-600">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Define the response type
interface UserResponse {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
  };
}

interface UpdateResponse {
  message: string;
}

interface DeleteResponse {
  message: string;
}

const name = ref("");
const email = ref("");
const message = ref("");
const error = ref("");

// Fetch user data on component mount
const fetchUserData = async () => {
  const response = await $fetch<UserResponse>("/api/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.user) {
    name.value = response.user.name;
    email.value = response.user.email;
  }
};

// Call fetchUserData on mount
fetchUserData();

const handleUpdate = async () => {
  try {
    const response = await $fetch<UpdateResponse>("/api/auth/update-user", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: {
        name: name.value,
        email: email.value,
      },
    });
    message.value = response.message;
    error.value = ""; // Clear error message
  } catch (err) {
    error.value = "Failed to update user.";
    message.value = ""; // Clear success message
  }
};

const handleDelete = async () => {
  if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
    try {
      const response = await $fetch<DeleteResponse>("/api/auth/delete-user", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert(response.message);
      // Optionally, redirect the user to the login page or home page after deletion
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirect to login page
    } catch (err) {
      error.value = "Failed to delete account.";
    }
  }
};
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
