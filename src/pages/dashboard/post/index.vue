<template>
  <div class="max-w-6xl mx-auto py-6">
    <h1 class="text-3xl font-bold mb-4">Manage Blogs</h1>

    <Button label="Refresh Blogs" icon="pi pi-refresh" class="mb-4" @click="fetchBlogs" />

    <DataTable :value="blogs" class="mt-6 shadow-md rounded-lg">
      <Column field="title" header="Title"></Column>
      <Column field="slug" header="Slug"></Column>
      <Column field="published" header="Published">
        <template #body="{ data }">
          <span :class="data.published ? 'text-green-600' : 'text-red-600'">
            {{ data.published ? "Yes" : "No" }}
          </span>
        </template>
      </Column>
      <Column header="Actions">
        <template #body="{ data }">
          <Button 
            icon="pi pi-pencil" 
            class="p-button-text p-button-sm text-blue-500" 
            @click="editBlog(data)" 
          >Edit</Button>
          <Button 
            icon="pi pi-trash" 
            class="p-button-text p-button-sm text-red-500" 
            @click="deleteBlog(data.id)" 
          ></Button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: string;
}

const blogs = ref<Blog[]>([]);
const router = useRouter();

const fetchBlogs = async () => {
  try {
    const response = await fetch('/api/post/getAll');
    const data = await response.json();

    if (data.success) {
      blogs.value = data.posts;
    } else {
      console.error('Failed to fetch blogs:', data.error);
    }
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
};

const editBlog = (blog: Blog) => {
  router.push(`/dashboard/post/edit/${blog.id}`);
};

const deleteBlog = async (id: string) => {
  if (!confirm('Are you sure you want to delete this blog?')) return;

  try {
    const response = await fetch(`/api/post/delete/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (data.success) {
      blogs.value = blogs.value.filter(blog => blog.id !== id);
    } else {
      console.error('Failed to delete blog:', data.error);
    }
  } catch (error) {
    console.error('Error deleting blog:', error);
  }
};

onMounted(() => {
  fetchBlogs();
});

definePageMeta({
  layout: "dashboard",
});
</script>
