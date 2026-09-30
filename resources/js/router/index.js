import { createRouter, createWebHistory } from 'vue-router'

const routes = []

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Gardes "connecté" et "rôle" à ajouter ici (router.beforeEach)

export default router
