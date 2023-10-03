<template>
    <div class="modalImageCounter fixed inset-0 flex">
        <!-- Modal content goes here -->
        <div
            class="modal-content mx-auto h-full w-11/12 mt-12 p-6 bg-header border border-white border-opacity-20 overflow-auto"
        >
            <div>
                <div
                    class="modal-header flex items-center justify-between text-xl border-b border-white pb-4"
                >
                    <h4 class="modal-title text-highlight">SHOPPING CART</h4>
                    <button type="button" class="hover:text-gray-200" @click.prevent="closeModal">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
            </div>
            <!-- Item Cards -->
            <div class="overflow-auto h-2/3 border-b-2">
                <table class="table-auto w-full border-2 border-solid border-customWhite">
                    <thead class="text-white uppercase">
                        <tr>
                            <th class="border border-customWhite px-4 py-2 text-highlight text-sm">
                                NAME
                            </th>
                            <!-- <th class="border border-customWhite px-4 py-2 text-sm">ID</th> -->
                            <th class="border border-customWhite px-4 py-2 text-sm">TYPE</th>
                            <th class="border border-customWhite px-4 py-2 text-sm">IMAGE</th>
                            <th class="border border-customWhite px-4 py-2 text-sm">SIZE</th>

                            <th class="border border-customWhite px-4 py-2 text-sm">AMOUNT</th>
                            <th class="border border-customWhite px-4 py-2 text-sm">PRICE</th>
                            <th class="border border-customWhite px-4 py-2 text-sm">TOTAL</th>

                            <th class="border border-customWhite px-4 py-2 text-sm">ACTION</th>
                        </tr>
                    </thead>
                    <tbody class="text-default text-center">
                        <tr v-for="data in items" :key="data">
                            <td class="border border-customWhite px-4 py-2 text-highlight text-sm">
                                {{ data.name }}
                            </td>
                            <!-- <td class="border border-customWhite px-4 py-2 text-sm">
                                {{ data.id }}
                            </td> -->
                            <td class="border border-customWhite px-4 py-2 text-sm">
                                {{ data.type }}
                            </td>
                            <td class="border border-customWhite px-4 py-2 text-sm">
                                <img :src="data.image" alt="image" class="w-[60px]" />
                            </td>

                            <td class="border border-customWhite px-4 py-2 text-sm">
                                {{ data.size }}
                            </td>

                            <td
                                class="border border-customWhite px-4 py-2 text-sm whitespace-nowrap"
                            >
                                {{ data.amount }}
                            </td>
                            <td
                                class="border border-customWhite px-4 py-2 text-sm whitespace-nowrap"
                            >
                                {{ data.price }}€
                            </td>
                            <td
                                class="border border-customWhite px-4 py-2 text-sm whitespace-nowrap"
                            >
                                {{ data.price * data.amount }}€
                            </td>

                            <td class="border border-customWhite px-4 py-2 text-sm">
                                <div class="flex justify-end space-x-2">
                                    <button
                                        class="inline-flex items-center justify-center px-4 py-1 bg-header text-highlight text-sm font-medium rounded-md border-2 border-highlight hover:bg-highlight hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                                        @click.prevent="decreaseValue(data)"
                                    >
                                        -
                                    </button>
                                    <button
                                        class="inline-flex items-center justify-center px-4 py-1 bg-header text-highlight text-sm font-medium rounded-md border-2 border-highlight hover:bg-highlight hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                                        @click.prevent="increaseValue(data)"
                                    >
                                        +
                                    </button>
                                    <button
                                        class="inline-flex items-center justify-center px-4 py-1 bg-header text-red-500 text-sm font-medium rounded-md border-2 border-red-500 hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                                        @click.prevent="deleteItem(data)"
                                    >
                                        DEL
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- Shopping Cart -->
            <div class="mt-8 text-right">
                <h2 class="text-2xl font-semibold mb-4 text-highlight">Payment</h2>

                <div class="mt-4 font-semibold text-highlight">
                    <span class="text-default">Total:</span> {{ calculateTotal() }}€
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    name: 'MONTPELLIER',
                    id: '23543636346346354654',
                    color: 'black',
                    size: 'S',
                    material: 'wood',
                    quantity: 39,
                    type: 'chair',
                    price: 75,
                    image: 'https://via.placeholder.com/150',
                },
                // Add more items here
            ],
            cart: [],
            projectData: [],
        }
    },
    methods: {
        closeModal() {
            const modifyModal = { showModal: false, shoppingList: this.items }
            this.$store.dispatch('showShoppingList', modifyModal)
        },

        calculateTotal() {
            return this.items.reduce(
                (total, cartItem) => total + cartItem.amount * cartItem.price,
                0,
            )
        },
        deleteItem(data) {
            // Use filter to create a new array without the item to be deleted
            this.items = this.items.filter((val) => val.id !== data.id)

            const updateData = this.projectData.find((val) => val.id === data.id)
            if (updateData) {
                updateData.amount = 0
                updateData.quantity = updateData.quantity + data.amount
            }
        },
        increaseValue(data) {
            const updateData = this.projectData.find((val) => val.id === data.id)
            if (updateData) {
                if (updateData.quantity > 0) {
                    updateData.quantity = updateData.quantity - 1
                    data.amount++
                } else {
                    alert('Out of the quantity of this item')
                }
            }
        },
        decreaseValue(data) {
            const updateData = this.projectData.find((val) => val.id === data.id)
            if (updateData) {
                data.amount--
                if (data.amount > 0) {
                    updateData.quantity = updateData.quantity + 1
                } else if (data.amount === 0) {
                    data.amount = 1
                    this.deleteItem(data)
                }
            }
        },
    },
    computed: {
        getShoppingList() {
            const shoppingList = this.$store.getters['getShoppingList']
            if (shoppingList) {
                this.items = shoppingList.shoppingList
            }
            return shoppingList
        },
        getDataProject() {
            const projectData = this.$store.getters['getDataProject']
            if (projectData) {
                this.projectData = projectData
            }
            return projectData
        },
    },
    watch: {
        getShoppingList(val) {},
        getDataProject(val) {},
    },
}
</script>
