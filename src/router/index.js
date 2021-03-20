import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    component: Home,
    name: "Home",
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/feed",
    name: "Feed",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "feed" */ "../views/Feed.vue"),
  },
  {
    path: "/tasks",
    name: "Tasks",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "task" */ "../views/Tasks.vue"),
  },
  {
    path: "/create-module",
    name: "CreateModule",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/CreateModule.vue"),
  },
  {
    path: "/find-modules",
    name: "FindModules",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/FindModules.vue"),
  },
  {
    path: "/create",
    name: "Create",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/Create.vue"),
  },
  {
    path: "/create-post",
    name: "post",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/CreateTask.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (!store.getters["users/isLoggedIn"] && to.name !== "Login") {
    if (window.localStorage) {
      if (
        window.localStorage.getItem("access_token") ||
        window.localStorage.getItem("password")
      ) {
        store
          .dispatch("users/login")
          .then(() => {
            if (store.getters["users/isLoggedIn"]) {
              next();
            } else {
              next({ path: "/login", query: { redirect: to.name } });
            }
          })
          .catch(() => {
            next({ path: "/login", query: { redirect: to.name } });
          });
      } else {
        next({ path: "/login", query: { redirect: to.name } });
      }
    }
  }
  next();
});

export default router;
