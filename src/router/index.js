import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlanetsView from '../views/PlanetsView.vue'
import PlanetDetails from '../views/PlanetDetails.vue'
import MarsView from '../views/MarsView.vue'
import ApodView from '../views/ApodView.vue'
import SearchView from '../views/SearchView.vue'
import FavoritesView from '../views/FavoritesView.vue'
import WeatherView from '../views/WeatherView.vue'

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
    path: '/planets/:id',
    name: 'PlanetDetails',
    component: PlanetDetails,
    props: true
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
  },
  {
    path:"/weather",
    name:"Weather",
    component: WeatherView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router