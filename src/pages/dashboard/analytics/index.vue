<template>
    <div class="p-6 bg-gray-100 min-h-screen">
      <h1 class="text-4xl font-bold text-green-500 mb-6">Analytics Overview</h1>
      
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
        
        <!-- Total Users Card -->
        <Card class="p-4">
          <template #content>
            <div class="text-center">
              <h2 class="text-2xl font-semibold text-gray-700">Total Users</h2>
              <p class="text-3xl font-bold text-purple-600">{{ totalUsers }}</p>
            </div>
          </template>
        </Card>
      </div>
  
      <!-- Chart Section -->
      <div class="mt-6 bg-white p-6 rounded-xl shadow-md">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Posts & Users Overview</h2>
        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]" />
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import Card from 'primevue/card';
  import Chart from 'primevue/chart';
  
  const totalPosts = ref(0);
  const totalUsers = ref(0);
  const chartData = ref();
  const chartOptions = ref();
  
  const fetchAnalytics = async () => {
    try {
      const postsRes = await axios.get('/api/post/getAll?page=1&limit=100');
      totalPosts.value = postsRes.data.totalPosts;
      
      const usersRes = await axios.get('/api/users');
      totalUsers.value = usersRes.data.totalUsers;
      
      setChartData();
      setChartOptions();
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };
  
  const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);
  
    chartData.value = {
      labels: ['Posts', 'Users'],
      datasets: [
        {
          label: 'Total Count',
          backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
          borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
          data: [totalPosts.value, totalUsers.value]
        }
      ]
    };
  };
  
  const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');
  
    chartOptions.value = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  };
  
  onMounted(fetchAnalytics);

definePageMeta({ layout: "dashboard", middleware: "auth", });

  </script>
  
  <style scoped>
  </style>
  