import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup_2',
      name: 'signup_2',
      component: () => import('../components/SignUp/Step2.vue')
    },
    {
      path: '/signup_3',
      name: 'signup_3',
      component: () => import('../components/SignUp/Step3.vue')
    },
    {
      path: '/signup_4',
      name: 'signup_4',
      component: () => import('../components/SignUp/Step4.vue')
    },
    {
      path: '/forgot_password',
      name: 'forgotpwd',
      component: () => import('../components/PasswordRecovery/PwdRecovery_1.vue')
    },
    {
      path: '/forgot_password2',
      name: 'forgotpwd2',
      component: () => import('../components/PasswordRecovery/PwdRecovery_2.vue')
    }
  ]
})

export default router
