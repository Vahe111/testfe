import {createRouter, createWebHistory} from 'vue-router'
import UserLogin from './components/UserLogin'
import UserProfile from './components/UserProfile'
import UserCart from './components/UserCart'
import store from './vuex'

const router = createRouter({
    history: createWebHistory(),
    mode: 'history',
    routes: [
        {path: '/', redirect: '/login'},
        {path: '/login', component: UserLogin, meta: {auth: false}},
        {path: '/profile', component: UserProfile, meta: {auth: true}},
        {path: '/cart', component: UserCart, meta: {auth: true}}
    ]
})

router.beforeEach((to, from, next) => {
    const authenticated = store.getters['user']
    if (!to.meta.auth && authenticated) {
        next('/profile')
    } else if (to.meta.auth && !authenticated) {
        next('/login')
    } else {
        next()
    }
  })

  export default router;