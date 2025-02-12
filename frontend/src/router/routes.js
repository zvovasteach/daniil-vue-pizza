import { RoutName, AppLayout } from '@/common/constants';
export default [
  {
    path: '/',
    name: RoutName.HOME,
    component: () => import('../views/ViewHome.vue'),
    meta: { layout: AppLayout.MAIN },
  },
  {
    path: '/cart',
    name: RoutName.CART,
    component: () => import('../views/ViewCart.vue'),
    meta: { layout: AppLayout.MAIN },
  },
  {
    path: '/orders',
    name: RoutName.ORDERS,
    component: () => import('../views/ViewOrder.vue'),
    meta: { layout: AppLayout.USER },
  },
  {
    path: '/sign-in',
    name: RoutName.SIGN_IN,
    component: () => import('../views/ViewSignIn.vue'),
    meta: { layout: AppLayout.DEFAULT },
  },
  {
    path: '/user',
    name: RoutName.USER_DATA,
    component: () => import('../views/ViewUserData.vue'),
    meta: { layout: AppLayout.USER },
  },
];
