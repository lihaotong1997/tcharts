import {createRouter, createWebHistory,  } from "vue-router";
const routes = [
    {
        path: '/',
        component:()=>import("@/components/index.vue"),
        children: [
            {
                path: "",
                component:()=>import("@/components/create/index/index.vue"),
            },
        ]
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router;