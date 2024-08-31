import { createRouter, createWebHistory } from 'vue-router';
import WelcomePage from '@/components/WelcomePage.vue';
import PrimeCalculation from '@/components/WithoutWorker.vue';
import PrimeCalculationWithWorker from '@/components/WithWorker.vue';
import PrimeCalculationWithMultipleWorkers from '@/components/WithSeveralWorkers.vue';

const routes = [
  { path: '/', name: 'welcome', component: WelcomePage },
  { path: '/without-workers', name: 'without-workers', component: PrimeCalculation },
  { path: '/with-worker', name: 'with-worker', component: PrimeCalculationWithWorker },
  { path: '/with-multiple-workers', name: 'with-multiple-workers', component: PrimeCalculationWithMultipleWorkers },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
