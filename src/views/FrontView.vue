<script setup>
import FrontNavbar from '@/components/FrontNavbar.vue';
import { useLoaderStore } from '@/stores/useLoaderStore.js';
const loaderStore = useLoaderStore();
</script>

<template>
  <Loading :active="loaderStore.isLoading"></Loading>
  <FrontNavbar />
  <div class="page">
    <RouterView />
  </div>
</template>

<style></style>
