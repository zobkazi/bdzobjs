<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Button from 'primevue/button';
import Card from 'primevue/card';

const route = useRoute();
const router = useRouter();

const posts = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const nextPage = ref(null);
const prevPage = ref(null);

const fetchPosts = async (page = 1) => {
  try {
    const { data } = await axios.get(`/api/post/getAll?page=${page}&limit=5`);
    if (data.success) {
      posts.value = data.posts;
      currentPage.value = data.currentPage;
      totalPages.value = data.totalPages;
      nextPage.value = data.nextPage;
      prevPage.value = data.prevPage;
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

onMounted(() => {
  fetchPosts(route.query.page ? parseInt(route.query.page) : 1);
});

const changePage = (page) => {
  router.push({ query: { page } });
  fetchPosts(page);
};
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-bold text-center mb-6">Blog Posts</h1>
    
    <div v-if="posts.length" class="space-y-4">
      <Card v-for="post in posts" :key="post.id" class="p-4 shadow-lg rounded-xl">
        <template #title>
       
          <NuxtLink :to="{name: 'post-slug', params: { slug: post.slug }}" class="text-lg font-bold text-blu">
            {{ post.title }}
          </NuxtLink>

          
        </template>
       
      </Card>
    </div>
    
    <div v-else class="text-center text-gray-500">No posts found.</div>
    
    <div class="flex justify-between mt-6">
      <Button v-if="prevPage" @click="changePage(currentPage - 1)" class="bg-blue-500 text-white px-4 py-2 rounded">Previous</Button>
      <span class="px-4 py-2">Page {{ currentPage }} of {{ totalPages }}</span>
      <Button v-if="nextPage" @click="changePage(currentPage + 1)" class="bg-blue-500 text-white px-4 py-2 rounded">Next</Button>
    </div>
  </div>
</template>