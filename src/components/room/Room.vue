<template>
    <div class="bg-header p-5">
        <h2 class="text-highlight">ADD A ROOM</h2>
        <form @submit.prevent="addRoom" class="flex justify-center">
            <label for="roomName" class="mt-2 text-default mr-2">Room Name:</label>
            <input
                type="text"
                id="roomName"
                v-model="roomName"
                class="border-2 p-1 pl-2 mr-2 border-customWhite rounded-md bg-header text-white"
            />

            <button
                type="submit"
                class="inline-flex items-center justify-center px-4 py-1 bg-header text-highlight text-sm font-medium rounded-md border-2 border-highlight hover:bg-highlight hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
                Add Room
            </button>
        </form>
        <h2 class="text-highlight">ROOM LIST</h2>
        <ul v-if="room.length > 0">
            <li v-for="(item, index) in room" :key="index">
                <p
                    :style="getRoomNameClass(item.room)"
                    class="mt-3 pr-2 md:pr-0 btn content border flex justify-center py-2 w-full border-[1px] hover:border-[#3ea0f8e6] hover:bg-[#346490] transition-colors text-sm"
                >
                    <span class="text-highlight mr-1">Room:</span> {{ item.room }}
                </p>
                <div class="grid grid-cols-3 gap-1 w-full">
                    <div
                        class="relative p-2 group"
                        v-for="(product, index) in item.items"
                        :key="product.id"
                    >
                        <div
                            class="flex justify-center items-center h-full w-full bg-body border border-customWhite rounded-md relative"
                        >
                            <div class="h-full w-1/2 p-2 flex items-center">
                                <img
                                    :src="product.image"
                                    alt="category"
                                    class="annopic opacity-100 object-contain h-[120px] w-full relative z-0"
                                />
                            </div>
                            <div class="w-1/2">
                                <h3 class="text-highlight">
                                    {{ product.name }}
                                </h3>
                                <p class="text-default font-semibold">
                                    TYPE:
                                    <span class="mr-1">{{ product.type }}</span
                                    >|
                                    <span class="ml-1">AMOUNT:{{ product.amount }}</span>
                                </p>
                                <div class="flex overflow-auto">
                                    <button
                                        class="inline-flex items-center justify-center px-2 py-1 bg-header text-red-500 text-sm font-medium rounded-md border-2 border-red-500 hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap mr-1"
                                        @click.prevent="deleteProduct(product, item.room)"
                                    >
                                        X
                                    </button>
                                    <button
                                        class="inline-flex items-center justify-center px-2 py-1 bg-header text-highlight text-sm font-medium rounded-md border-2 border-highlight hover:bg-highlight hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap mr-1"
                                        @click.prevent="decreaseFromRoom(product, item.room)"
                                    >
                                        -
                                    </button>
                                    <button
                                        class="inline-flex items-center justify-center px-2 py-1 bg-header text-highlight text-sm font-medium rounded-md border-2 border-highlight hover:bg-highlight hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap mr-1"
                                        @click.prevent="increaseFromRoom(product, item.room)"
                                    >
                                        +
                                    </button>
                                    <button
                                        class="inline-flex items-center justify-center px-1 py-1 bg-header text-green-400 text-sm font-medium rounded-md border-2 border-green-400 hover:bg-green-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                                        @click.prevent="addToCartFromRoom(product, item.room)"
                                    >
                                        ADD
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            projectData: [],
            room: [],
            roomName: '',
            shoppingList: [],
        }
    },
    methods: {
        addRoom() {
            // Create a new room and clear the form field
            // this.$emit('add-room', this.room)
            // this.room = {
            //     name: '',
            //     items: [],
            // }
            const checkRoom = this.room.findIndex((val) => val.room === this.roomName)

            if (checkRoom === -1) {
                this.room.push({ room: this.roomName, items: [] })
                this.$store.dispatch('addRoomList', this.room)
            } else {
                alert('The room name is existed! Please choose another name')
            }
        },
        deleteProduct(product, room) {
            const selectedRoom = this.room.find((val) => val.room === room)
            if (selectedRoom) {
                const itemsRoom = selectedRoom.items

                // Use filter to create a new array without the item to be deleted
                const updatedItemsRoom = itemsRoom.filter((val) => val.id !== product.id)

                // Update the items in the selected room with the new array
                selectedRoom.items = updatedItemsRoom
            }
            const updateData = this.projectData.find((val) => val.id === product.id)
            if (updateData) {
                updateData.quantity = updateData.quantity + product.amount
            }
        },
        decreaseFromRoom(product, room) {
            const updateData = this.projectData.find((val) => val.id === product.id)
            if (updateData) {
                product.amount--
                if (product.amount > 0) {
                    updateData.quantity = updateData.quantity + 1
                } else if (product.amount === 0) {
                    product.amount = 1
                    this.deleteProduct(product, room)
                }
            }
        },
        increaseFromRoom(product) {
            const updateData = this.projectData.find((val) => val.id === product.id)
            if (updateData) {
                if (updateData.quantity > 0) {
                    updateData.quantity = updateData.quantity - 1
                    product.amount++
                } else {
                    alert('Out of the quantity of this item')
                }
            }
        },
        addToCartFromRoom(product, room) {
            const selectedRoom = this.room.find((val) => val.room === room)
            if (selectedRoom) {
                const itemsRoom = selectedRoom.items

                // Use filter to create a new array without the item to be deleted
                const updatedItemsRoom = itemsRoom.filter((val) => val.id !== product.id)

                // Update the items in the selected room with the new array
                selectedRoom.items = updatedItemsRoom
            }
            // Room exists, push the data object into the room's array
            const itemId = this.shoppingList.findIndex((val) => val.id === product.id)

            if (itemId === -1) {
                this.shoppingList.push(product)
            } else {
                this.shoppingList[itemId].amount + product.amount
            }
            const modifyModal = { showModal: true, shoppingList: this.shoppingList }
            this.$store.dispatch('showShoppingList', modifyModal)
        },
        generateColorFromWord(word) {
            const colorList = [
                '#DE6FFC',
                '#D93868',
                '#52BDF2',
                '#81E014',
                '#0CE1F5',
                '#8abccf',
                '#a5d5d8',
                '#c5eddf',
                '#b08137',
            ]
            const index = this.room.findIndex((ind) => ind.room === word)

            const colorIndex = index % colorList.length

            return colorList[colorIndex]
        },
    },
    computed: {
        getRoomNameClass() {
            return (roomName) => {
                const color = this.generateColorFromWord(roomName)

                return {
                    color: color,
                    borderColor: color,
                }
            }
        },
        getDataProject() {
            const projectData = this.$store.getters['getDataProject']
            if (projectData) {
                this.projectData = projectData
            }
            return projectData
        },
        getShoppingList() {
            return this.$store.getters['getShoppingList']
        },
    },
    watch: {
        getDataProject(val) {},
        getShoppingList(val) {
            if (val) {
                this.shoppingList = val.shoppingList
            }
        },
    },
}
</script>
