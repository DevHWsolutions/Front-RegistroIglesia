<template>
  <div class="layout">
    <!-- Header -->
    <header class="header">
      <h1 class="titulo">Sistema de Gestión de Miembros de Hermandad</h1>
      {{ CUI }} - {{ NombreUsuario }}
    </header>

    <!-- Sidebar -->
    <aside class="sidebar">
      <nav>
        <ul>
          <li
            @click="activeTab = 'listado'"
            :class="{ active: activeTab === 'listado' }"
            v-if="esSAD || esAdministrador"
          >
            Listado de Miembros
          </li>
          <li
            v-if="esSAD || esAdministrador || esMiembros"
            @click="activeTab = 'informacion'"
            :class="{ active: activeTab === 'informacion' }"
          >
            Información Miembro
          </li>
          <li @click="salir()">Salir</li>
        </ul>
      </nav>
    </aside>

    <!-- Contenido Principal -->
    <main class="content">
      <div v-if="activeTab === 'listado' && esAdministrador">
        <h3>Listado de Miembros:</h3>
        <ListadoMiembros />
      </div>
      <div
        v-if="
          activeTab === 'informacion' && (esSAD || esAdministrador || esMiembro)
        "
      >
        <Formulario />
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>&copy; 2025 Iglesia Calvario - Todos los derechos reservados</p>
      <p>Desarrollado por HWSolutions - Enero 2025</p>
    </footer>
  </div>
</template>

<script>
import ListadoMiembros from "./LIstadoMiembros/ListadoMiembros.vue";
import Formulario from "../components/Formulario/Fomulario.vue";
import store from "@/stores/store";

export default {
  components: {
    Formulario,
    ListadoMiembros,
  },
  data() {
    return {
      activeTab: "informacion", // Pestaña por defecto
    };
  },
  computed: {
    logueado() {
      return store.state.usuario;
    },
    esSAD() {
      return store.state.usuario && store.state.usuario.Rol == "SADM";
    },
    esAdministrador() {
      return store.state.usuario && store.state.usuario.Rol == "ADM1";
    },
    esMiembro() {
      return store.state.usuario && store.state.usuario.Rol == "MIEMB2";
    },
    CUI() {
      return store.state.usuario.CUI;
    },
    NombreUsuario() {
      return store.state.usuario.NombreCompleto;
    },
  },
  created() {
    store.dispatch("autoLogin");
  },

  methods: {
    salir() {
      // alert("Saliendo...");
      store.dispatch("salir");
      // Aquí puedes manejar la salida del usuario (cerrar sesión, redireccionar, etc.)
    },
  },
};
</script>

<style scoped>
/* General */
.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 80px 1fr 60px;
  height: 100vh;
  gap: 10px;
  font-family: "Arial", sans-serif;
  background-color: #262529;
  padding: 10px;
  /* border-radius: 10px; */
}

/* Header y Footer */
.header,
.footer {
  grid-column: span 2;
  background-color: #4a3170;
  color: #efe70dc2;
  text-align: center;
  padding: 15px;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}

.footer {
  font-size: 14px;
}

/* Sidebar */
.sidebar {
  background: #2c3e50;
  color: white;
  padding: 20px;
  border-radius: 10px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s;
  text-align: center;
}

.sidebar li:hover,
.sidebar li.active {
  background: #1abc9c;
}

/* Contenido Principal */
.content {
  background-color: #4d4c4c;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #ececec;
  box-shadow: 0px 4px 6px rgba(46, 42, 42, 0.3);
  color: white;
}

.titulo {
  font-size: 28px;
  color: #efe70dc2;
  margin: 0;
}
</style>
