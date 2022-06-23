import axios from "axios"
import AuthService from "../services/auth-service"

export default {
    namespaced: true,
    state: {
        user: null,
        token: null
    },
    getters: {
        user(state) {
            return state.user
        },
        token(state) {
            return state.token
        }
    },
    mutations: {
        SET_USER(state, value) {state.user = value},
        SET_TOKEN(state, value) {state.token = value}
    },
    actions: {
      async login({commit}, credential) {
        const user = await AuthService.login(credential)
        // console.log(user)
        commit('SET_USER', user.data)
        commit('SET_TOKEN', user.token)
        // console.log(this.$store.state.target)
      }
    },
}