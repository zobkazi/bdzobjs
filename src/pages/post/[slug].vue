<template>
    <div class="max-w-4xl mx-auto py-6">
      <div v-if="post">
        <h1 class="text-4xl font-bold mb-4">{{ post.title }}</h1>
        <p class="text-gray-600 mb-4">Published on {{ new Date(post.createdAt).toLocaleDateString() }}</p>
        <div class="prose">
          <p>{{ post.content }}</p>
        </div>
        <router-link to="/" class="mt-6 text-blue-500">Back to Posts</router-link>
      </div>
      <div v-else class="text-center">Loading...</div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default defineComponent({
    setup() {
      const post = ref(null);
      const route = useRoute();
  
      const fetchPost = async () => {
        const response = await fetch(`/api/post/getBySlug?slug=${route.params.slug}`);
        const data = await response.json();
        if (data.success) {
          post.value = data.post;
        }
      };
  
      onMounted(() => {
        fetchPost();
      });
  
      return {
        post,
      };
    },
  });
  </script>
  
  <style scoped>
 
  </style>
  