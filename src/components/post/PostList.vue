<template>
  <div class="max-w-4xl mx-auto py-6">
    <h1 class="text-3xl font-bold mb-4">Posts</h1>
    <Button label="Refresh Posts" icon="pi pi-refresh" @click="fetchPosts" class="mb-4" />

    <div v-if="posts.length" class="mt-4 grid grid-cols-1 gap-4">
      <template v-for="post in posts" :key="post.id">
        <Card>
          <CardHeader>
            <router-link :to="`/post/${post.slug}`" class="text-xl font-semibold">
    ```typescript
// Add a loading state to handle asynchronous data fetching
const isLoading = ref(false);

// Update the fetchPosts function to handle loading state
const fetchPosts = async (page = 1) => {
  isLoading.value = true;
  try {
    const response = await fetch(`/api/post/getAll?page=${page}&limit=${limit}`);
    const data = await response.json();

    if (data.success) {
      posts.value = data.posts;
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
  } finally {
    isLoading.value = false;
  }
};

// Add a loading indicator to the template
<template>
  <div class="max-w-4xl mx-auto py-6">
    <h1 class="text-3xl font-bold mb-4">Posts</h1>
    <Button label="Refresh Posts" icon="pi pi-refresh" @click="fetchPosts" class="mb-4" />

    <div v-if="isLoading" class="text-center text-gray-500 mt-6">
      Loading posts...
    </div>

    <div v-else-if="posts.length" class="mt-4 grid grid-cols-1 gap-4">
      <template v-for="post in posts" :key="post.id">
        <Card>
          <CardHeader>
            <router-link :to="`/post/${post.slug}`" class="text-xl font-semibold">
              {{ post.title }}
            </router-link>
          </CardHeader>
          <CardContent>
            <p>{{ post.excerpt || post.content || "No description available." }}</p>
          </CardContent>
        </Card>
      </template>
    </div>

    <div v-else class="text-center text-gray-500 mt-6">
      No posts available.
    </div>

    <div class="mt-6">
      <Pagination
        v-if="pagination.totalPages > 1"
        :current="pagination.currentPage"
        :total="pagination.totalPosts"
        :page-size="limit"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>
```          {{ post.title }}
            </router-link>
          </CardHeader>
          <CardContent>
            <p>{{ post.excerpt || post.content || "No description available." }}</p>
          </CardContent>
        </Card>
      </template>
    </div>

    <div v-else class="text-center text-gray-500 mt-6">
      No posts available.
    </div>

    <div class="mt-6">
      <Pagination
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
  excerpt: string | null; // Add this line
  published: boolean; // Add this line if you need it
  authorId: string; // Add this line if you need it
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
      console.log("Fetched posts:", posts.value); // Add this line
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

<style scoped>
/* Add any additional styles here if needed */
</style>