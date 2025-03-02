<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-4xl font-bold text-green-500 mb-6">Dashboard Home</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Total Posts Card -->
      <Card class="p-4">
        <template #content>
          <div class="text-center">
            <h2 class="text-2xl font-semibold text-gray-700">Total Posts</h2>
            <p class="text-3xl font-bold text-blue-600">{{ totalPosts }}</p>
          </div>
        </template>
      </Card>
      
      <!-- Chart Section -->
      <Card class="p-4">
        <template #content>
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Posts Overview</h2>
          <canvas ref="chartCanvas"></canvas>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import Card from 'primevue/card';

Chart.register(...registerables);

const totalPosts = ref(0);
const chartCanvas = ref<HTMLCanvasElement | null>(null);

const fetchPosts = async () => {
  try {
    const { data } = await axios.get('/api/post/getAll?page=1&limit=100');
    
    if (!data.success) {
      throw new Error(data.error || "Failed to fetch posts");
    }

    totalPosts.value = data.totalPosts;

    if (chartCanvas.value) {
      new Chart(chartCanvas.value, {
        type: 'bar',
        data: {
          labels: ['Total Posts'],
          datasets: [{
            label: 'Posts',
            data: [totalPosts.value],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          }],
        },
      });
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};


onMounted(fetchPosts);

definePageMeta({ layout: "dashboard", middleware: "auth", });

</script>

<style scoped>
</style>
