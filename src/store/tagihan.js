import TagihanService from "../services/tagihan-service"

export default {
    namespaced: true,
    state: {
        tagihan: []
    },
    getters: {
        listTagihan(state) {
            return state.tagihan
        }
    },
    mutations: {
        SET_TAGIHAN(state, tagihan) {
            state.tagihan = tagihan
        }
    },
    actions: {
        // fetchTagihan({ commit }) {

        // }
        async createTagihan({}, tagihan) {
            // let tagihanjson = tagihan.toJSON()
            // console.log(tagihan.dp)
            // console.log(tagihanjson)
            await TagihanService.createTagihan(tagihan)
        }
    }
}