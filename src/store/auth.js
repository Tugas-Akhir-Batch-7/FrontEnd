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
            console.log(user.data.photo)
            let pattern = /^(http|https):\/\//;
            let isFullLink = pattern.test(user.data.photo);
            if (!isFullLink) {
                user.data.photo = `http://localhost:5000/img-profile/${user.data.photo}`;
            }
            commit('SET_USER', user.data)
            commit('SET_TOKEN', user.token)
            // console.log(this.$store.state.target)
        },
        async loginGoogle({ commit }, credential) {
            // console.log(user.data)
            commit('SET_USER', credential.data)
            commit('SET_TOKEN', credential.token)
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
            try {
                const user = await AuthService.register(form)
                if (!user) {
                    return false
                }
                return user

            } catch (error) {
                console.log(error)
            }
        },
        async updateProfile({ dispatch }, form) {
            const user = await AuthService.updateProfile(form)
            // console.log(user)
            await dispatch('setProfile', user)
        },

        async setProfile({ commit }, user) {
            // const user = await AuthService.getProfile()
            // console.log('masuk set profile')
            // console.log(user)
            await commit('SET_USER', user.data)
        }
    },
}