import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import { RouteName } from '@/common/constants.js';
import { useUserStore } from '@/stores/user.js';

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
});
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.name !== RouteName.SIGN_IN && to.meta.public !== true
    && userStore.isAuthenticated === false) {
    next({ name: RouteName.SIGN_IN });
  } else {
    next();
  }
});
export default router;
