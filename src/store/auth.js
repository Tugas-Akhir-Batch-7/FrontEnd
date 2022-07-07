import axios from "axios"
import AuthService from "../services/auth-service"

export default {
    namespaced: true,
    state: {
        user: null,
        token: null
    },
    getters: {
        isLoggedIn(state) {
            return state.user !== null
        },
        user(state) {
            return state.user
        },
        token(state) {
            return state.token
        },
        getCurrentRole(state) {
            return state.user.role
        },
        // currentName(state) {
        //     return state.user.name
        // }
    },
    mutations: {
        SET_USER(state, value) { state.user = value },
        SET_TOKEN(state, value) { state.token = value }
    },
    actions: {
        async login({ commit }, credential) {
            const user = await AuthService.login(credential)
            // console.log(user.data)
            commit('SET_USER', user.data)
            commit('SET_TOKEN', user.token)
            // console.log(this.$store.state.target)
        },
        async logout({ commit }) {
            console.log('logout')
            commit('SET_USER', null)
            commit('SET_TOKEN', null)
            // await AuthService.logout()
        },
        async registerOtp({ commit }, form) {
            const user = await AuthService.registerOtp(form)
            console.log(user)
            // commit('SET_USER', user)
            // commit('SET_TOKEN', user.token)
        },
        async register({ commit }, form) {
            const user  = await AuthService.register(form)
            console.log(user)
        },
        // async updateProfile({ commit, dispatch }, form) {
        //     const user = await AuthService.updateProfile(form)
        //     console.log(user)
        //     dispatch('setProfile', user)
        // },
        async setProfile ({ commit }) {
            const user = await AuthService.getProfile()
            console.log(user)
            commit('SET_USER', user.data)

        }
    },
}