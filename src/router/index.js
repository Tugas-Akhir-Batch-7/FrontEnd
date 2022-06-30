import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
// import HomeView from '../views/HomeView.vue'

import ListGuru from '../components/Admin/ListGuru.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: 'active',
  routes: [

    // login
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        // requiresAuth: false
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
      component: () => import('../components/Murid/Daftar.vue'),
      meta: {
        requiresAuth: true,
        isMurid: true
      },
    },

    //guru
    {
      path: '/guru_dashboard',
      name: 'dashboardGuru',
      component: () => import('../components/Guru/Dashboard.vue'),
      meta: {
        requiresAuth: true,
        isGuru: true
      },
    },
    {
      path: '/guru_dashboard1',
      name: 'guru_dashboard1',
      component: () => import('../components/Guru/dashboard1.vue'),
      meta: {
        requiresAuth: true,
        isGuru: true
      },
    },
    {
      path: '/anggota_batch/:id',
      name: 'anggotaBatch',
      component: () => import('../components/Guru/anggotaBatch.vue'),
      meta: {
        requiresAuth: true,
        isGuru: true
      },
    },
    {
      path: '/guru/pertemuan',
      name: 'guru_pertemuan',
      component: () => import('../components/Guru/pertemuan.vue'),
      meta: {
        requiresAuth: true,
        isGuru: true
      },
    },
    {
      path: '/detail_pertemuan/:id',
      name: 'detailPertemuan',
      component: () => import('../components/Guru/detailPertemuan.vue'),
      meta: {
        requiresAuth: true,
        isGuru: true
      },
    },
    {
      path: '/score_tugas/:id',
      name: 'scoreTugas',
      component: () => import('../components/Guru/scoreTugas.vue'),
      meta: {
        requiresAuth: true,
        isGuru: true
      },
    },
    {
      path: '/guru/list_ujian',
      name: 'listUjian',
      component: () => import('../components/Guru/listUjian.vue'),
      meta: {
        requiresAuth: true,
        isGuru: true
      },
    },
    {
      path: '/score_ujian/:id',
      name: 'scoreUjian',
      component: () => import('../components/Guru/scoreUjian.vue'),
      meta: {
        requiresAuth: true,
        isGuru: true
      },
    },
    {
      path: '/guru_sidebar',
      name: 'sidebarGuru',
      component: () => import('../components/Guru/sidebar.vue'),
      meta: {
        requiresAuth: true,
        isGuru: true
      },
    },
    {
      path: '/admin/',
      name: 'admin_dashboard',
      component: () => import('../views/AdminView.vue'),
      meta: {
        requiresAuth: true,
        isAdmin: true
      },
      children: [
        {
          path: 'list-guru',
          name: 'admin_list_guru',
          component: () => import('../components/Admin/ListGuru.vue')
          // component: () => ListGuru
        },
        {
          path: 'list-murid',
          name: 'admin_list_murid',
          component: () => import('../components/Admin/ListMurid.vue')
        },
        {
          path: 'list-tagihan',
          name: 'admin_list_tagihan',
          component: () => import('../components/Admin/ListTagihan.vue')
        },
        {
          path: 'input-tagihan',
          name: 'admin_input_tagihan',
          component: () => import('../components/Admin/input/InputTagihan.vue')
        },
        {
          path: 'detail-tagihan/:id',
          name: 'admin_detail_pembayaran',
          component: () => import('../components/Admin/DetailTagihan.vue')
        },
        {
          path: 'list-pembayaran',
          name: 'admin_list_pembayaran',
          component: () => import('../components/Admin/ListPembayaran.vue')
        },


      ]
    },



  ]
})

router.beforeEach((to, from, next) => {

  const dev = false
  if (dev === true) return next()
  const default_murid = 'murid_dashboard'
  const default_guru = 'guru_dashboard1'
  const default_admin = 'admin'
  // console.log(Object.keys(to.meta))
  console.log(!to.meta.requiresAuth)

  // if ada meta.requiresAuth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // if(!to.meta.requiresAuth && store.getters['auth/isLoggedIn']) {
    //   next({
    //     path: '/guru_dashboard',
    //     query: {
    //       redirect: to.fullPath
    //     }
    //   })
    // }
    
    // jiga loggedin
    if (store.getters['auth/isLoggedIn']) {
      const role = store.getters['auth/user'].role
      console.log("if pertama loggedin")
      if (to.meta.isMurid && role === 'murid') {
        next()
        return
      } else if (to.meta.isGuru && role === 'guru') {
        next()
        return

      } else if (to.meta.isAdmin && role === 'admin') {
        next()
        return
      } 
      else {
        console.log('masuk else')
        if (role === 'admin') {
          next(`/${default_admin}`)
          // next()
          return
  
        } else if (role === 'guru') {
          next(`/${default_guru}`)
          // next()
          return
  
        } else if (role === 'murid') {
          next(`/${default_murid}`)
          // next()
          return
        }
      }
      // next()
      // return
    }

    // if tidak login tapi masuk route requiresAuth
    next('/login')
    return

  } else {
    console.log('masuk else')
    if (store.getters['auth/isLoggedIn'] && !to.meta.requiresAuth) {
      console.log('masuk if loggedin')
      const role = store.getters['auth/user'].role
      console.log(role)
      if (role === 'admin') {
        next(`/${default_admin}`)
        // next()
        return

      } else if (role === 'guru') {
        next(`/${default_guru}`)
        // next()
        return

      } else if (role === 'murid') {
        next(`/${default_murid}`)
        // next()
        return
      }
      // next()
      return
    }
  }

  next()
})

export default router
