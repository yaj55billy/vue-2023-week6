import { ref, computed } from 'vue';
import axios from 'axios';
import { defineStore } from 'pinia';
import { useLoaderStore } from '@/stores/useLoaderStore.js';
const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

export const useCartStore = defineStore('cartStore', () => {
  const loaderStore = useLoaderStore();

  const cartData = ref({
    carts: [],
  });

  const cartsLength = computed(() => cartData.value.carts.length);

  const getCart = () => {
    const api = `${VITE_API_BASE}/api/${VITE_API_PATH}/cart`;
    loaderStore.changeIsLoading(true);

    axios
      .get(api)
      .then((res) => {
        cartData.value = res.data.data;
        loaderStore.changeIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        loaderStore.changeIsLoading(false);
      });
  };

  const addToCart = (product_id, qty = 1) => {
    const api = `${VITE_API_BASE}/api/${VITE_API_PATH}/cart/`;
    loaderStore.changeIsLoading(true);
    axios
      .post(api, { data: { product_id, qty } })
      .then((res) => {
        getCart();
        alert(res.data.message);
        loaderStore.changeIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        loaderStore.changeIsLoading(false);
      });
  };

  const deleteCartItem = (id) => {
    const api = `${VITE_API_BASE}/api/${VITE_API_PATH}/cart/${id}`;
    loaderStore.changeIsLoading(true);
    axios
      .delete(api)
      .then(() => {
        getCart();
        loaderStore.changeIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        loaderStore.changeIsLoading(false);
      });
  };

  const deleteCarts = () => {
    alert('是否要刪除所有購物車項目？');
    const apiUrl = `${VITE_API_BASE}/api/${VITE_API_PATH}/carts`;
    loaderStore.changeIsLoading(true);
    axios
      .delete(apiUrl)
      .then(() => {
        getCart();
        loaderStore.changeIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        loaderStore.changeIsLoading(false);
      });
  };

  const updateCartItem = (id, product_id, qty) => {
    const apiUrl = `${VITE_API_BASE}/api/${VITE_API_PATH}/cart/${id}`;
    loaderStore.changeIsLoading(true);
    const data = {
      product_id,
      qty,
    };
    axios
      .put(apiUrl, { data })
      .then(() => {
        getCart();
        loaderStore.changeIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        loaderStore.changeIsLoading(false);
      });
  };

  return {
    cartData,
    cartsLength,
    getCart,
    addToCart,
    deleteCartItem,
    deleteCarts,
    updateCartItem,
  };
});
