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
      <button class="btn_descargar-listado" @click="DescargarInformacion">
        Descargar Listado
      </button>
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
      <table id="miTabla">
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

<script setup>
import axios from "axios";
import api from "@/Services/api";
import { ref, onMounted, computed } from "vue";
import store from "@/stores/store";
import * as XLSX from "xlsx"; // Asegúrate de importar la librería

const usuarios = ref([]);
const loading = ref(true);
const error = ref(null);
const buscar = ref("");

// Paginación
const currentPage = ref(1);
const itemsPerPage = 6;

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
    alert("Contraseña reiniciada exitosamente, nueva password: socio.2025");
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

//Metodo para descargar informacion
const DescargarInformacion = async () => {
  try {
    let headers = { Authorization: "Bearer " + store.state.token };

    // Obtener datos de la API
    const response = await api.get("api/Miembro/DescargarListado", { headers });
    const OBJ = response.data; // Datos obtenidos

    // Definir los encabezados
    const Header = [
      "CUI",
      "Estado",
      "Tipo",
      "Fecha Ingreso",
      "Nombres",
      "Apellidos",
      "Sexo",
      "Fecha de Nacimiento",
      "Info Papa",
      "Info Mama",
      "Dirección",
      "Zona",
      "Referencia",
      "Teléfono 1",
      "Teléfono 2",
      "Correo",
      "Nombres Padrino",
      "Teléfono Padrino",
      "Beneficiario Miembro",
      "Tipo Relación",
      "Beneficiario Dirección",
      "Beneficiario Teléfono",
      "Última Cuota Pagada",
    ];

    // Definir las claves del objeto que queremos mapear
    const Field = [
      "cui",
      "estado",
      "tipo",
      "fechaIngreso",
      "nombres",
      "apellidos",
      "sexo",
      "fechaNacimiento",
      "infoPapa",
      "infoMama",
      "direccion",
      "zona",
      "referencia",
      "telefono1",
      "telefono2",
      "correo",
      "nombresPadrino",
      "telefonoPadrino",
      "beneficiarioMiembro",
      "tipoRelacion",
      "beneficiarioDireccion",
      "beneficiarioTelefono",
      "ultimaCuotaPagada",
    ];

    // Mapear los datos para que coincidan con los encabezados
    const Data = OBJ.map((item) => Field.map((field) => item[field] || "")); // Si el campo no existe, se pone ""

    // Crear una hoja de Excel con los datos
    const ws = XLSX.utils.aoa_to_sheet([Header, ...Data]);

    // Aplicar estilos a los encabezados (negrita y centrado)
    const range = XLSX.utils.decode_range(ws["!ref"]); // Obtener el rango de celdas
    for (let C = range.s.c; C <= range.e.c; C++) {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: C }); // Obtener la celda de la primera fila
      if (!ws[cellRef]) continue;
      ws[cellRef].s = {
        font: { bold: true }, // Negrita
        alignment: { horizontal: "center", vertical: "center" }, // Centrado
      };
    }

    // Crear un libro de Excel
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ListadoGeneral");

    // Exportar el archivo Excel
    XLSX.writeFile(wb, "ListadoSocios.xlsx");
    console.log("Archivo generado con éxito");
  } catch (error) {
    console.error("Error al descargar la información:", error);
  }
};
const FormatJSon = (FilterData, JsonData) => {
  return JsonData.map((v) =>
    FilterData.map((j) => {
      return v[j] ?? "N/A";
    })
  );
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
  color: rgb(250, 250, 13);
  text-align: center;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
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
.btn_descargar-listado {
  margin-left: 5px;
  background: #ffa500;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 10px;
}

.btn_descargar-listado :hover {
  background: #ff8c00;
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
