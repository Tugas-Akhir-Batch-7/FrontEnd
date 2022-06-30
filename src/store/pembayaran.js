import PembayaranService from "../services/pembayaran-service"

export default  {
    namespaced: true,
    state: {
        pembayaran: [],
    },
    getters: {
        listPembayaran(state) {
            return state.pembayaran
        }
    },
    mutations: {
        SET_PEMBAYARAN(state, pembayaran) {
            state.pembayaran = pembayaran
        }
    },
    actions: {
        async fetchPembayaran({ commit }) {
            // console.log('fetch pembayaran')
            // console.log(commit)
            // commit('SET_PEMBAYARAN', pembayaran)
        },
        async fetchPembayaranByTagihanId({ commit }, tagihanId) {
            const pembayaran = await PembayaranService.getPembayaranByTagihanId(tagihanId)
            commit('SET_PEMBAYARAN', pembayaran)
            // console.log('fetch pembayaran')
            // console.log(commit)
            // commit('SET_PEMBAYARAN', pembayaran)
        }
    }
}