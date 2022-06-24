import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    // login
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        requiresAuth: false
      }
    },

    // daftar
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue'),
      meta: {
        requiresAuth: false
      }
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
      path: '/murid_dashboard',
      name: 'dashboard',
      component: () => import('../components/Murid/Daftar.vue')
    },

    //guru
    {
      path: '/guru_dashboard',
      name: 'dashboardGuru',
      component: () => import('../components/Guru/Dashboard.vue')
    },
    {
      path: '/guru_dashboard1',
      name: 'sidebarDashboard1',
      component: () => import('../components/Guru/dashboard1.vue')
    },
    {
      path: '/anggota_batch/:id',
      name: 'anggotaBatch',
      component: () => import('../components/Guru/anggotaBatch.vue')
    },
    {
      path: '/guru_sidebar',
      name: 'sidebarGuru',
      component: () => import('../components/Guru/sidebar.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(store.getters['auth/user']  )
  // console.log('coba ')
  // if(!to.meta.requiresAuth && store.getters['auth/user']){
  //   return next({
  //     path: '/murid_dashboard'
  //   })
  // }
  // if
//  console.log(store.state.auth.user)
  // if (!store.getters['auth/user']) {
    // console.log('test')
  // } else {
  //   console.log("role sekarang:", store.getters['auth/getCurrentRole'])
  // }
  // if(localStorage.getItem('user') == null) router.push('/login')

  // next()
  // con
  // if(localStorage.getItem('user') == null) {
  //   router.push('/')
  // }
  // console.log(localStorage.getItem('user'))
  next()
})

export default router
