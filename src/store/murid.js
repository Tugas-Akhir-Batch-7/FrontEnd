import MuridService from "../services/murid-service"
export default {
    namespaced: true,
    state: {
        murid: [],
    },
    getters: {
        listMurid(state) {
            return state.murid
        }
    },
    mutations: {
        SET_MURID(state, murid) {
            state.murid = murid
        }
    },
    actions: {
        fetchMurid({ commit }) {

        },
        async fetchMuridMendaftar ({commit}) {
            const murids = await MuridService.getMuridByStatus('mendaftar')
            commit('SET_MURID', murids)
        }
    }

}