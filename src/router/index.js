import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    // login
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },

    // daftar
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue')
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

    // lupa password
    {
      path: '/forgot_password',
      name: 'forgotpwd',
      component: () => import('../components/PasswordRecovery/Step1.vue')
    },
    {
      path: '/forgot_password2',
      name: 'forgotpwd2',
      component: () => import('../components/PasswordRecovery/Step2.vue')
    },

    //murid
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue')
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   if(localStorage.getItem('user') == null) router.push('/login')

//   next()
// })

export default router
