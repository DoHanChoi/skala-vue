import { createRouter, createWebHistory } from 'vue-router'
import WeatherHomeView from '@/views/weather/WeatherHomeView.vue'

export const routes = [
  {
    path: '/',
    name: 'weather-home',
    component: WeatherHomeView,
  },
  {
    // 지연 로딩: 방문 시점에 청크를 내려받는다
    path: '/about',
    name: 'weather-about',
    component: () => import('@/views/weather/WeatherAboutView.vue'),
  },
  {
    path: '/weather/:cityId',
    name: 'weather-detail',
    component: () => import('@/views/weather/WeatherDetailView.vue'),
  },
  {
    path: '/favorites',
    name: 'weather-favorites',
    component: () => import('@/views/weather/FavoritesView.vue'),
  },
  {
    path: '/compare',
    name: 'weather-compare',
    component: () => import('@/views/weather/CompareView.vue'),
  },
  {
    // Catch-all: 위에서부터 매칭되므로 반드시 맨 마지막에 둔다
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/weather/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
