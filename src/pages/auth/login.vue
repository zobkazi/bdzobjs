<!-- <template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
    <h2 class="text-2xl font-bold mb-4">Login</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" class="input" required />
      <input v-model="password" type="password" placeholder="Password" class="input" required />
      <button type="submit" class="btn">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    const response = await $fetch("/api/auth/login", {
      method: "POST",
      body: { email: email.value, password: password.value },
    });
    localStorage.setItem("token", response.token); // Save token
    alert("Login successful!");
  } catch (error) {
    alert(error.message);
  }
};
</script> -->
