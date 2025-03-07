<template>
    <About />
  </template>
  
  <script setup>
  import About from '../components/home/About.vue';
  
  definePageMeta({
    title: 'About Zobaidul Kazi - Full Stack Developer in Bangladesh',
    meta: [
      {
        name: 'description',
        content: 'Zobaidul Kazi is a Full Stack Developer from Bangladesh, specializing in creating scalable and efficient web applications. Learn more about his journey and work.',
      },
      {
        name: 'keywords',
        content: 'Zobaidul Kazi, Full Stack Developer, Bangladesh, Web Development, Frontend, Backend, Blog, Technology, Open Source',
      },
      {
        name: 'author',
        content: 'Zobaidul Kazi',
      },
      {
        property: 'og:title',
        content: 'About Zobaidul Kazi - Full Stack Developer',
      },
      {
        property: 'og:description',
        content: 'Learn about Zobaidul Kazi, a passionate Full Stack Developer from Bangladesh. Discover his journey in web development and technology.',
      },
      {
        property: 'og:image',
        content: 'https://placekitten.com/200/200', 
      },
      {
        property: 'og:url',
        content: 'https://www.yourblog.com/about',
      },
      {
        name: 'twitter:title',
        content: 'About Zobaidul Kazi - Full Stack Developer',
      },
      {
        name: 'twitter:description',
        content: 'Zobaidul Kazi is a Full Stack Developer from Bangladesh. Explore his work and experience in web development.',
      },
      {
        name: 'twitter:image',
        content: 'https://placekitten.com/200/200',
      },
    ],
  });
  </script>
  