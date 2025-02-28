<template>
  <div class="max-w-4xl mx-auto py-6">
    <div v-if="post">
      <h1 class="text-4xl font-bold mb-4">{{ post.title }}</h1>
      <p class="text-gray-600 mb-4">Published on {{ new Date(post.createdAt).toLocaleDateString() }}</p>
      <div class="prose" v-html="post.content"></div> <!-- Use v-html to render HTML content -->
      <router-link to="/" class="mt-6 text-blue-500">Back to Posts</router-link>
    </div>
    <div v-else class="text-center">Loading...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';


const post = ref(null);
const route = useRoute();

const fetchPost = async () => {
  try {
    const response = await fetch(`/api/post/getBySlug?slug=${route.params.slug}`);
    const data = await response.json();
    if (data.success) {
      post.value = data.post;
    } else {
      console.error('Post not found');
    }
  } catch (error) {
    console.error('Error fetching post:', error);
  }
};

onMounted(() => {
  fetchPost();
});
</script>

<style scoped>
/* Add any scoped styles here */
</style>