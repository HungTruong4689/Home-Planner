<template>
    <div class="bg-header h-full px-5 py-6 flex flex-col items-center">
        <div class="w-full">
            <h4 class="text-left text-highlight text-semibold text-xl">
                CHAIR AND CLOSET LIST<strong class="text-custom"></strong>
            </h4>
            <div class="overflow-x-auto mt-4">
                <table class="table-auto w-full border-2 border-solid border-customWhite">
                    <thead class="text-white uppercase">
                        <tr>
                            <th class="border border-customWhite px-4 py-2 text-highlight text-sm">
                                NAME
                            </th>
                            <!-- <th class="border border-customWhite px-4 py-2 text-sm">ID</th> -->
                            <th class="border border-customWhite px-4 py-2 text-sm">TYPE</th>
                            <th class="border border-customWhite px-4 py-2 text-sm">IMAGE</th>
                            <th class="border border-customWhite px-4 py-2 text-sm">COLOR</th>
                            <th class="border border-customWhite px-4 py-2 mt-4text-sm">SIZE</th>
                            <th class="border border-customWhite px-4 py-2 text-sm">MATERIAL</th>
                            <th class="border border-customWhite px-4 py-2 text-sm">QUANTITY</th>
                            <th class="border border-customWhite px-4 py-2 text-sm">PRICE</th>
                            <th class="border border-customWhite px-4 py-2 text-sm">ROOM NAME</th>

                            <th class="border border-customWhite px-4 py-2 text-sm">ACTION</th>
                        </tr>
                    </thead>
                    <tbody class="text-default text-center">
                        <tr v-for="data in chairClosetData" :key="data">
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
                                <img :src="data.image" alt="category" class="w-[60px]" />
                            </td>

                            <td class="border border-customWhite px-4 py-2 text-sm">
                                {{ data.color }}
                            </td>
                            <td class="border border-customWhite px-4 py- mt-4text-sm">
                                {{ data.size }}
                            </td>
                            <td class="border border-customWhite px-4 py-2 text-sm">
                                {{ data.material }}
                            </td>
                            <td
                                class="border border-customWhite px-4 py-2 text-sm whitespace-nowrap"
                            >
                                {{ data.quantity }}
                            </td>
                            <td
                                class="border border-customWhite px-4 py-2 text-sm whitespace-nowrap"
                            >
                                {{ data.price }}€
                            </td>
                            <td class="border border-customWhite px-4 py-2 text-sm">
                                <select
                                    class="w-[100px] py-1 text-sm border rounded-md mt-0 border-highlight bg-header text-highlight hover:bg-highlight hover:text-white"
                                    v-model="data.selectedRoom"
                                >
                                    <option value="0">Please select room</option>

                                    <option
                                        v-for="value in data.room"
                                        :key="value.room"
                                        :value="value.room"
                                    >
                                        {{ value.room }}
                                    </option>
                                </select>
                            </td>

                            <td class="border border-customWhite px-4 py-2 text-sm">
                                <div class="flex justify-end space-x-2">
                                    <button
                                        class="inline-flex items-center justify-center px-4 py-1 bg-header text-highlight text-sm font-medium rounded-md border-2 border-highlight hover:bg-highlight hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                                        :disabled="
                                            data.selectedRoom === 0 || data.selectedRoom === '0'
                                        "
                                        @click.prevent="addToRoom(data)"
                                    >
                                        ADD TO ROOM
                                    </button>
                                    <button
                                        class="inline-flex items-center justify-center px-4 py-1 bg-header text-activate text-sm font-medium rounded-md border-2 border-activate hover:bg-activate hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                                        @click.prevent="addToCart(data)"
                                    >
                                        ADD TO CART
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import chairClosetData from '../../data/data.json'
export default {
    data() {
        return {
            currentPage: 1,
            totalPage: 0,
            itemsPerPage: 15,
            chairClosetData: [],

            roomName: [],
            selectedRoom: 0,
            shoppingCart: [],
        }
    },
    mounted() {
        // this.chairClosetData = chairClosetData
        chairClosetData.forEach((value) => (value.selectedRoom = 0))
        this.$store.dispatch('fetchDataProject', chairClosetData)
    },
    methods: {
        addToRoom(data) {
            // Clear the form fields
            if (data.selectedRoom !== 0) {
                if (data.quantity > 0) {
                    const updateData = {
                        ...data,
                        quantity: data.quantity - 1,
                        amount: 1,
                    }
                    const { room, ...updatedData } = updateData
                    const chairIndex = this.chairClosetData.findIndex(
                        (ind) => ind.id === updateData.id,
                    )

                    if (chairIndex !== -1) {
                        const { amount, ...postData } = updateData

                        this.chairClosetData[chairIndex] = postData
                        // Use map to create a new list with "room" and "selectedRoom" removed from each element
                        const modifiedData = this.chairClosetData.map((item) => {
                            // Create a copy of the original object
                            const modifiedItem = { ...item }

                            // Remove "room" and "selectedRoom" properties
                            delete modifiedItem.room

                            return modifiedItem
                        })
                        this.$store.dispatch('fetchDataProject', modifiedData)
                    }

                    // Find the index of the selected room
                    const roomIndex = this.roomName.findIndex(
                        (val) => val.room === data.selectedRoom,
                    )

                    // Check if the room exists in the array
                    if (roomIndex !== -1) {
                        // Room exists, push the data object into the room's array
                        const itemId = this.roomName[roomIndex].items.findIndex(
                            (val) => val.id === updateData.id,
                        )

                        if (itemId === -1) {
                            this.roomName[roomIndex].items.push(updatedData)
                        } else {
                            this.roomName[roomIndex].items[itemId].amount++
                            this.roomName[roomIndex].items[itemId].quantity = updatedData.quantity
                        }
                    }
                } else {
                    alert('Out of this item')
                }
            } else {
                alert('Please select the room')
            }
        },
        addToCart(data) {
            if (data.quantity > 0) {
                const updateData = {
                    ...data,
                    quantity: data.quantity - 1,
                    amount: 1,
                }
                const { room, ...updatedData } = updateData
                const chairIndex = this.chairClosetData.findIndex((ind) => ind.id === updateData.id)

                if (chairIndex !== -1) {
                    const { amount, ...postData } = updateData

                    this.chairClosetData[chairIndex] = postData
                }

                // Room exists, push the data object into the room's array
                const itemId = this.shoppingCart.findIndex((val) => val.id === updateData.id)

                if (itemId === -1) {
                    this.shoppingCart.push(updatedData)
                } else {
                    this.shoppingCart[itemId].amount++
                    this.shoppingCart[itemId].quantity = updatedData.quantity
                }
            } else {
                alert('Out of this item')
            }

            const modifyModal = { showModal: false, shoppingList: this.shoppingCart }

            this.$store.dispatch('showShoppingList', modifyModal)
        },
    },
    computed: {
        // paginatedItems() {
        //     // Compute the items to be displayed on the current page
        //     const start = (this.currentPage - 1) * this.itemsPerPage
        //     const end = start + this.itemsPerPage
        //     return this.chairClosetData.slice(start, end)
        // },
        getRoomList() {
            const room = this.$store.getters['getRoomList']
            this.roomName = Array.from(room)
            this.chairClosetData.forEach((value) => (value.room = room))
            return room
        },
        getDataProject() {
            const projectData = this.$store.getters['getDataProject']
            if (projectData) {
                this.chairClosetData = projectData
                const room = this.$store.getters['getRoomList']
                if (room) {
                    this.chairClosetData.forEach((value) => (value.room = room))
                }
            }
            return projectData
        },
        getShoppingList() {
            return this.$store.getters['getShoppingList']
        },
    },
    watch: {
        getRoomList(val) {},
        getDataProject(val) {},
        chairClosetData(val) {},
        getShoppingList(val) {
            if (val) {
                this.shoppingCart = val.shoppingList
            }
        },
    },
}
</script>
