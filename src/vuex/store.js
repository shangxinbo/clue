
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
    showLayer: false,
}

const mutations = {
    // 显示遮罩层
    SHOW_LAYER(state) {
        state.showLayer = true
    },
    // 隐藏遮罩层
    HIDE_LAYER(state) {
        state.showLayer = false
    },
}

export default new Vuex.Store({
    state,
    mutations
})