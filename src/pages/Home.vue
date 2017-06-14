<template>
    <div id="app">
        <b-jumbotron header="BootstrapVue"
                     lead="Bootstrap 4 Components for Vue.js 2">
            <div class="row">
                <div class="col-4" v-for="product in products">
                    <b-card img="http://placehold.it/400x250/000/fff"
                            size="lg"
                            :title="product.name"
                            :sub-title="product.description"
                            show-footer
                            class="mb-2">
                        <div slot="footer">
                            <div class="d-flex justify-content-start">
                                <div class="p-2">{{product.price | currency}}</div>
                                <div class="p-2" :class="{few: product.inStock < 10, none: product.inStock == 0}">
                                    {{product.inStock}} in stock
                                </div>
                                <div class="ml-auto p-2">
                                    <b-button variant="primary" :disabled="product.inStock < 1"
                                              @click="addProductToCart(product)">
                                        View Card
                                    </b-button>
                                </div>
                            </div>
                        </div>
                    </b-card>
                </div>
            </div>
        </b-jumbotron>
    </div>

</template>

<script>
    import {eventBus} from '../main.js'
    export default {
        name: 'app',
        data () {
            return {
                products: [
                    {
                        id: 1,
                        name: 'MacBook Pro (15 inch)',
                        description: 'This laptop has a super crisp Retina display. Yes, we know that it\'s overpriced...',
                        price: 2999,
                        inStock: 50
                    },
                    {
                        id: 2,
                        name: 'Samsung Galaxy Note 7',
                        description: 'Unlike the overpriced MacBook Pro, we\'re selling this one a bit cheap, as we heard it might explode...',
                        price: 299,
                        inStock: 755
                    },
                    {
                        id: 3,
                        name: 'HP Officejet 5740 e-All-in-One-printer',
                        description: 'This one might not last for so long, but hey, printers never work anyways, right?',
                        price: 149,
                        inStock: 5
                    },
                    {
                        id: 4,
                        name: 'iPhone 7 cover',
                        description: 'Having problems keeping a hold of that phone, huh? Ever considered not dropping it in the first place?',
                        price: 49,
                        inStock: 42
                    },
                    {
                        id: 5,
                        name: 'iPad Pro (9.7 inch)',
                        description: 'We heard it\'s supposed to be pretty good. At least that\'s what people say.',
                        price: 599,
                        inStock: 0
                    },
                    {
                        id: 6,
                        name: 'OnePlus 3 cover',
                        description: 'Does your phone spend most of its time on the ground? This cheap piece of plastic is the solution!',
                        price: 19,
                        inStock: 81
                    }
                ],
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
            addProductToCart(product){
                let items = this.cart.items;
                let search = items.find(x => x.product === product);
                if (search) {
                    search.quantity++;
                } else {
                    items.push({
                        product: product,
                        quantity: 1
                    });
                }
                product.inStock--;
                eventBus.changeCart(this.cart);
            }
        }
    }
</script>

<style>
</style>
