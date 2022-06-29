import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [


    // landing
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // login
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/Login/Login.vue')
    },

    // daftar
    {
      path: '/signup',
      name: 'signup_step1',
      component: () => import('../components/SignUp/Step1.vue')
    },

    {
      path: '/signup2',
      name: 'signup_step2',
      component: () => import('../components/SignUp/Step2.vue')
    },

    // lupa password
    {
      path: '/forgot_password',
      name: 'forgotpwd',
      component: () => import('@/components/PwdRecovery/Step1.vue')
    },

    //murid
    {
      path: '/murid_dashboard',
      name: 'dashboard',
      component: () => import('@/components/Murid/Daftar.vue')
    },
  ]
})

export default router
