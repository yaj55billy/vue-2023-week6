import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import FrontView from '../views/FrontView.vue';
import HomeView from '../views/HomeView.vue';
import ProductsView from '../views/ProductsView.vue';
import ProductView from '../views/ProductView.vue';
import CartView from '../views/CartView.vue';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/admin/DashboardView.vue';
import adminProductsView from '../views/admin/ProductsView.vue';
import adminCouponsView from '../views/admin/CouponsView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Front',
      component: FrontView,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'products',
          name: 'products',
          component: ProductsView,
        },
        {
          path: 'product/:id',
          name: 'product',
          component: ProductView,
        },
        {
          path: 'cart',
          name: 'cart',
          component: CartView,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: DashboardView,
      children: [
        {
          path: 'products',
          name: 'adminProducts',
          component: adminProductsView,
        },
        {
          path: 'coupons',
          name: 'adminCoupons',
          component: adminCouponsView,
        },
      ],
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
  ],
});

export default router;
