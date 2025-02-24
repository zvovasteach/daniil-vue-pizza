import { RouteName, AppLayout } from '@/common/constants';
export default [
  {
    path: '/:catchAll(.*)*',
    redirect: { name: RouteName.HOME },
  },
  {
    path: '/',
    name: RouteName.HOME,
    component: () => import('../views/ViewHome.vue'),
    meta: { layout: AppLayout.MAIN },
  },
  {
    path: '/cart',
    name: RouteName.CART,
    component: () => import('../views/ViewCart.vue'),
    meta: { layout: AppLayout.MAIN },
  },
  {
    path: '/orders',
    name: RouteName.ORDERS,
    component: () => import('../views/ViewOrder.vue'),
    meta: { layout: AppLayout.USER },
  },
  {
    path: '/sign-in',
    name: RouteName.SIGN_IN,
    component: () => import('../views/ViewSignIn.vue'),
    meta: { layout: AppLayout.DEFAULT },
  },
  {
    path: '/user',
    name: RouteName.USER_DATA,
    component: () => import('../views/ViewUserData.vue'),
    meta: { layout: AppLayout.USER },
  },
];
