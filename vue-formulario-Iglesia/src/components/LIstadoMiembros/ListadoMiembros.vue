<script setup>
import axios from "axios";
import api from "@/Services/api";
import { ref, onMounted, computed } from "vue";
import store from "@/stores/store";

const usuarios = ref([]);
const loading = ref(true);
const error = ref(null);
const buscar = ref("");

// Paginación
const currentPage = ref(1);
const itemsPerPage = 15;

// Función para resetear la contraseña
const resetearContrasena = async (cui) => {
  try {
    const confirmacion = confirm(`¿Reiniciar contraseña del usuario?`);
    if (!confirmacion) return;
    let headers = { Authorization: "Bearer " + store.state.token }; // ✅ Agregar espacio después de 'Bearer'
    await api.put(
      "api/usuario/reiniciarpassword",
      {
        cui: cui,
        password: "socio.2025",
        act_password: true,
      },
      {
        headers: { Authorization: "Bearer " + store.state.token },
      }
    );
    alert("Contraseña reiniciada exitosamente, nueva password: miembro.123");
  } catch (error) {
    alert("Error al reiniciar contraseña");
    console.error(error);
  }
};

// Cargar usuarios desde la API
const loadUsuarios = async () => {
  try {
    loading.value = true;
    let headers = { Authorization: "Bearer " + store.state.token }; // ✅ Agregar espacio después de 'Bearer'
    let configuracion = { headers: headers }; // ✅ Usar 'headers' en lugar de 'header'

    const response = await api.get("api/usuario/listar", {
      headers: { Authorization: "Bearer " + store.state.token },
      params: { buscar: buscar.value },
    });
    usuarios.value = response.data;
    error.value = null;
  } catch (err) {
    error.value = "Error al cargar usuarios";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Calcular usuarios de la página actual
const paginatedUsuarios = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return usuarios.value.slice(start, start + itemsPerPage);
});

// Total de páginas
const totalPages = computed(() =>
  Math.ceil(usuarios.value.length / itemsPerPage)
);

// Cambiar página
const cambiarPagina = (pagina) => {
  if (pagina >= 1 && pagina <= totalPages.value) {
    currentPage.value = pagina;
  }
};

// Cargar datos al montar el componente
onMounted(loadUsuarios);
</script>

<template>
  <div class="container">
    <!-- Barra de búsqueda -->
    <div class="search-container">
      <input
        v-model="buscar"
        type="search"
        placeholder="Buscar usuario..."
        @input="loadUsuarios"
      />
    </div>

    <!-- Número de registros -->
    <div class="info-container">
      <span v-if="usuarios.length > 0">
        Mostrando {{ paginatedUsuarios.length }} de
        {{ usuarios.length }} usuarios
      </span>
    </div>

    <!-- Tabla de usuarios -->
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>CUI</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Nivel</th>
            <th>Fecha Registro</th>
            <th>Última Cuota</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(usuario, index) in paginatedUsuarios" :key="usuario.cui">
            <td>{{ index + 1 }}</td>
            <td class="cui">{{ usuario.cui }}</td>
            <td>{{ usuario.nombres }}</td>
            <td>{{ usuario.apellidos }}</td>
            <td>
              <span class="badge nivel">
                {{ usuario.nivelUsuario }}
              </span>
            </td>
            <td>{{ usuario.fechaRegistro }}</td>
            <td>{{ usuario.ultimoPago }}</td>
            <td>
              <span
                class="badge estado"
                :class="{ activo: usuario.estado === 'ACTIVO' }"
              >
                {{ usuario.estado }}
              </span>
            </td>
            <td>
              <button
                @click="resetearContrasena(usuario.cui)"
                class="reset-btn"
                title="Reiniciar contraseña"
              >
                &#8635;
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="usuarios.length === 0" class="empty-message">
        No se encontraron usuarios
      </div>
    </div>

    <!-- Paginación -->
    <div v-if="totalPages > 1" class="pagination">
      <button
        @click="cambiarPagina(currentPage - 1)"
        :disabled="currentPage === 1"
      >
        ‹ Anterior
      </button>

      <span>Página {{ currentPage }} de {{ totalPages }}</span>

      <button
        @click="cambiarPagina(currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
        Siguiente ›
      </button>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.search-container {
  margin-bottom: 20px;
}

.search-container input {
  width: 100%;
  max-width: 400px;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.search-container input:focus {
  outline: none;
  border-color: #2196f3;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
}

.info-container {
  margin-bottom: 10px;
  font-size: 14px;
  color: #555;
}

.table-wrapper {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

th,
td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
  color: #333;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #333;
}

tr:hover {
  background-color: #f5f5f5;
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.85em;
  font-weight: 500;
}

.badge.nivel {
  background-color: #e3f2fd;
  color: #1976d2;
}

.badge.estado {
  background-color: #ffebee;
  color: #d32f2f;
}

.badge.estado.activo {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.reset-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #d32f2f;
  font-size: 1.2em;
  padding: 5px;
  transition: color 0.3s ease;
}

.reset-btn:hover {
  color: #b71c1c;
}

.empty-message {
  text-align: center;
  padding: 20px;
  color: #666;
}

.cui {
  font-family: monospace;
  color: #555;
}

/* Paginación */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  background: #1976d2;
  color: white;
  border: none;
  padding: 8px 12px;
  margin: 0 5px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.pagination button:hover {
  background: #1259a3;
}

.pagination button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }

  table {
    min-width: 600px;
  }
}
</style>
