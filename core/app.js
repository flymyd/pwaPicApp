/**
 * @file entry
 * @author myd(flymyd@foxmail.com)
 */

import Vue from 'vue';
import Meta from 'vue-meta';

import {createRouter} from '@/.lavas/router';
import {createStore} from '@/.lavas/store';
import AppComponent from './App.vue';
import VueResource from 'vue-resource'
import Vuetify from 'vuetify';
import Axios from 'axios'

Vue.prototype.$http=Axios;
Vue.use(Meta);
Vue.use(VueResource);
Vue.use(Vuetify);

Vue.config.productionTip = false;


export function createApp() {
    let router = createRouter();
    let store = createStore();
    let App = Vue.extend({
        router,
        store,
        ...AppComponent
    });
    return {App, router, store};
}

if (module.hot) {
    module.hot.accept();
}
