// @unocss-include
import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "components/Layout/Layout";
import components from "router/modules/components";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      redirect: "/dashboard",
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          meta: { title: "dashboard", icon: "i-humbleicons-dashboard" },
          component: () => import("views/Dashboard/Dashboard")
        },
        components,
        {
          path: "generator",
          name: "Generatore",
          meta: { title: "generator", icon: "" },
          component: () => import("views/Generator/Generator")
        }
        //     {
        //       path: 'guide',
        //       name: 'Guide',
        //       meta: { title: 'guide', icon: 'i-ep-guide' },
        //       component: () => import('views/Guide/Guide.vue')
        //     },
        //     {
        //       path: 'theme',
        //       name: 'Theme',
        //       meta: { title: 'theme', icon: 'i-icon-park-outline-theme' },
        //       component: () => import('views/Theme/Theme.vue')
        //     },
        //     {
        //       path: 'i18n',
        //       name: 'I18n',
        //       meta: { title: 'i18n', icon: 'i-ion-earth' },
        //       component: () => import('views/I18n/I18n.vue')
        //     },
        //     {
        //       path: 'test',
        //       name: 'Test',
        //       meta: { title: 'test' },
        //       component: () => import('views/Test/Test.vue')
        //     }
        //   ]
        // },
        // {
        //   path: '/swiper',
        //   name: 'swiper',
        //   component: () => import('@/views/Swiper.vue')
        // },
        // {
        //   path: '/confetti',
        //   name: 'confetti',
        //   component: () => import('@/views/CanvasConfetti.vue')
        // },
        // {
        //   path: '/:pathMatch(.*)*',
        //   component: () => import('components/NotFound/NotFound.vue')
        // }
      ]
    }]
});

export default router;
