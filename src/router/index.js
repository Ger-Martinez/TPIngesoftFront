import Vue from 'vue'
import VueRouter from 'vue-router'
import homepage from '../views/HomePage.vue'
import compare from '../views/Compare.vue';
import gridProd from '../views/Products.vue';
import login from '../views/Login.vue';
import ups from '../views/Ups.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: homepage
  },
  {
    path: '/comparador',
    name: 'Comparador de Precios',
    component: compare
  },
  {
    path: '/productos',
    name: 'Productos',
    component: gridProd
  },
  {
    path: '/login',
    name: 'Login',
    component: login
  },
  {
    path: '/ups',
    name: 'Ups',
    component: ups
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
