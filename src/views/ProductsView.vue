<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import { useCartStore } from '@/stores/useCartStore.js';
import { useLoaderStore } from '@/stores/useLoaderStore.js';
const cartStore = useCartStore();
const loaderStore = useLoaderStore();

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

const products = ref([]);
const getProducts = () => {
  loaderStore.changeIsLoading(true);
  const api = `${VITE_API_BASE}/api/${VITE_API_PATH}/products/all`;

  axios
    .get(api)
    .then((res) => {
      products.value = res.data.products;
      loaderStore.changeIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
      loaderStore.changeIsLoading(false);
    });
};

// const productsComp = computed(() => {
//   return products.value.reduce((acc, product) => {
//     const existingCategory = acc.find((item) => item.categoryName === product.category);
//     if (existingCategory) {
//       existingCategory.data.push(product);
//     } else {
//       acc.push({
//         categoryName: product.category,
//         data: [product],
//       });
//     }
//     return acc;
//   }, []);
// });

onMounted(() => {
  getProducts();
});
</script>
<template>
  <div class="container mt-5">
    <h2 class="text-center">課程列表</h2>

    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="product in products" :key="product.id">
        <div class="card h-100">
          <img :src="product.imageUrl" :alt="product.title" class="card-img-top" />
          <div class="card-body">
            <span class="badge text-bg-secondary">{{ product.category }}</span>
            <h4 class="card-title mt-1">{{ product.title }}</h4>
            <p class="card-text">
              {{ product.description }}
            </p>
            <div class="mb-3 flex">
              <del>原價：{{ product.origin_price }}</del>
              <h5>特價只要：{{ product.price }}</h5>
            </div>
          </div>
          <div class="card-footer d-flex justify-content-center">
            <RouterLink :to="`/product/${product.id}`" class="btn btn-outline-primary mx-2"
              >看更多</RouterLink
            >
            <button
              type="button"
              class="btn btn-primary mx-2"
              @click="cartStore.addToCart(product.id)"
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
