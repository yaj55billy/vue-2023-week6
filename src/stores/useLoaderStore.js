import { ref } from 'vue';
import { defineStore } from 'pinia';
export const useLoaderStore = defineStore('LoaderStore', () => {
  const isLoading = ref(false);
  const changeIsLoading = (bool) => {
    isLoading.value = bool;
  };
  return { isLoading, changeIsLoading };
});
