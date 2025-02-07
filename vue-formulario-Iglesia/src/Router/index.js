import { createRouter, createWebHistory } from "vue-router";
import SideBar from "../components/SideBar.vue";
import ListadoMiembros from "../components/LIstadoMiembros/ListadoMiembros.vue";
import Formulario from "@/components/Formulario/Fomulario.vue";
import Login from "../components/Login/Registro/Login.vue";
import store from "../stores/store.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Login,
      name: "Login",
      meta: {
        libre: true,
      },
    },
    {
      path: "/ListadoMiembros",
      component: ListadoMiembros,
      name: "ListadoMiembros",
      meta: {
        ADM1: true,
        SAD0: true,
        MIEMB2: false,
      },
    },
    {
      path: "/Inicio",
      name: "Inicio", // 🔹 Agregar nombre a esta ruta
      component: SideBar,
      meta: {
        ADM1: true,
        SAD0: true,
        MIEMB2: true,
      },
    },
    {
      path: "/Formulario",
      name: "Formulario", // 🔹 Agregar nombre a esta ruta
      component: Formulario,
      meta: {
        ADM1: true,
        SAD0: true,
        MIEMB2: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log("Intentando acceder a:", to.name);
  console.log("Usuario actual:", store.state.usuario);

  if (to.matched.some((record) => record.meta.libre)) {
    next();
  } else if (store.state.usuario && store.state.usuario.Rol == "SAD0") {
    if (to.matched.some((record) => record.meta.SAD0)) {
      next();
    } else {
      console.log("Acceso denegado para SAD0");
    }
  } else if (store.state.usuario && store.state.usuario.Rol == "ADM1") {
    if (to.matched.some((record) => record.meta.ADM1)) {
      next();
    } else {
      console.log("Acceso denegado para ADM1");
    }
  } else if (store.state.usuario && store.state.usuario.Rol == "MIEMB2") {
    if (to.matched.some((record) => record.meta.MIEMB2)) {
      next();
    } else {
      console.log("Acceso denegado para MIEMB2");
    }
  } else {
    console.log("Redirigiendo a Login...");
    next({ name: "Login" });
  }
});

export default router;
