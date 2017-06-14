<template>
    <div id="app">
        <b-navbar toggleable type="inverse" variant="success">
            <b-nav-toggle target="nav_collapse"></b-nav-toggle>
            <b-link class="navbar-brand" to="/">
                <span>E-Commerce</span>
            </b-link>
            <b-collapse is-nav id="nav_collapse">
                <b-nav is-nav-bar>
                    <b-nav-item>Support</b-nav-item>
                    <b-nav-item>Docs</b-nav-item>
                    <b-nav-item>Contact Us</b-nav-item>
                </b-nav>
                <b-nav is-nav-bar class="ml-auto">
                    <b-nav is-nav-bar right>
                        <b-nav-item class="stats">
                            {{cart.items.length}}
                            <span v-if="cart.items.length == 1">item</span>
                            <span v-else-if="cart.items.length > 1">items</span>
                            in stock, totalling {{cartTotal | currency}}
                        </b-nav-item>
                        <b-button variant="primary" @click="viewShoppingCart">
                            View Card
                        </b-button>
                    </b-nav>
                </b-nav>
            </b-collapse>
        </b-navbar>
        <transition name="fade" mode="out-in">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>

    </div>

</template>

<script>
    import {eventBus} from './main.js'
    export default {
        name: 'app',
        data () {
            return {
                cart: {
                    items: []
                },
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
            viewShoppingCart(){
                this.$router.push("cart")
            }
        },
        created(){
            eventBus.$on('cartChange', (cart) => {
                this.cart = cart
            })

        },
        computed: {
            cartTotal(){
                let total = 0;
                this.cart.items.forEach(function (item) {
                    total += item.quantity * item.product.price
                });
                eventBus.cartTotal(total);
                return total
            }
        }

    }
</script>

<style>
    @import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
    @import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';

    /* Navigation */
    #top-navigation a,
    #top-navigation .cart-info {
        width: 100%;
    }

    /* Products */
    #products .item img {
        background-color: #000;
    }

    #products .item p.lead {
        margin-bottom: 0;
    }

    #products .item .number-in-stock {
        margin-right: 10px;
    }

    .few {
        color: #E0A14F;
    }

    .none {
        color: #C45E5E;
    }
</style>
