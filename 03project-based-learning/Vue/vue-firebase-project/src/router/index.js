import Vue from 'vue';
import firebase from 'firebase';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
Vue.use(VueRouter)

const routes = [
  {
    path:'*',
    redirect:'/login'
  },
  {
    path:'/',
    redirect:'/login'
  },

  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/sign-up',
    name:'SignUp',
    component:SignUp
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta:{
      requiresAuth:true
    }
  }
]

const router = new VueRouter({
  routes
});

router.beforeEach((to,from,next)=>{
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record =>record.meta.requiresAuth);

  if(requiresAuth && !currentUser) next('login');
  else if(!requiresAuth && currentUser) next('home');
  else next();

});

export default router
