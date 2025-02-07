<template>
  <div class="contenedor-formulario">
    <div class="form-container">
      <h1>Actualizar Datos</h1>

      <form @submit.prevent="actualizarUsuario">
        <section class="seccion">
          <h2 class="seccion-titulo">Información personal</h2>
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
            <label for="sexo">Género:</label>
            <select id="sexo" v-model="sexo" required>
              <option value="" disabled>Seleccione</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>

          <div class="form-group">
            <label>Fecha Nacimiento:</label>
            <input
              type="date"
              v-model="fechaNacimiento"
              @change="verificarEdad"
              required
            />
          </div>

          <!-- Información de Padres (Solo si es menor de 18 años) -->
          <div v-if="esMenorEdad">
            <h2 class="seccion-titulo">Información de los Padres</h2>
            <div class="form-group">
              <label>Nombres y Apellidos del Padre:</label>
              <input
                type="text"
                v-model="padre"
                placeholder="Nombres y apellidos Papá"
              />
            </div>
            <div class="form-group">
              <label>Nombres y Apellidos de la Madre:</label>
              <input
                type="text"
                v-model="madre"
                placeholder="Nombres y apellidos Mamá"
              />
            </div>
          </div>
        </section>

        <section class="seccion">
          <h2 class="seccion-titulo">Información Dirección de Contacto:</h2>
          <div class="form-group">
            <label for="direccion">Dirección:</label>
            <input
              type="text"
              id="direccion"
              v-model="direccion"
              placeholder="Ingrese su dirección"
              required
            />
          </div>

          <div class="form-group">
            <label for="direccion">Zona:</label>
            <select id="zona" v-model.number="zonaSeleccionada" required>
              <option value="" disabled>Seleccione una zona</option>
              <option v-for="zona in 12" :key="zona" :value="zona">
                Zona {{ zona }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="ubicacion">Referencia:</label>
            <input
              type="text"
              id="ubicacion"
              v-model="ubicacion"
              placeholder="Barrio/Colonia"
              required
            />
          </div>

          <div class="form-group">
            <label for="cui">Teléfono Domiciliar:</label>
            <input
              type="text"
              id="telefonoDomicilio"
              v-model="telefonoDomicilio"
              placeholder="Ingrese # Teléfono "
              @input="validarTelefono"
              maxlength="8"
              pattern="\d*"
            />
          </div>

          <div class="form-group">
            <label for="cui">Teléfono Movíl:</label>
            <input
              type="text"
              id="telefonoMovil"
              v-model="telefonoMovil"
              placeholder="Ingrese # Teléfono "
              @input="validarTelefono"
              maxlength="8"
              pattern="\d*"
              required
            />
          </div>

          <div class="form-group">
            <label for="cui">Correo Electronico:</label>
            <input
              type="text"
              id="correo"
              v-model="correo"
              placeholder="Ingrese correo"
            />
          </div>
        </section>

        <section class="seccion">
          <h2 class="seccion-titulo">Información del Padrino / Madrina</h2>
          <div class="form-group">
            <label for="direccion"
              >Nombre completo del padrino / madrina :</label
            >
            <input
              type="text"
              id="direccion"
              v-model="nombrePadrino"
              placeholder="Nombre completo padrino / madrina"
            />
          </div>

          <div class="form-group">
            <label for="cui">Teléfono :</label>
            <input
              type="text"
              id="telefonoDomicilio"
              v-model="telefonoDomicilioPadrino"
              placeholder="Ingrese # Teléfono "
              @input="validarTelefono"
              maxlength="8"
              pattern="\d*"
            />
          </div>
        </section>

        <!-- Informacion del beneficiario / contacto  -->
        <section class="seccion">
          <h2 class="seccion-titulo">Información del Beneficiario:</h2>
          <div class="form-group">
            <label for="direccion">Nombre Completo del Beneficiario:</label>
            <input
              type="text"
              id="zona"
              v-model="nombreBeneficiario"
              placeholder="Nombre Completo Beneficiario"
              required
            />
          </div>

          <div class="form-group">
            <label for="ubicacion">Direccion Beneficiario:</label>
            <input
              type="text"
              id="direccionBeneficiario"
              v-model="direccionBeneficiario"
              placeholder="ubiación de beneficiario"
              required
            />
          </div>

          <div class="form-group">
            <label for="cui">Teléfono Domiciliar Beneficiario:</label>
            <input
              type="text"
              id="telefonoDomicilio"
              v-model="telefonoDomicilioBeneficiario"
              placeholder="Ingrese # Teléfono "
              @input="validarTelefono"
              maxlength="8"
              pattern="\d*"
              required
            />
          </div>

          <div class="form-group">
            <label for="cui">Relación:</label>
            <select v-model="relacionFamiliar" required>
              <option value="" disabled>Seleccione</option>
              <option value="Familiar">Familiar</option>
              <option value="Amistad">Amistad</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
        </section>

        <button type="submit" class="btn-accion">Actualizar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import api from "@/Services/api";
import store from "@/stores/store";

const usuarios = ref([]);
const loading = ref(true);
const error = ref(null);
const nombres = ref("");
const apellidos = ref("");
const sexo = ref("");
const cui = ref("");
const fechaNacimiento = ref("");
const padre = ref("");
const madre = ref("");
const direccion = ref("");
const zonaSeleccionada = ref("");
const ubicacion = ref("");
const telefonoDomicilio = ref("");
const telefonoMovil = ref("");
const correo = ref("");
const esMenorEdad = ref(false);

const telefonoDomicilioPadrino = ref("");
const nombrePadrino = ref("");

const relacionFamiliar = ref("");
const telefonoDomicilioBeneficiario = ref("");
const direccionBeneficiario = ref("");
const nombreBeneficiario = ref("");

const validarCUI = () => {
  cui.value = cui.value.replace(/\D/g, "").slice(0, 13);
};

const CUI = computed(() => {
  return store.state.usuario.cui;
});

const fechaNacimientoFormato = computed(() => {
  return usuarios.value[0].fechaNacimiento
    ? usuarios.value[0].fechaNacimiento.split("T")[0]
    : "";
});

const validarTelefono = () => {
  telefonoDomicilio.value = telefonoDomicilio.value
    .replace(/\D/g, "")
    .slice(0, 8);
  telefonoMovil.value = telefonoMovil.value.replace(/\D/g, "").slice(0, 8);
  telefonoDomicilioBeneficiario.value = telefonoDomicilioBeneficiario.value
    .replace(/\D/g, "")
    .slice(0, 8);
};

const verificarEdad = () => {
  const fechaNac = new Date(fechaNacimiento.value);
  const hoy = new Date();
  const edad = hoy.getFullYear() - fechaNac.getFullYear() - 1;
  if (edad < 18) {
    esMenorEdad.value = true;
  } else {
    esMenorEdad.value = false; // Cambiado a false para mayores de 18
  }
};
const loadUsuarios = async () => {
  try {
    loading.value = true;
    let headers = { Authorization: "Bearer " + store.state.token }; // ✅ Agregar espacio después de 'Bearer'
    let configuracion = { headers: headers }; // ✅ Usar 'headers' en lugar de 'header'

    const response = await api.get("api/Miembro/LoadData", {
      headers: { Authorization: "Bearer " + store.state.token },
      params: { buscar: store.state.usuario.CUI },
    });
    usuarios.value = response.data;
    if (usuarios.value.length > 0) {
      console.log(usuarios.value[0].nombres);
      nombres.value = usuarios.value[0].nombres;
      apellidos.value = usuarios.value[0].apellidos;
      sexo.value = usuarios.value[0].sexo; // Asegúrate de que el campo "Sexo" exista en la respuesta
      cui.value = usuarios.value[0].cui;
      fechaNacimiento.value = usuarios.value[0].fechaNacimiento.split("T")[0];
      padre.value = usuarios.value[0].infoPapa;
      madre.value = usuarios.value[0].infoMama;
      direccion.value = usuarios.value[0].direccion;
      zonaSeleccionada.value = usuarios.value[0].sector;
      ubicacion.value = usuarios.value[0].referencia;
      telefonoDomicilio.value = usuarios.value[0].telefono1;
      telefonoMovil.value = usuarios.value[0].telefono2;
      correo.value = usuarios.value[0].correo;
      // esMenorEdad.value = miembro.EsMenorEdad;
      nombrePadrino.value = usuarios.value[0].nombresPadrino;
      telefonoDomicilioPadrino.value = usuarios.value[0].telefonoPadrino;
      nombreBeneficiario.value = usuarios.value[0].beneficiarioMiembro;
      relacionFamiliar.value = usuarios.value[0].tipoRelacion;
      telefonoDomicilioBeneficiario.value =
        usuarios.value[0].beneficiarioTelefono;

      direccionBeneficiario.value = usuarios.value[0].beneficiarioDireccion;
    }
    console.log(usuarios.value);
    error.value = null;
  } catch (err) {
    error.value = "Error al cargar usuarios";
    console.error(err);
  } finally {
    loading.value = false;
  }
};
const actualizarUsuario = async () => {
  let headers = { Authorization: "Bearer " + store.state.token }; // ✅ Agregar espacio después de 'Bearer'
  try {
    const response = await api.put(
      "api/miembro/actualizar",
      {
        cui: cui.value,
        nombres: nombres.value,
        apellidos: apellidos.value,
        sexo: sexo.value,
        fechaNacimiento: fechaNacimiento.value,
        infoPapa: padre.value,
        infoMama: madre.value,
        direccion: direccion.value,
        sector: zonaSeleccionada.value.toString(),
        referencia: ubicacion.value,
        telefono1: telefonoDomicilio.value,
        telefono2: telefonoMovil.value,
        correo: correo.value,
        nombresPadrino: nombrePadrino.value,
        telefonoPadrino: telefonoDomicilioPadrino.value,
        beneficiarioMiembro: nombreBeneficiario.value,
        tipoRelacion: relacionFamiliar.value,
        beneficiarioTelefono: telefonoDomicilioBeneficiario.value,
        beneficiarioDireccion: direccionBeneficiario.value,
      },
      {
        headers: { Authorization: "Bearer " + store.state.token },
      }
    );
    console.log("Usuario actualizado", response.data);
    alert("Datos Actualizados correctamente");
  } catch (err) {
    console.error("Error al actualizar usuario:", err);
    alert("Error al actualizar usuario");
  }
};
// Cargar datos al montar el componente
onMounted(loadUsuarios);
</script>

<style scoped>
.seccion {
  outline: 2px solid black;
  display: grid;
  grid-template-columns: 2fr 2fr 2fr;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 8px;
  background: #59aaa6;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.seccion-titulo {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.form-container {
  width: 100%;
  /* max-width: 900px; */
  padding: 2rem;
  background: #495b72;
  border-radius: 10px;
  text-align: center;
}

h2 {
  margin-bottom: 2rem;
  font-size: 1.5rem;
  color: #7d14d3bb;
}

.form-group label {
  margin-right: 25px;
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #b30707;
  text-align: left;
}

.form-group input,
.form-group select {
  margin-right: 25px;
  width: 85%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  margin-bottom: 1rem;
}

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
</style>
