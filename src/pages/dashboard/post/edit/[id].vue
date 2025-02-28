<template>
    <div class="max-w-4xl mx-auto py-6">
      <h1 class="text-3xl font-bold mb-4">Edit Blog</h1>
  
      <a-form
        layout="vertical"
        :model="blog"
        :rules="rules"
        ref="formRef"
        @finish="updateBlog"
      >
        <a-form-item label="Title" name="title">
          <a-input v-model:value="blog.title" />
        </a-form-item>
  
        <a-form-item label="Slug" name="slug">
          <a-input v-model:value="blog.slug" />
        </a-form-item>
  
        <a-form-item label="Content" name="content">
          <a-textarea v-model:value="blog.content" :rows="5" />
        </a-form-item>
  
        <a-form-item>
          <a-checkbox v-model:checked="blog.published">Published</a-checkbox>
        </a-form-item>
  
        <a-form-item>
          <a-button type="primary" html-type="submit" :loading="loading">
            Update Blog
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { message } from 'ant-design-vue';
  
  const route = useRoute();
  const router = useRouter();
  const formRef = ref();
  const loading = ref(false);
  
  const blog = ref({ id: '', title: '', slug: '', content: '', published: false });
  
  // ✅ Validation Rules
  const rules = {
    title: [{ required: true, message: 'Title is required', trigger: 'blur' }],
    slug: [{ required: true, message: 'Slug is required', trigger: 'blur' }],
    content: [{ required: true, message: 'Content is required', trigger: 'blur' }],
  };
  
  const fetchBlog = async () => {
    const blogId = route.params.id;
    if (!blogId) {
      message.error('No blog ID found');
      return;
    }
  
    try {
      const response = await fetch(`/api/post/get/${blogId}`);
      const data = await response.json();
  
      if (data.success) {
        blog.value = data.post;
      } else {
        message.error('Failed to fetch blog: ' + data.error);
      }
    } catch (error) {
      message.error('Error fetching blog: ' + error);
    }
  };
  
  const updateBlog = async () => {
    try {
      loading.value = true;
      const response = await fetch(`/api/post/update/${blog.value.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blog.value),
      });
  
      const data = await response.json();
      if (data.success) {
        message.success('Blog updated successfully!');
        router.push('/dashboard/blog');
      } else {
        message.error('Failed to update blog: ' + data.error);
      }
    } catch (error) {
      message.error('Error updating blog: ' + error);
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(fetchBlog);
  </script>
  