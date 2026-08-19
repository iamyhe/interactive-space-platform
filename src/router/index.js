import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// Importing all feature views
import PlanetsView from '../views/PlanetsView.vue'
import MarsView from '../views/MarsView.vue'
import ApodView from '../views/ApodView.vue'
import SearchView from '../views/SearchView.vue'
import FavoritesView from '../views/FavoritesView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/planets',
    name: 'Planets',
    component: PlanetsView
  },
  {
    path: '/mars',
    name: 'Mars',
    component: MarsView
  },
  {
    path: '/apod',
    name: 'APOD',
    component: ApodView
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchView
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: FavoritesView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Scroll to top when navigating to a new route
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router