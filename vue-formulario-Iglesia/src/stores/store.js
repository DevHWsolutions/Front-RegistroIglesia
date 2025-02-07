import { createStore } from "vuex";
import { jwtDecode } from "jwt-decode";

import router from "../Router/index.js";

export default createStore({
  state: {
    token: null,
    usuario: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUsuario(state, usuario) {
      state.usuario = usuario;
    },
  },
  actions: {
    guardarToken({ commit }, token) {
      commit("setToken", token);
      commit("setUsuario", jwtDecode(token)); // ✅ Uso correcto de jwtDecode
      localStorage.setItem("token", token);
    },
    autoLogin({ commit }) {
      let token = localStorage.getItem("token");
      if (token) {
        commit("setToken", token);
        commit("setUsuario", jwtDecode(token)); // ✅ Uso correcto
      }
      router.push({ name: "Inicio" });
    },
    salir({ commit }) {
      commit("setToken", null);
      commit("setUsuario", null);
      localStorage.removeItem("token");
      router.push({ name: "Login" });
    },
  },
  getters: {
    getCUI: (state) => state.cui, // Getter para obtener el CUI en los componentes
  },
});
