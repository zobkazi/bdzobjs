<template>
  <div>
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <div class="spinner-border animate-spin text-blue-500" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    
    <PostList v-else />
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import PostList from '@/components/post/PostList.vue';

export default {
  components: {
    PostList,
  },
  setup() {
    const loading = ref(true);

    onMounted(() => {
      // Simulate loading data or fetching
      setTimeout(() => {
        loading.value = false;
      }, 2000); // Adjust timeout as necessary
    });

    return {
      loading,
    };
  },
};
</script>

<style scoped>
.spinner-border {
  width: 3rem;
  height: 3rem;
  border-width: 0.25em;
}
</style>
