import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home.vue'
import Main from "../views/Main.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/login", name: "login", component: () => import("../views/Login.vue"), meta:{ isPublic:true} },
  {
    path: "/",
    name: "Main",
    component: Main,
    children: [
      { path: "categories/create", component: () => import("../views/CategoryEdit.vue") },
      { path: "categories/edit/:id", component: () => import("../views/CategoryEdit.vue"), props: true },
      { path: "categories/list", component: () => import("../views/CategoryList.vue") },

      { path: "items/create", component: () => import("../views/ItemEdit.vue") },
      { path: "items/edit/:id", component: () => import("../views/ItemEdit.vue"), props: true },
      { path: "items/list", component: () => import("../views/ItemList.vue") },

      { path: "heros/create", component: () => import("../views/HeroEdit.vue") },
      { path: "heros/edit/:id", component: () => import("../views/HeroEdit.vue"), props: true },
      { path: "heros/list", component: () => import("../views/HeroList.vue") },

      { path: "articles/create", component: () => import("../views/ArticleEdit.vue") },
      { path: "articles/edit/:id", component: () => import("../views/ArticleEdit.vue"), props: true },
      { path: "articles/list", component: () => import("../views/ArticleList.vue") },

      { path: "ads/create", component: () => import("../views/AdEdit.vue") },
      { path: "ads/edit/:id", component: () => import("../views/AdEdit.vue"), props: true },
      { path: "ads/list", component: () => import("../views/AdList.vue") },

      { path: "admin_users/create", component: () => import("../views/AdminUserEdit.vue") },
      { path: "admin_users/edit/:id", component: () => import("../views/AdminUserEdit.vue"), props: true },
      { path: "admin_users/list", component: () => import("../views/AdminUserList.vue") }
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to,from,next)=>{
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})

export default router;
