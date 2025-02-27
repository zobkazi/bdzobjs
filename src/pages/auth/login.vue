<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
    <a-card class="w-full max-w-lg p-6 rounded-lg shadow-lg bg-white">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <a-form-item  validate-status="error" :help="emailError">
          <a-input v-model:value="email" placeholder="Enter your email" @blur="validateEmail" />
        </a-form-item>

        <a-form-item validate-status="error" :help="passwordError">
          <a-input-password v-model:value="password" placeholder="Enter your password" @blur="validatePassword" />
        </a-form-item>

        <a-button type="primary" html-type="submit" class="w-full" :loading="loading">
          Login
        </a-button>
      </form>

      <div class="text-center mt-4">
        <a class="text-blue-600 hover:underline" @click="redirectToForgotPassword">Forgot Password?</a>
      </div>

      <p class="text-center text-gray-600 mt-4">
        Don't have an account?
        <a class="text-blue-600 hover:underline" @click="redirectToSignup">Sign up here</a>
      </p>
    </a-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { notification } from "ant-design-vue";
import { useRouter } from "vue-router"; // Nuxt 3 router

const router = useRouter();
const email = ref("");
const password = ref("");
const emailError = ref("");
const passwordError = ref("");
const loading = ref(false);

const validateEmail = () => {
  emailError.value = /\S+@\S+\.\S+/.test(email.value) ? "" : "Invalid email format.";
};

const validatePassword = () => {
  passwordError.value = password.value.length >= 6 ? "" : "Password must be at least 6 characters.";
};

const handleLogin = async () => {
  validateEmail();
  validatePassword();

  if (emailError.value || passwordError.value) {
    return; // Prevent submission if validation fails
  }

  loading.value = true;

  try {
    const response = await $fetch("/api/auth/login", {
      method: "POST",
      body: { email: email.value, password: password.value },
    });

    localStorage.setItem("token", response.token); // Save token
    notification.success({
      message: "Login Successful",
      description: "Redirecting to dashboard...",
    });

    setTimeout(() => {
      router.push("/dashboard"); // Redirect after login
    }, 2000);
  } catch (error) {
    notification.error({
      message: "Login Failed",
      description: error.message,
    });
  } finally {
    loading.value = false;
  }
};

const redirectToSignup = () => {
  router.push("/auth/signup");
};

const redirectToForgotPassword = () => {
  router.push("/auth/forgot-password");
};
</script>

<style scoped>
/* Optional custom styling if needed */
</style>
