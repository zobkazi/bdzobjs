export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client) {
      const token = localStorage.getItem("token");
      if (!token) {
        return navigateTo("/auth/login");
      }
    }
  });
  