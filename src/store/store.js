import Vue from 'vue'
import Vuex from 'vuex'
import * as convertId from "../function/converIdUser";
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        idUser: convertId.convertId(sessionStorage.getItem("IdUser")),
        statusLogin: false,
        permission: 1,
        salesMonth : 0,
        salesDay : 0,
        saleLastestMonth: "Đang cập nhật",
        salesYear: "Đang cập nhật",
    },
    getters:
    {
        getIdUser: (state) => state.idUser,
        getPermission: (state) => state.permission

    },
    mutations: {
        INITIALISATION_STORE(state, newStatus) {
            state.statusLogin = newStatus;
        },

    }
})