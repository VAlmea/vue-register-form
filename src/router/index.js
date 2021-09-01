import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Account/Login.vue'
import NotFound from '../views/NotFound.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/:id',
    name: 'Home',
    component: Home,
    props: true,    
  },
  {
    path: '/Account/Login',
    name: 'Login',
    component: Login,
    props: true,    
  },  
  {
    path :'*',
    component:NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(){
    return { x: 0, y: 0 }
  },
})

export default router
