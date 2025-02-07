<template>
  <div class="contenedor-login">
    <!-- Imagen del lado izquierdo -->
    <div class="columna-imagen">
      <img src="../../../assets/DiseñoIglesia2.jpg" alt="Imagen" />
    </div>

    <!-- Formulario del lado derecho -->
    <div class="columna-formulario">
      <div class="form-container">
        <h2>{{ esRegistro ? "Registro" : "Iniciar Sesión" }}</h2>

        <form
          @submit.prevent="esRegistro ? registrarUsuario() : iniciarSesion()"
        >
          <!-- Campos extra si está en modo Registro -->
          <div v-if="esRegistro">
            <div class="form-group">
              <label for="nombres">Nombres:</label>
              <input
                type="text"
                id="nombres"
                v-model="nombres"
                placeholder="Ingrese sus nombres"
                required
              />
            </div>
            <div class="form-group">
              <label for="apellidos">Apellidos:</label>
              <input
                type="text"
                id="apellidos"
                v-model="apellidos"
                placeholder="Ingrese sus apellidos"
                required
              />
            </div>

            <!-- <div class="form-group">
              <label for="Ingreso">Fecha ingreso a Hermandad:</label>
              <input
                type="date"
                id="fechaIngreso"
                v-model="password"
                :max="fechaMaxima"
                :min="fechaMinima"
                required
              />
              <p v-if="errorFecha" class="error">{{ errorFecha }}</p>
            </div> -->

            <div class="form-group">
              <label for="Ingreso">¿Cuál su última cuota cancelada?:</label>
              <select id="ultimoAnio" v-model="ultimoAnio" class="" required>
                <option value="" disabled>Seleccione un año</option>
                <option v-for="anio in listaAnios" :key="anio" :value="anio">
                  {{ anio }}
                </option>
              </select>
              <p v-if="error" class="error">Este campo es obligatorio</p>
            </div>
          </div>

          <!-- Campos comunes -->
          <div class="form-group">
            <label for="cui">CUI:</label>
            <input
              type="text"
              id="cui"
              v-model="cui"
              placeholder="Ingrese su CUI"
              @input="validarCUI"
              maxlength="13"
              pattern="\d*"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>

          <button type="submit" class="btn-accion">
            {{ esRegistro ? "Registrarse" : "Iniciar Sesión" }}
          </button>
        </form>

        <!-- Botón para alternar entre Registro e Inicio de Sesión -->
        <button class="btn-secundario" @click="esRegistro = !esRegistro">
          {{
            esRegistro
              ? "¿Ya tienes cuenta? Iniciar Sesión"
              : "¿No tienes cuenta? Registrarse"
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import api from "@/Services/api";
import store from "@/stores/store";
import router from "@/Router";

// Estado para alternar entre Registro y Login
const esRegistro = ref(false);

// Variables de datos del formulario
const cui = ref("");
const nombres = ref("");
const apellidos = ref("");
const password = ref("");

const ultimoAnio = ref("");
const error = computed(() => ultimoAnio.value === "");

// Generar lista de años desde 2020 hasta el año actual
const anioActual = new Date().getFullYear();
const listaAnios = Array.from(
  { length: anioActual - 2019 },
  (_, i) => 2020 + i
);

// Estado del input
const fechaIngreso = ref("");

// Obtener la fecha de hoy y la de hace 100 años
const hoy = new Date();
const hace100Anios = new Date();
hace100Anios.setFullYear(hoy.getFullYear() - 100);

// Convertir fechas a formato YYYY-MM-DD para usarlas en `min` y `max`
const formatoFecha = (fecha) => fecha.toISOString().split("T")[0];

const fechaMaxima = computed(() => formatoFecha(hoy));
const fechaMinima = computed(() => formatoFecha(hace100Anios));

// Mensaje de error
const errorFecha = computed(() => {
  if (!fechaIngreso.value) return "";
  const fechaSeleccionada = new Date(fechaIngreso.value);
  if (fechaSeleccionada > hoy)
    return "⚠ No puedes seleccionar una fecha futura.";
  if (fechaSeleccionada < hace100Anios)
    return "⚠ La fecha no puede ser menor a 100 años.";
  return "";
});

// Métodos
const validarCUI = () => {
  // Permitir solo números y limitar a 13 caracteres
  cui.value = cui.value.replace(/\D/g, "").slice(0, 13);
};

const iniciarSesion = async () => {
  console.log("Iniciando sesión con:", {
    cui: cui.value,
    password: password.value,
  });

  try {
    const response = await api.post("api/usuario/login", {
      cui: cui.value,
      password: password.value,
    });

    // Verifica si el token existe en la respuesta
    if (response.data && response.data.token) {
      store.dispatch("guardarToken", response.data.token);
      console.log(router.getRoutes().map((r) => r.name)); // 🔹 Muestra los nombres de las rutas registradas

      router.replace({ name: "Inicio" });
    } else {
      throw new Error("Respuesta sin token válido");
    }
  } catch (err) {
    console.error("Error:", err);

    if (err.response) {
      if (err.response.status === 404) {
        alert("Error: Usuario y/o contraseña equivocadas");
      } else {
        alert("Error: " + (err.response.data || "Error desconocido"));
      }
    } else {
      alert("Error en la autenticación");
    }
  }
};

const registrarUsuario = async () => {
  console.log("Registrando usuario con:", {
    cui: cui.value,
    nombres: nombres.value,
    apellidos: apellidos.value,
    password: password.value,
    UltimaCuotaCancelada: ultimoAnio.value,
  });

  try {
    const response = await api.post("api/usuario/crear", {
      cui: cui.value,
      password: password.value,
      nombres: nombres.value,
      apellidos: apellidos.value,
      ultimaCuotaCancelada: ultimoAnio.value.toString(),
    });

    // Verifica si el token existe en la respuesta
    if (response.data && response.data.token) {
      store.dispatch("guardarToken", response.data.token);
      console.log(router.getRoutes().map((r) => r.name)); // 🔹 Muestra los nombres de las rutas registradas

      router.replace({ name: "Inicio" });
    } else {
      throw new Error("Respuesta sin token válido");
    }
  } catch (err) {
    console.error("Error:", err);

    // Verifica si `err.response` tiene datos antes de acceder a `err.response.data`
    if (err.response && err.response.data) {
      alert("Error: " + err.response.data);
    } else {
      alert("Error en la autenticación");
    }
  }
};
</script>

<style lang="scss" scoped>
/* Contenedor principal */
.contenedor-login {
  display: grid;
  grid-template-columns: 2fr 1fr;
  height: 100vh;
  font-family: Arial, sans-serif;
}

/* Columna de la imagen */
.columna-imagen {
  background-color: #10091d;
  display: flex;
  align-items: center;
  justify-content: center;
}

.columna-imagen img {
  max-width: 80%;
  border-radius: 1rem;
  border: 3px solid #080121;
}

/* Columna del formulario */
.columna-formulario {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3c2d57;
}

/* Contenedor interno con fondo */
.form-container {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}

/* Títulos */
h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #333;
}

/* Estilo de los labels */
.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
  text-align: left;
}

/* Campos de entrada */
.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  margin-bottom: 1rem;
}

/* Botón de acción principal */
.btn-accion {
  width: 100%;
  background: #6a1b9a;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.btn-accion:hover {
  background: #4a148c;
}

/* Botón secundario */
.btn-secundario {
  margin-top: 10px;
  background: none;
  border: none;
  color: #6a1b9a;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-secundario:hover {
  text-decoration: underline;
}
</style>
