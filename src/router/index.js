import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Landing from "../views/Landing.vue";
import Planet from "../views/Planet.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "landing",
    component: Landing
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/planet",
    name: "planet",
    component: Planet,
    children: [
      {
        path: "sun",
        component: () => {
          return import("../components/Sun.vue");
        },
        alias: [""]
      },
      {
        path: "moon",
        component: () => {
          return import("../components/Moon.vue");
        }
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/About.vue')
  //   }
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
