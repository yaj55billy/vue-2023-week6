<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useCartStore } from '@/stores/useCartStore.js';
import { useLoaderStore } from '@/stores/useLoaderStore.js';
import { SwalHandle } from '@/utils/sweetalert2.js';
const cartStore = useCartStore();
const loaderStore = useLoaderStore();

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

const user = ref({
  email: '',
  name: '',
  tel: '',
  address: '',
  message: '',
});

const onSubmit = () => {
  const api = `${VITE_API_BASE}/api/${VITE_API_PATH}/order`;
  loaderStore.changeIsLoading(true);
  const data = {
    user: {
      name: user.value.name,
      email: user.value.email,
      tel: user.value.tel,
      address: user.value.address,
    },
    message: user.value.message,
  };

  axios
    .post(api, { data })
    .then(() => {
      SwalHandle.showSuccessMsg('訂單建立成功');
      loaderStore.changeIsLoading(false);
      user.value = {
        email: '',
        name: '',
        tel: '',
        address: '',
        message: '',
      };
      cartStore.getCart();
    })
    .catch(() => {
      SwalHandle.showErrorMsg('訂單建立失敗，請稍候再試');
      loaderStore.changeIsLoading(false);
    });
};

onMounted(() => {
  cartStore.getCart();
});
</script>
<template>
  <div class="container mt-5">
    <h2 class="text-center">購物車列表</h2>
    <div class="text-end">
      <button
        class="btn btn-outline-danger"
        type="button"
        @click="cartStore.deleteCarts"
        :disabled="cartStore.cartsLength === 0"
      >
        清空購物車
      </button>
    </div>
    <table class="table align-middle mt-2">
      <thead>
        <tr>
          <th></th>
          <th>品名</th>
          <th style="width: 150px">數量/單位</th>
          <th class="text-end">單價</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="cartStore.cartsLength > 0">
          <tr v-for="cartItem in cartStore.cartData.carts" :key="cartItem.id">
            <td>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="cartStore.deleteCartItem(cartItem.id)"
              >
                x
              </button>
            </td>
            <td>
              {{ cartItem.product.title }}
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <select
                    class="form-select"
                    v-model="cartItem.qty"
                    @change="
                      cartStore.updateCartItem(cartItem.id, cartItem.product_id, cartItem.qty)
                    "
                  >
                    <option v-for="num in 40" :value="num" :key="`${num}-${cartItem.id}`">
                      {{ num }}
                    </option>
                  </select>
                  <span class="input-group-text" id="basic-addon2">{{
                    cartItem.product.unit
                  }}</span>
                </div>
              </div>
            </td>
            <td class="text-end">
              {{ cartItem.total }}
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="4" class="text-center">
              <h5>Oops，購物車沒有資料！</h5>
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-end">總計</td>
          <td class="text-end">{{ cartStore.cartData.total }}</td>
        </tr>
      </tfoot>
    </table>
    <h2 class="text-center mt-5">填寫資料</h2>
    <VForm class="mt-2 col-md-6 mx-auto" v-slot="{ meta, errors, values }" @submit="onSubmit">
      <div class="form-group">
        <label for="email" class="text-left w-100">Email</label>
        <VField
          id="email"
          name="email"
          type="email"
          class="form-control"
          :class="{
            'is-invalid': errors.email,
            'is-valid': !errors.email && values.email,
          }"
          autocomplete="off"
          placeholder="請輸入 Email"
          rules="email|required"
          v-model="user.email"
        ></VField>
        <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="form-group mt-4">
        <label for="name" class="text-left w-100">收件人姓名</label>
        <VField
          id="name"
          label="收件人姓名"
          name="name"
          type="text"
          rules="required"
          class="form-control"
          :class="{
            'is-invalid': errors.name,
            'is-valid': !errors.name && values.name,
          }"
          autocomplete="off"
          placeholder="請輸入收件人姓名"
          v-model="user.name"
        ></VField>
        <ErrorMessage name="name" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="form-group mt-4">
        <label for="tel" class="text-left w-100">收件人電話</label>
        <VField
          id="tel"
          label="收件人電話"
          name="tel"
          type="tel"
          rules="required|min:8"
          class="form-control"
          :class="{
            'is-invalid': errors.tel,
            'is-valid': !errors.tel && values.tel,
          }"
          autocomplete="off"
          placeholder="請輸入收件人電話"
          v-model="user.tel"
        ></VField>
        <ErrorMessage name="tel" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="form-group mt-4">
        <label for="address" class="text-left w-100">收件人地址</label>
        <VField
          id="address"
          label="收件人地址"
          name="address"
          type="text"
          rules="required"
          class="form-control"
          :class="{
            'is-invalid': errors.address,
            'is-valid': !errors.address && values.address,
          }"
          autocomplete="off"
          placeholder="請輸入收件人地址"
          v-model="user.address"
        ></VField>
        <ErrorMessage name="address" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="form-group mt-4">
        <label for="message" class="text-left w-100">留言</label>
        <VField
          as="textarea"
          cols="30"
          rows="3"
          id="message"
          name="message"
          class="form-control"
          v-model="user.message"
        ></VField>
      </div>
      <div class="text-end mt-4">
        <button
          type="submit"
          class="btn btn-primary btn-lg"
          :disabled="!meta.valid || cartStore.cartsLength === 0"
        >
          前往結帳
        </button>
      </div>
    </VForm>
  </div>
</template>

<style></style>
