<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useCartStore } from '@/stores/useCartStore.js';
import { useLoaderStore } from '@/stores/useLoaderStore.js';
const cartStore = useCartStore();
const loaderStore = useLoaderStore();

const product = ref({});
const classNumber = ref(1);

const getProduct = () => {
  loaderStore.changeIsLoading(true);
  const route = useRoute();
  const { id } = route.params;
  const api = `${import.meta.env.VITE_API_BASE}/api/${import.meta.env.VITE_API_PATH}/product/${id}`;

  axios
    .get(api)
    .then((res) => {
      product.value = res.data.product;
      loaderStore.changeIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
      loaderStore.changeIsLoading(false);
    });
};

const formatDate = (time) => {
  return new Date(time).toLocaleString('sv');
};

onMounted(() => {
  getProduct();
});
</script>
<template>
  <div class="product mt-5">
    <div class="container">
      <div class="row align-items-start">
        <div class="col-md-6">
          <div id="carouselProductImages" class="carousel slide">
            <div class="carousel-inner">
              <div
                class="carousel-item"
                v-for="(pic, index) in product.imagesUrl"
                :key="index + 'product.title'"
                :class="{ active: index === 0 }"
              >
                <img :src="pic" class="d-block w-100" />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselProductImages"
              data-bs-slide="prev"
            >
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselProductImages"
              data-bs-slide="next"
            >
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div class="col-md-6">
          <h2 class="h2">{{ product.title }}</h2>
          <p>{{ product.content }}</p>
          <p>
            課程時間：{{ formatDate(product.datetimeStart) }} ~
            {{ formatDate(product.datetimeEnd) }}
          </p>
          <div class="mb-3 flex">
            <del>原價：{{ product.origin_price }}</del>
            <h5>特價只要：{{ product.price }}</h5>
          </div>

          <div class="mt-2">
            <label for="classNum">課程數量：</label>
            <select id="classNum" class="form-select" v-model="classNumber">
              <option :value="num" v-for="num in 20" :key="num">
                {{ num }}
              </option>
            </select>
          </div>
          <div class="d-flex justify-content-start mt-4">
            <RouterLink to="/products" class="btn btn-outline-primary me-2">回課程頁</RouterLink>
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="cartStore.addToCart(product.id, classNumber)"
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
