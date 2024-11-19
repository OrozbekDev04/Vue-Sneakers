// router.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/HomePage.vue'; // Главная страница
import FavoritesPage from './pages/FavoritesPage.vue'; // Главная страница

// Определяем маршруты
const routes = [
  { path: '/', component: HomePage, name: HomePage },
  { path: '/favorites', component: FavoritesPage, name:FavoritesPage  },
];

// Создаем маршрутизатор
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Экспортируем маршрутизатор
export default router;
