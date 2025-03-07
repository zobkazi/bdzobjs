<template>
  <div>
    <Hero />
    <PostList />
    <Analytics />
    
  </div>
</template>

<script lang="ts">
import PostList from '@/components/post/PostList.vue';
import Hero from '@/components/home/Hero.vue';
import { Analytics } from '@vercel/analytics/nuxt'
export default {
  components: {
    PostList,
    Hero
  },
};
</script>
