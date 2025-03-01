
<template>
  <div class="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <div v-if="post">
      <!-- Title and Published Date -->
      <h1 class="text-4xl font-bold text-center sm:text-left mb-4">{{ post.title }}</h1>
    
      <p class="text-gray-600 mb-4">Published on {{ new Date(post.createdAt).toLocaleDateString() }}</p>

      <hr  class="w-2 bg-black"/>

      <Image :src="post.ThumbnailUrl" alt="Thumbnail Image" />
      <!-- Content (using prose for rich text formatting) -->
      <div class="">
        <p class="prose" v-html="post.content" />
        
      </div>
      <!-- Back Link -->
      <router-link to="/" class="mt-6 inline-block text-blue-500 hover:underline">
        Back to Posts
      </router-link>
    </div>
    <div v-else class="text-center text-gray-500">Loading...</div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import Divider from 'primevue/divider';
import Image from 'primevue/image'; 


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



// seo metadata
const title = ref(post.value ? post.value.slug : 'Loading...');


const updateSeoMeta = () => {
  if (post.value) {
    title.value = post.value.title; // Set the post title when data is available
  
    useSeoMeta({
      title: title.value
    });
  }
};

onMounted(() => {
  fetchPost();
  updateSeoMeta();

});

</script>
