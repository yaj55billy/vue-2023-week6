<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { SwalHandle } from '@/utils/sweetalert2.js';

const { VITE_API_BASE } = import.meta.env;

const router = useRouter();

const admin = ref({
  username: '',
  password: '',
});

const signIn = () => {
  const api = `${VITE_API_BASE}/admin/signin`;
  const data = {
    username: admin.value.username,
    password: admin.value.password,
  };
  axios
    .post(api, data)
    .then((res) => {
      SwalHandle.showSuccessMsg(res.data.message);
      const { token, expired } = res.data;
      document.cookie = `hexToken=${token};expired=${new Date(expired)}; path=/`;
      router.push('/admin/products');
    })
    .catch((error) => {
      SwalHandle.showErrorMsg(`${error.response.data.message}，請再檢查帳密`);
    });
};
</script>

<template>
  <div class="login">
    <div class="min-vh-100 d-flex justify-content-center align-items-center">
      <div class="w-25">
        <h2 class="text-center">管理者登入</h2>
        <form class="mt-4" @submit.prevent="signIn">
          <div class="mb-3">
            <label for="username" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="username"
              aria-describedby="emailHelp"
              v-model="admin.username"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="admin.password" />
          </div>
          <div class="d-grid gap-2">
            <button class="btn btn-primary" type="submit">登入</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style></style>
