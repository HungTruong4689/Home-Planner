export default {
    fetchDataProject(context, payload) {
        context.commit('fetchDataProject', payload)
    },
    addRoomList(context, payload) {
        context.commit('addRoomList', payload)
    },
    showShoppingList(context, payload) {
        context.commit('showShoppingList', payload)
    },
}
