import { createStore } from 'vuex'

import rootMutations from './mutations'
import rootActions from './actions'
import rootGetters from './getters'

const store = createStore({
    // modules: {
    //     editor,
    //     project,
    //     notification,
    //     training,
    //     model,
    //     user,
    //     job,
    // },
    state() {
        return {
            dataProject: [],
            roomList: [],
            showShoppingList: { showModal: false, shoppingList: [] },
        }
    },

    mutations: rootMutations,
    actions: rootActions,
    getters: rootGetters,
})

export default store
