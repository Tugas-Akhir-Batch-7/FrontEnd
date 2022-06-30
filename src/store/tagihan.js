import TagihanService from "../services/tagihan-service"

export default {
    namespaced: true,
    state: {
        tagihan: [],
        detailTagihan: null
    },
    getters: {
        listTagihan(state) {
            return state.tagihan
        },
        detailTagihan(state) {
            return state.detailTagihan
        }

    },
    mutations: {
        SET_TAGIHAN(state, tagihan) {
            state.tagihan = tagihan
        },
        SET_DETAIL_TAGIHAN(state, detailTagihan) {
            state.detailTagihan = detailTagihan
        }
    },
    actions: {
        async fetchTagihan({ commit }) {
            const tagihans = await TagihanService.getAllTagihan()
            commit('SET_TAGIHAN', tagihans)
        },
        async createTagihan({}, tagihan) {
            // let tagihanjson = tagihan.toJSON()
            // console.log(tagihan.dp)
            // console.log(tagihanjson)
            await TagihanService.createTagihan(tagihan)
        },
        async fetchTagihanById({ commit }, id) {
            const tagihanDetail = await TagihanService.getTagihanById(id)
            commit('SET_DETAIL_TAGIHAN', tagihanDetail)
        },
        async fetchTagihanAndTerbayar({ commit }) {
            const tagihan = await TagihanService.getTagihanAndTerbayar()
            commit('SET_TAGIHAN', tagihan)

        }
    }
}