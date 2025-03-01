<template>
  <header class="bg-gray-800 text-white py-4">
    <div class="container mx-auto flex justify-between px-4">
      <h2 class="text-2xl font-bold">My Nuxt App</h2>
      <nav>
        <ul class="flex space-x-4">
          <li><NuxtLink to="/" class="hover:text-gray-300">Home</NuxtLink></li>
          <li><NuxtLink to="/post" class="hover:text-gray-300">Blogs </NuxtLink></li>
          <li><NuxtLink to="/about" class="hover:text-gray-300">About</NuxtLink></li>
          <li><NuxtLink to="/contact" class="hover:text-gray-300">Contact</NuxtLink></li>
          <li><NuxtLink to="/auth/login" class="hover:text-gray-300">Login</NuxtLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>
