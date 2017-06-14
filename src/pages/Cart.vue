<template>
    <div id="app">
        <div class="container card card-block mt-3">
            <b-jumbotron header="Card"
                         lead="Your card items:"
                         v-if="cart.items.length > 0">
                <div class="justify-content-centermy-1 row  mb-2">
                    <b-form-fieldset horizontal label="Rows per page" class="col-6" :label-size="6">
                        <b-form-select :options="[{text:5,value:5},{text:10,value:10},{text:15,value:15}]"
                                       v-model="perPage">
                        </b-form-select>
                    </b-form-fieldset>

                    <b-form-fieldset horizontal label="Filter" class="col-6" :label-size="2">
                        <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
                    </b-form-fieldset>
                </div>

                <!-- Main table element -->
                <b-table striped bordered hover success
                         :items="cart.items"
                         :fields="fields"
                         :current-page="currentPage"
                         :per-page="perPage"
                         :filter="filter">
                    <template slot="id" scope="item">
                        {{item.item.product.id}}
                    </template>
                    <template slot="name" scope="item">
                        {{item.item.product.name}}
                    </template>
                    <template slot="quantity" scope="item">
                        <b-button variant="danger" @click="decreaseQuantity(item.item)">-</b-button>
                        &nbsp;
                        {{item.item.quantity}}
                        &nbsp;
                        <b-button variant="success" @click="increaseQuantity(item.item)"
                                  :disabled="item.item.product.inStock == 0">
                            +
                        </b-button>

                    </template>
                    <template slot="price" scope="item"> {{ item.item.quantity * item.item.product.price | currency}}
                    </template>
                </b-table>
                <p class="lead d-flex flex-row-reverse">Subtotal: {{cartTotal | currency}}</p>
                <p class="lead d-flex flex-row-reverse">Taxes: {{taxAmount | currency}}</p>
                <p class="lead d-flex flex-row-reverse">Grand Total: {{cartTotal + taxAmount | currency}}</p>
                <p class="lead d-flex flex-row-reverse">
                    <click-confirm>
                        <b-button variant="primary" @click="checkout">
                            Checkout
                        </b-button>
                    </click-confirm>
                </p>
                <div class="justify-content-center row my-1">
                    <b-pagination size="md" :total-rows="this.cart.items.length" :per-page="perPage"
                                  v-model="currentPage"/>
                </div>
            </b-jumbotron>

            <b-jumbotron header="Card"
                         lead="Your cart is Empty"
                         v-else>
            </b-jumbotron>
        </div>

    </div>

</template>

<script>
    import {eventBus} from '../main.js'
    export default {
        name: 'app',
        data () {
            return {
                cart: {
                    items: []
                },
                cartTotal: 0,
                fields: {
                    id: {
                        label: 'ID',
                        sortable: true,

                    },
                    name: {
                        label: 'Name',
                        sortable: true,

                    },
                    quantity: {
                        label: 'Quantity',
                        sortable: true,
                    },
                    price: {
                        label: 'Price',
                        sortable: true,
                    }
                },
                currentPage: 1,
                perPage: 5,
                filter: null
            }
        },
        filters: {
            currency(value){
                const formatter = Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: "USD",
                    minimumFractionDigits: 0
                });
                return formatter.format(value)
            }
        },
        methods: {
            increaseQuantity(cartItem){
                cartItem.product.inStock--;
                cartItem.quantity++;
            },
            decreaseQuantity(cartItem){
                cartItem.product.inStock++;
                cartItem.quantity--;
                if (!cartItem.quantity) {
                    let i = this.cart.items.indexOf(cartItem);
                    this.cart.items.splice(i, 1);
                }
            },
            checkout(){
                this.cart.items.forEach(function (item) {
                    item.product.inStock += item.quantity
                });
                this.cart.items = []
            }
        },
        computed: {
            taxAmount(){
                return ((this.cartTotal * 10) / 100)
            }
        },
        created(){
            eventBus.$on('cartChange', (cart) => this.cart = cart);
            eventBus.$on('cartTotal', (cartTotal) => this.cartTotal = cartTotal);
        }
    }
</script>

<style>
    @import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
    @import '../../node_modules/bootstrap-vue/dist/bootstrap-vue.css';

</style>
