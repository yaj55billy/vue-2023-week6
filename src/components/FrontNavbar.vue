<script setup>
import { useCartStore } from '@/stores/useCartStore.js';
import { onMounted } from 'vue';
const cartStore = useCartStore();

onMounted(() => {
  cartStore.getCart();
});
</script>
<template>
  <nav class="navbar bg-primary navbar-expand-lg fixed-top shadow px-4">
    <RouterLink to="/" class="navbar-brand logo"> 身心靈轉化研究室 </RouterLink>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
      <div class="navbar-nav">
        <RouterLink to="/products" class="nav-item nav-link"> 課程列表 </RouterLink>
        <RouterLink to="/cart" class="nav-item nav-link">
          購物車
          <span class="badge text-bg-secondary">{{ cartStore.cartsLength }}</span>
        </RouterLink>
        <RouterLink to="/login" class="nav-item nav-link">登入頁</RouterLink>
        <RouterLink to="/admin" class="nav-item nav-link">後台頁面</RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.badge {
  display: inline-block;
  transform: translateY(-1px);
}
</style>
