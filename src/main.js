import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import ClickConfirm from 'click-confirm/src/ClickConfirm.vue'
import router from "./router";

Vue.use(BootstrapVue);


export const eventBus = new Vue({
    methods: {
        changeCart(cart){
            this.$emit('cartChange', cart)
        },
        cartTotal(cartTotal){
            this.$emit('cartTotal', cartTotal)
        }
    }
});
Vue.component('clickConfirm', ClickConfirm);
new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
}).$mount('#app');
