<template>
  <div class="max-w-full sm:max-w-6xl mx-auto py-6 px-4">
    <h1 class="text-3xl font-bold mb-4 text-center sm:text-left">Manage Blogs</h1>

    <Button label="Refresh Blogs" icon="pi pi-refresh" class="mb-4 w-full sm:w-auto" @click="fetchBlogs" />

    <DataTable :value="blogs" class="mt-6 shadow-md rounded-lg" :responsiveLayout="'scroll'">
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
        <template class="p-4 m-6" #body="{ data }">
          <Button 
            icon="pi pi-pencil" 
            class="p-button-text p-button-sm text-blue-500 mb-2 sm:mb-0" 
            @click="editBlog(data)" 
          >Edit</Button>
          <Button 
            icon="pi pi-trash" 
            class="p-button-text p-button-sm text-red-500" 
            @click="deleteBlog(data.id)" 
          >Delete</Button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

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
const toast = useToast();

const fetchBlogs = async () => {
  try {
    const response = await fetch('/api/post/getAll');
    const data = await response.json();

    if (data.success) {
      blogs.value = data.posts;
    } else {
      toast.add({ severity: 'error', summary: 'Failed to Fetch Blogs', detail: data.error, life: 3000 });
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch blogs', life: 3000 });
  }
};

const editBlog = (blog: Blog) => {
  router.push(`/dashboard/post/edit/${blog.id}`);
};

const deleteBlog = async (id: string) => {
  if (!confirm('Are you sure you want to delete this blog?')) return;

  console.log("delete post: id +++> ", id)

  try {
    const response = await fetch(`/api/post/delete/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (data.success) {
      blogs.value = blogs.value.filter(blog => blog.id !== id);
      toast.add({ severity: 'success', summary: 'Blog Deleted', detail: 'The blog has been deleted successfully.', life: 3000 });
    } else {
      toast.add({ severity: 'error', summary: 'Failed to Delete Blog', detail: data.error || 'Unknown error occurred', life: 3000 });
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Error deleting blog', life: 3000 });
  }
};

onMounted(() => {
  fetchBlogs();
});

definePageMeta({
  layout: "dashboard",
});
</script>

<style scoped>
/* Add any additional scoped styles here for responsiveness */
</style>
