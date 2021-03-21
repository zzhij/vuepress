/**
 * Generated by "@vuepress/internal-routes"
 */

import { injectComponentOption, ensureAsyncComponentsLoaded } from '@app/util'
import rootMixins from '@internal/root-mixins'
import GlobalLayout from "D:\\project\\app\\github\\vuepress\\node_modules\\@vuepress\\core\\lib\\client\\components\\GlobalLayout.vue"

injectComponentOption(GlobalLayout, 'mixins', rootMixins)
export const routes = [
  {
    name: "v-69c0ee05",
    path: "/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-69c0ee05").then(next)
    },
  },
  {
    path: "/index.html",
    redirect: "/"
  },
  {
    name: "v-10061e16",
    path: "/about.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-10061e16").then(next)
    },
  },
  {
    name: "v-529680b6",
    path: "/contact.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-529680b6").then(next)
    },
  },
  {
    name: "v-01a13a8a",
    path: "/css/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-01a13a8a").then(next)
    },
  },
  {
    path: "/css/index.html",
    redirect: "/css/"
  },
  {
    name: "v-2d66e0ae",
    path: "/css/one.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-2d66e0ae").then(next)
    },
  },
  {
    name: "v-1c1af92e",
    path: "/css/two.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-1c1af92e").then(next)
    },
  },
  {
    name: "v-1236e218",
    path: "/guide/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-1236e218").then(next)
    },
  },
  {
    path: "/guide/index.html",
    redirect: "/guide/"
  },
  {
    name: "v-127057a8",
    path: "/module/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-127057a8").then(next)
    },
  },
  {
    path: "/module/index.html",
    redirect: "/module/"
  },
  {
    name: "v-58b42409",
    path: "/module/one.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-58b42409").then(next)
    },
  },
  {
    name: "v-6b92363d",
    path: "/module/two.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-6b92363d").then(next)
    },
  },
  {
    path: '*',
    component: GlobalLayout
  }
]