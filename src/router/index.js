import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Front',
      component: () => import('../views/FrontView.vue'),
      // component: () => {
      //   return import('../views/FrontView.vue');
      // },
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: 'products',
          name: 'products',
          component: () => import('../views/ProductsView.vue'),
        },
        {
          path: 'product/:id',
          name: 'product',
          component: () => import('../views/ProductView.vue'),
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('../views/CartView.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/DashboardView.vue'),
      children: [
        {
          path: 'products',
          name: 'adminProducts',
          component: () => import('../views/admin/ProductsView.vue'),
        },
        {
          path: 'coupons',
          name: 'adminCoupons',
          component: () => import('../views/admin/CouponsView.vue'),
        },
      ],
    },
  ],
});

export default router;
