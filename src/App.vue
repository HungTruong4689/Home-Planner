<template>
    <div class="bg-body">
        <div class="bg-header p-6 flex justify-between">
            <h1 class="text-2xl text-highlight font-semibold">Home Planner 0.1</h1>
            <div>
                <i
                    class="fa-solid fa-cart-shopping text-highlight text-2xl"
                    @click.prevent="showCart()"
                ></i>
            </div>
        </div>

        <div class="p-4 rounded-sm"><ChairCloset></ChairCloset></div>
        <div class="p-4 rounded-sm">
            <Room></Room>
        </div>
        <div
            class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75"
            v-if="showShoppingList"
        >
            <shopping-list />
        </div>
    </div>
</template>

<script>
import ChairCloset from './components/chair/ChairCloset.vue'

import Room from './components/room/Room.vue'
import ShoppingList from './components/shopping/ShoppingList.vue'
export default {
    components: {
        ChairCloset,
        Room,
        ShoppingList,
    },
    data() {
        return {
            showShoppingList: false,
            shoppingList: [],
        }
    },
    methods: {
        showCart() {
            const modifyModal = { showModal: true, shoppingList: this.shoppingList }
            this.$store.dispatch('showShoppingList', modifyModal)
        },
    },
    computed: {
        getShoppingList() {
            return this.$store.getters['getShoppingList']
        },
    },
    watch: {
        getShoppingList(val) {
            if (val) {
                this.showShoppingList = val.showModal
                this.shoppingList = val.shoppingList
            }
        },
    },
}
</script>

<style scoped></style>
