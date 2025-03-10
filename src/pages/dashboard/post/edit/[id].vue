<template>
  <div class="max-w-4xl mx-auto py-6">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Edit Blog</h1>

    <form @submit.prevent="updateBlog" class="space-y-4 bg-white p-6 shadow-md rounded-lg">
      <!-- Title Field -->
      <div>
        <label class="block text-gray-700 font-medium mb-1">Title</label>
        <InputText 
          v-model="blog.title" 
          class="w-full p-2 border border-gray-300 rounded-md" 
          :class="{'border-red-500': !titleValid}"
          placeholder="Enter blog title"
        />
        <p v-if="!titleValid" class="text-red-500 text-sm mt-1">Title must be at least 3 characters long</p>
      </div>

      <!-- Slug Field -->
      <div>
        <label class="block text-gray-700 font-medium mb-1">Slug</label>
        <InputText 
          v-model="blog.slug" 
          class="w-full p-2 border border-gray-300 rounded-md" 
          :class="{'border-red-500': !slugValid}"
          placeholder="Enter blog slug"
        />
        <p v-if="!slugValid" class="text-red-500 text-sm mt-1">Slug must be at least 3 characters long</p>
      </div>

      <!-- Content Field -->
      <div>
        <label class="block text-gray-700 font-medium mb-1">Content</label>

        <Editor
        v-model="blog.content" 
       api-key="process.env.VUE_APP_TINYMCE_API_KEY"
      :init="{
        toolbar_mode: 'sliding',
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
      }"
      initial-value="Welcome to TinyMCE!"
    />
        
        <p v-if="!contentValid" class="text-red-500 text-sm mt-1">Content must be at least 10 characters long</p>
      </div>

      <!-- Published Field -->
      <div class="flex items-center gap-2">
        <Checkbox v-model="blog.published" binary />
        <label class="text-gray-700">Published</label>
      </div>

      <!-- Submit Button -->
      <Button 
        type="submit" 
        label="Update Blog" 
        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md"
      />
    </form>
    <Toast />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Editor from '@tinymce/tinymce-vue'
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import Toast from "primevue/toast";

// Router and Toast
const router = useRouter();
const toast = useToast();

// Get token from localStorage only in the client-side
const token = ref(null);

if (typeof window !== 'undefined') {
  token.value = localStorage.getItem("token");
}

const blog = ref({
  id: '',
  title: '',
  slug: '',
  content: '',
  published: false,
});

const titleValid = ref(true);
const slugValid = ref(true);
const contentValid = ref(true);

// Fetch blog data by ID
const fetchBlog = async () => {
  const blogId = router.currentRoute.value.params.id;
  if (!blogId) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'No blog ID found', life: 3000 });
    return;
  }

  try {
    const response = await fetch(`/api/post/get/${blogId}`);
    const data = await response.json();

    if (data.success) {
      blog.value = data.post;
    } else {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch blog: ' + data.error, life: 3000 });
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Error fetching blog: ' + error, life: 3000 });
  }
};

// Validate form fields
const validateForm = () => {
  titleValid.value = blog.value.title.length >= 3;
  slugValid.value = blog.value.slug.length >= 3;
  contentValid.value = blog.value.content.length >= 10;
  return titleValid.value && slugValid.value && contentValid.value;
};

// Handle form submission
const updateBlog = async () => {
  if (!validateForm()) return;

  if (!token.value) {
    toast.add({ severity: 'error', summary: 'Unauthorized', detail: 'Please log in to update a post.', life: 3000 });
    return;
  }

  try {
    const response = await fetch(`/api/post/edit/${blog.value.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify(blog.value),
    });

    const data = await response.json();

    if (response.ok) {
      toast.add({ severity: 'success', summary: 'Success', detail: 'Blog updated successfully!', life: 3000 });
      router.push('/dashboard/post');
    } else {
      toast.add({ severity: 'error', summary: 'Error', detail: data.error || 'Failed to update blog', life: 3000 });
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Network error while updating blog', life: 3000 });
  }
};

// Fetch blog data when the component is mounted
onMounted(fetchBlog);
</script>

<style scoped>
/* Add any scoped styles here */
</style>