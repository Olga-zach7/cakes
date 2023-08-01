import { createRouter, createWebHistory } from 'vue-router'


// Компоненты страниц
import CakesAll from './views/CakesAll.vue';
import CakeAdmin from './views/CakeAdmin.vue';
import CakePage from './views/CakePage.vue';


export default createRouter({
    // История переходов сохраняется
    history: createWebHistory(),


    // Роуты и компоненты
    routes: [
        {
            path: '/',
            name: 'cakes',
            component: CakesAll,
        },
        {
            path: '/admin',
            name: 'admin',
            component: CakeAdmin
        },
        {
            path: '/cake/:id',
            name: 'cake-info',
            component: CakePage
        },
        {
            path: '/my',
            name: 'my',
            component: CakesAll
        }
    ]
})