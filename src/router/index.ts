import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      // components: {master:HomeView},
      children: [
        // {
        //   path: '',
        //   name: 'init',
        //   component: () => import('../views/InitView.vue')
        // },
        // {
        //   path: '',
        //   name: 'game',
        //   component: () => import('../views/GameView.vue')
        // }
      ]
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   route level code-splitting
    //   this generates a separate chunk (About.[hash].js) for this route
    //   which is lazy-loaded when the route is visited.
    //   components: {master: () => import('../views/LoginView.vue')}
    // }
  ]
})

export default router
