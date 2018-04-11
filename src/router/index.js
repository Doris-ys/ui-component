import Vue from 'vue'
import Router from 'vue-router'
import Picker from '@/modules/picker'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Picker',
        component: Picker
    }]
})
