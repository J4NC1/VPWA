import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  /**
  {
    path: '/',
    // try redirect to home route
    redirect: () => ({ name: 'home' })
  },
  */
  {
    path: '/',
    meta: { requiresAuth: true },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/FirstPage.vue') }
      /** { path: '/welcome', component: () => import('pages/IndexPage.vue') },**/
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/LogRegLayout.vue'),
    children: [
      { path: 'register', name: 'register', meta: { guestOnly: true }, component: () => import('pages/RegisterPage.vue') },
      { path: 'login', name: 'login', meta: { guestOnly: true }, component: () => import('pages/LoginPage.vue') }
    ]
  },
  {
    path: '/channels',
    // channels requires auth
    meta: { requiresAuth: true },
    component: () => import('layouts/ChatLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('src/pages/ChannelPage.vue') }
    ]
  }
]

export default routes
