<template>
    <div class="max-w-4xl mx-auto p-6 rounded-lg shadow-md">
      <div class="text-center">
        <h1 class="text-3xl font-bold ">About the Author</h1>
        <p class="text-lg  mt-4">Meet Zobaidul Kazi, a passionate Full Stack Developer from Bangladesh.</p>
      </div>
  
      <div class="flex flex-col md:flex-row items-center mt-6">
        <img
          src="https://avatars.githubusercontent.com/u/105772384?v=4" 
          alt="Zobaidul Kazi"
          class="rounded-full w-40 h-40 object-cover mx-auto md:mr-8"
        />
        <div class="mt-4 md:mt-0">
          <p class="">
            Zobaidul Kazi is a dedicated Full Stack Developer with a strong background in creating scalable and efficient web applications. Based in Bangladesh, Zobaidul specializes in frontend and backend development and is passionate about building comprehensive digital solutions.
          </p>
          <p class=" mt-4">
            Zobaidul believes in writing clean, maintainable code and strives to incorporate best practices in every project. Whether it's creating intuitive user interfaces or developing robust backend systems, Zobaidul brings both technical skills and creative vision to the table.
          </p>
          <p class=" mt-4">
            In addition to work, Zobaidul enjoys exploring new technologies and contributing to open-source projects.
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: {
      type: String,
      default: 'About the Author',
    },
  });
  </script>
  
  <style scoped>
  /* Add any custom styling here if needed */
  </style>
  