import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Houses from './pages/Houses.vue'
import HouseDetail from './pages/HouseDetail.vue'
import HouseForm from './pages/HouseForm.vue'
import MyListings from './pages/MyListings.vue'
import Favorites from './pages/Favorites.vue'
import About from './pages/About.vue'
import './styles.css'

const routes = [
  { path: '/', name: 'houses', component: Houses },
  { path: '/houses/:id', name: 'house-detail', component: HouseDetail, props: true },
  { path: '/create', name: 'create', component: HouseForm },
  { path: '/edit/:id', name: 'edit', component: HouseForm, props: true },
  { path: '/my-listings', name: 'my-listings', component: MyListings },
  { path: '/favorites', name: 'favorites', component: Favorites },
  { path: '/about', name: 'about', component: About },
]

const router = createRouter({ history: createWebHistory(), routes })

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
