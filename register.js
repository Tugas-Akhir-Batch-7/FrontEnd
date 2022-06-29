import { defineStore } from 'pinia'

export const useRegisterStore = defineStore({
  id: 'register',
  state: () => ({
    nama: '',
    email: '',
    password: '',
    password_confirm: '',
    tanggalLahir: null,

  }),

  getters: {
    doubleCount: (state) => state.counter * 2
  },

  actions: {
    // increment() {
    //   this.counter++
    // }

    verify(){
      
    },

    signup(){

    },

    login(){
      
    },
    
  }
})
