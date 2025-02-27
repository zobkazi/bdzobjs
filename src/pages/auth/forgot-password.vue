<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <a-card class="w-full max-w-lg p-6 rounded-lg shadow-lg bg-white">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Forgot Password</h2>
        <p class="text-gray-600 text-center mb-4">
          Enter your email, and we'll send you a link to reset your password.
        </p>
  
        <form @submit.prevent="handleForgotPassword" class="space-y-4">
          <a-form-item label="Email" validate-status="error" :help="emailError">
            <a-input v-model:value="email" placeholder="Enter your email" @blur="validateEmail" />
          </a-form-item>
  
          <a-button type="primary" html-type="submit" class="w-full" :loading="loading">
            Send Reset Link
          </a-button>
        </form>
  
        <div class="text-center mt-4">
          <a class="text-blue-600 hover:underline" @click="redirectToLogin">Back to Login</a>
        </div>
      </a-card>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { notification } from "ant-design-vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  const email = ref("");
  const emailError = ref("");
  const loading = ref(false);
  
  const validateEmail = () => {
    emailError.value = /\S+@\S+\.\S+/.test(email.value) ? "" : "Invalid email format.";
  };
  
  const handleForgotPassword = async () => {
    validateEmail();
    if (emailError.value) return;
  
    loading.value = true;
  
    try {
      await $fetch("/api/auth/forgot-password", {
        method: "POST",
        body: { email: email.value },
      });
  
      notification.success({
        message: "Reset Link Sent",
        description: "Check your email for the password reset link.",
      });
  
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message,
      });
    } finally {
      loading.value = false;
    }
  };
  
  const redirectToLogin = () => {
    router.push("/login");
  };
  </script>
  
  <style scoped>
  /* Optional custom styles */
  </style>
  