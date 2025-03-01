<template>
  <div>
    <Hero />
    <PostList />
    
  </div>
</template>

<script lang="ts">
import PostList from '@/components/post/PostList.vue';
import Hero from '@/components/home/Hero.vue';

export default {
  components: {
    PostList,
    Hero
  },
};
</script>
