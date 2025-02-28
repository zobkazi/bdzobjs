<template>
    <Menu :model="items" class="w-full shadow-md rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <!-- Submenu Label Template -->
      <template #submenulabel="{ item }">
        <div class="flex items-center py-2 px-3 text-blue-600 dark:text-blue-400 font-medium">
          <span v-if="item.icon" :class="[item.icon, 'mr-2']"></span>
          <span>{{ item.label }}</span>
        </div>
      </template>
      
      <!-- Menu Item Template -->
      <template #item="{ item, props }">
        <router-link v-if="item.to" 
                     v-ripple 
                     :to="item.to" 
                     custom 
                     v-slot="{ navigate, isActive }">
          <a @click="navigate" 
             :class="['flex items-center py-2 px-3 rounded-md transition-colors duration-200', 
                     isActive ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 
                     'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800']"
             v-bind="props.action">
            <span v-if="item.icon" :class="[item.icon, 'mr-2', isActive ? 'text-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400']"></span>
            <span>{{ item.label }}</span>
            <Badge v-if="item.badge" 
                  class="ml-auto bg-blue-500 text-white px-2 py-1 text-xs rounded-full" 
                  :value="item.badge" />
            <span v-if="item.shortcut" 
                  class="ml-auto text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded">
              {{ item.shortcut }}
            </span>
          </a>
        </router-link>
        
        <a v-else-if="item.url" 
           v-ripple 
           :href="item.url" 
           :target="item.target || '_self'"
           class="flex items-center py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200" 
           v-bind="props.action">
          <span v-if="item.icon" :class="[item.icon, 'mr-2 text-gray-500 dark:text-gray-400']"></span>
          <span>{{ item.label }}</span>
          <i v-if="item.target === '_blank'" class="pi pi-external-link ml-2 text-xs text-gray-400"></i>
          <Badge v-if="item.badge" 
                 class="ml-auto bg-blue-500 text-white px-2 py-1 text-xs rounded-full" 
                 :value="item.badge" />
          <span v-if="item.shortcut" 
                class="ml-auto text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded">
            {{ item.shortcut }}
          </span>
        </a>
        
        <a v-else 
           v-ripple 
           class="flex items-center py-2 px-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200" 
           v-bind="props.action"
           @click="item.command ? item.command() : undefined">
          <span v-if="item.icon" :class="[item.icon, 'mr-2 text-gray-500 dark:text-gray-400']"></span>
          <span>{{ item.label }}</span>
          <Badge v-if="item.badge" 
                 class="ml-auto bg-blue-500 text-white px-2 py-1 text-xs rounded-full" 
                 :value="item.badge" />
          <span v-if="item.shortcut" 
                class="ml-auto text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded">
            {{ item.shortcut }}
          </span>
        </a>
      </template>
    </Menu>
  </template>
  
  <script setup>
  defineProps({
    items: {
      type: Array,
      required: true
    }
  });
  </script>
  
  <style scoped>
  :deep(.p-menu) {
    border: none;
    background: transparent;
    width: 100%;
  }
  
  :deep(.p-menuitem-separator) {
    margin: 0.5rem 0;
    border-top: 1px solid rgb(229 231 235 / 1);
  }
  
  .dark :deep(.p-menuitem-separator) {
    border-top-color: rgb(55 65 81 / 1);
  }
  
  /* Active route styling */
  :deep(.router-link-active) {
    background-color: rgb(239 246 255 / 1) !important;
    color: rgb(37 99 235 / 1) !important;
  }
  
  .dark :deep(.router-link-active) {
    background-color: rgba(30, 58, 138, 0.3) !important;
    color: rgb(96 165 250 / 1) !important;
  }
  </style>