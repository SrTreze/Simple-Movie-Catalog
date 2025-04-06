import { createRouter, createWebHistory } from 'vue-router';

// const MovieModal = () => import('../components/MovieModal.vue');
import Home from '../views/Home.vue'
import MovieModal from '../components/MovieModal.vue'

const routes = [
  {
    path: '/movieModal/:id',
    name: 'movieModal',
    component: MovieModal,
    props: true,
  },
];

const router = createRouter({
  base: '/app',
  history: createWebHistory(),
  routes,
});

export default router;