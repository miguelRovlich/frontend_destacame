import Vue from "vue";
import Router from "vue-router";
import Home from "./views/HomeTest.vue";
import Pasajeros from "./views/PasajerosView.vue";
import Buses from "./views/BusesView.vue";
import Trayectos from "./views/TrayectosView.vue";
import Choferes from "./views/ChoferesView.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "/",
      name: "home",
      component: Home
  },
  {
    path: "/pasajeros",
    name: "pasajeros",
    component: Pasajeros
  },

  {
    path: "/buses",
    name: "buses",
    component: Buses
  },
  
  {
    path: "/trayectos",
    name: "trayectos",
    component: Trayectos
  },
  {
    path: "/choferes",
    name: "choferes",
    component: Choferes
  },  
]
});
