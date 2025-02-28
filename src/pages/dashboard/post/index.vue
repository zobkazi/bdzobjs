<template>
    <div class="max-w-6xl mx-auto py-6">
      <h1 class="text-3xl font-bold mb-4">Manage Blogs</h1>
  
      <a-button type="primary" @click="fetchBlogs">Refresh Blogs</a-button>
  
      <a-table
        class="mt-6"
        :data-source="blogs"
        :columns="columns"
        row-key="id"
        bordered
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'actions'">
            <a-button type="link" @click="editBlog(record)">Edit</a-button>
            <a-button type="link" danger @click="deleteBlog(record.id)">Delete</a-button>
          </template>
        </template>
      </a-table>
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
    router.push(`/dashboard/blog/edit/${blog.id}`);
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
  
  // Table columns
  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Slug', dataIndex: 'slug', key: 'slug' },
    { title: 'Published', dataIndex: 'published', key: 'published'},
    { title: 'Actions', key: 'actions' },
  ];

  definePageMeta({
  layout: "dashboard",
});
  </script>
  