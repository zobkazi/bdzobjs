<template>
    <div class="max-w-4xl mx-auto py-6">
      <h1 class="text-3xl font-bold mb-4">Posts</h1>
      <a-button type="primary" @click="fetchPosts">Refresh Posts</a-button>
  
      <div v-if="posts.length" class="mt-4 grid grid-cols-1 gap-4">
        <template v-for="post in posts" :key="post.id">
          <a-card>
            <a-card-meta>
              <template #title>
                <router-link :to="`/post/${post.slug}`">{{ post.title }}</router-link>
              </template>
              <template #description>
                {{ post.excerpt || post.content || "No description available." }}
              </template>
            </a-card-meta>
          </a-card>
        </template>
      </div>
  
      <div v-else class="text-center text-gray-500 mt-6">
        No posts available.
      </div>
  
      <div class="mt-6">
        <pagination
          v-if="pagination.totalPages > 1"
          :current="pagination.currentPage"
          :total="pagination.totalPosts"
          :page-size="limit"
          @change="handlePageChange"
        />
      </div>
    </div>
  </template>
  

  <script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  createdAt: string;
  updatedAt: string;
}

const posts = ref<Post[]>([]);
const pagination = ref({
  currentPage: 1,
  totalPages: 0,
  totalPosts: 0,
});
const limit = 10;

const fetchPosts = async (page = 1) => {
  try {
    const response = await fetch(`/api/post/getAll?page=${page}&limit=${limit}`);
    const data = await response.json();

    if (data.success) {
      posts.value = data.posts; // ✅ Correctly update posts
      pagination.value = {
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalPosts: data.totalPosts,
      };
    } else {
      console.error("Failed to fetch posts:", data.error);
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

// Fetch posts on mount
onMounted(() => {
  fetchPosts();
});

const handlePageChange = (page: number) => {
  fetchPosts(page);
};

</script>