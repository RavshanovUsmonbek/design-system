const SimpleList = {
    props: {
        itemsList1: {
            default: []
        }
    },
    data() {
        return {
            selectedItems1: [],
        }
    },
    watch: {
        selectedItems1: (val) => {
            console.log(`SELECTED ITEMS: ${val}`)
        }
    },
    template:`
            <div id="simpleList" class="dropdown_simple-list">
                <button class="btn btn-secondary btn-select dropdown-toggle" type="button"
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Select Step
                </button>
                <ul class="dropdown-menu close-outside"
                    v-if="itemsList1.length > 0">
                    <li class="dropdown-menu_item d-flex align-items-center px-3" v-for="item in itemsList1" :key="item.id">
                        <input
                            class="mr-2 custom-checkbox"
                            type="checkbox"
                            :id="item.id"
                            :value="item"
                            v-model="selectedItems1">
                        <label
                            class="mb-0 w-100 d-flex align-items-center"
                            :for="item.id">
                            <span class="w-100 d-inline-block ml-3">{{ item.title }}</span>
                        </label>
                    </li>
                </ul>
                <div class="dropdown-menu py-0" v-else>
                    <span class="px-3 py-2 d-inline-block">There are no any steps.</span>
                </div>
            </div>`
}

const TreeList = {
    data() {
        return {
            itemsListTree: [
                { id: 1, title: 'Items Group 1', showItems: true, items: [
                        { id: 2, title: 'Items Group 1.1' },
                        { id: 3, title: 'Items Group 1.2', showItems: true, items: [
                                { id: 4, title: 'Items Group 1.1.1' },
                            ]
                        },
                    ]
                },
                { id: 5, title: 'Items Group 2', showItems: true, items: [
                        { id: 6, title: 'Items Group 2.1' },
                        { id: 7, title: 'Items Group 2.2' },
                    ]
                },
                { id: 9, title: 'Items Group 3' },
            ],
            selectedItems: [],
        }
    },
    watch: {
        selectedItems: (val) => {
            console.log(`SELECTED TREE ITEMS: ${val}`)
        }
    },
    template: `
            <div class="dropdown_tree-list">
                <button class="btn btn-select btn-secondary dropdown-toggle" type="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Select Step
                </button>
                <div class="dropdown-menu close-outside pt-3 pb-0">
                    <div v-for="item1lvl in itemsListTree" :key="item1lvl.id">
                        <p class="d-flex align-items-center px-3 position-relative">
                             <i class="fa fa-sort-down position-absolute"
                                v-if="item1lvl.items"
                                @click="item1lvl.showItems = !item1lvl.showItems"
                                :style="[!item1lvl.showItems ? 'transform: rotate(270deg)' : '']"
                            ></i>
                            <input
                                class="mr-2 custom-checkbox"
                                type="checkbox"
                                :id="item1lvl.title+'-'+item1lvl.id"
                                :value="item1lvl.id"
                                v-model="selectedItems">
                            <label
                                class="w-full d-inline-block mb-0"
                                :class="{'arrow_label' : item1lvl.items}"
                                :for="item1lvl.title+'-'+item1lvl.id">
                                <span class="ml-3">{{ item1lvl.title }}</span>
                            </label>
                        </p>
                        <div v-if="item1lvl.items && item1lvl.showItems" class="ml-4">
                            <div v-for="item2lvl in item1lvl.items" :key="item2lvl.id">
                                <p class="d-flex align-items-center px-3 position-relative">
                                    <i class="fa fa-sort-down position-absolute"
                                        v-if="item2lvl.items"
                                        @click="item2lvl.showItems = !item2lvl.showItems"
                                        :style="[!item2lvl.showItems ? 'transform: rotate(270deg)' : '']"
                                    ></i>
                                    <input
                                        class="mr-2 custom-checkbox"
                                        type="checkbox"
                                        :id="item2lvl.title+'-'+item2lvl.id"
                                        :value="item2lvl.id"
                                        v-model="selectedItems">
                                    <label 
                                        class="w-full d-inline-block mb-0"
                                        :class="{'arrow_label' : item2lvl.items}"
                                        :for="item2lvl.title+'-'+item2lvl.id">
                                        <span class="ml-3">{{ item2lvl.title }}</span>
                                    </label>
                                </p>
                                <div v-if="item2lvl.items && item2lvl.showItems" class="ml-4">
                                    <div v-for="item3lvl in item2lvl.items" :key="item3lvl.id">
                                        <p class="d-flex align-items-center px-3">
                                            <input
                                                class="mr-2 custom-checkbox"
                                                :class="{'arrow_label' : item3lvl.items}"
                                                type="checkbox"
                                                :id="item3lvl.title+'-'+item3lvl.id"
                                                :value="item3lvl.id"
                                                v-model="selectedItems">
                                            <label
                                                class="w-full d-inline-block mb-0"
                                                :for="item3lvl.title+'-'+item3lvl.id">
                                                <span class="ml-3">{{ item3lvl.title }}</span>
                                            </label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
}

const ComplexList = {
    data() {
        return {
            inputSearch: '',
            itemsList: [...Array(5).keys()].map((item, index) => (
                { id: Math.round(Math.random() * 1000), title: `Step ${index + 1}`}
            )),
            refSearchId: 'refSearchCbx'+Math.round(Math.random() * 1000),
            selectedItems: [],
            closeOnItem: true,
        }
    },
    computed: {
        foundItems() {
            return this.inputSearch ?
                this.itemsList.filter(item => item.title.toUpperCase().includes(this.inputSearch.toUpperCase())) :
                this.itemsList
        }
    },
    watch: {
        selectedItems: function (val) {
            if (this.selectedItems.length !== this.itemsList.length) {
                this.$refs[this.refSearchId].checked = false;
            }
        }
    },
    methods: {
        handlerSelectAll() {
            if (this.selectedItems.length !== this.itemsList.length) {
                this.selectedItems = [...this.itemsList];
            } else {
                this.selectedItems.splice(0);
            }
        }
    },
    template: `
        <div id="complexList" class="complex-list">
            <button class="btn btn-select dropdown-toggle" type="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span v-if="selectedItems.length > 0">{{ selectedItems.length }} selected</span>
                <span v-else class="complex-list_empty">Select Step</span>
            </button>
            <div class="dropdown-menu"
                :class="{'close-outside': closeOnItem}">
                <div v-if="itemsList.length > 4" class="px-3 py-2">
                    <div class="custom-input custom-input__search position-relative">
                        <input
                            type="text"
                            placeholder="Search"
                            v-model="inputSearch">
                        <img src="assets/ico/search.svg" class="icon-search position-absolute">
                    </div>
                </div>
                <ul class="my-0">
                    <li
                        class="dropdown-item dropdown-menu_item d-flex align-items-center">
                        <input
                            :id="refSearchId"
                            :ref="refSearchId"
                            class="mr-2 custom-checkbox"
                            type="checkbox">
                        <label
                            @click="handlerSelectAll"
                            :for="refSearchId"
                            class="mb-0 w-100 d-flex align-items-center">
                            <span class="w-100 d-inline-block ml-3">All</span>
                        </label>
                    </li>
                    <li
                        class="dropdown-item dropdown-menu_item d-flex align-items-center"
                        v-for="item in foundItems" :key="item.id">
                        <input
                            class="mr-2 custom-checkbox"
                            type="checkbox"
                            :id="item.id"
                            :value="item"
                            v-model="selectedItems">
                        <label
                            class="mb-0 w-100 d-flex align-items-center"
                            :for="item.id">
                            <span class="w-100 d-inline-block ml-3">{{ item.title }}</span>
                        </label>
                    </li>
                </ul>
                <div class="p-3">
                    <button class="btn btn-basic" type="submit">Primary</button>
                    <button type="button" class="btn btn-secondary">Secondary</button>
                </div>
            </div>
        </div>`
};

const dropdownsApp = Vue.createApp({
    components: {
        'simple-list': SimpleList,
        'tree-list': TreeList,
        'complex-list': ComplexList,
    }
});

dropdownsApp.mount('#dropdowns');

$(".dropdown-menu.close-outside").on("click", function (event) {
    event.stopPropagation();
});