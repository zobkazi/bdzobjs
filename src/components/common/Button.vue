<template>
    <button class="btn">
      <slot />
    </button>
  </template>
  
  <style scoped lang="scss">
  .btn {
    background-color: #3490dc;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: bold;
    transition: background-color 0.3s;
  
    &:hover {
      background-color: #2779bd;
    }
  }
  </style>
  