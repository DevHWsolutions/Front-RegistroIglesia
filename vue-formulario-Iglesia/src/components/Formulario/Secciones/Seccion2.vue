<template>
  <div class="contenedor-formulario-1">
    <h1 class="titulo">Beneficiarios</h1>
    <div class="formulario">
      <div class="informacion-seccion-contorno">
        <h1 class="informacion-seccion-titulo">
          Información del Padrina / Madrina
        </h1>
        <!-- Nombres y Apellidos -->
        <section class="datos-personales-1">
          <div class="form-group-1">
            <label>Nombre completo:</label>
            <input type="text" placeholder="nombre completo" />
          </div>
          <div class="form-group-1">
            <label>Número Telefónico:</label>
            <input type="text" placeholder="numero " />
          </div>
        </section>
      </div>
      <!-- informacion beneficiario -->
      <div class="informacion-seccion-contorno">
        <h1 class="informacion-seccion-titulo">Información del beneficiario</h1>
        <!-- Dirección Física -->
        <section class="datos-personales-3">
          <div class="form-group-3">
            <label>Beneficiario:</label>
            <input type="text" placeholder="nombre completo beneficiario" />
          </div>
          <div class="form-group-3">
            <label>Relación:</label>
            <select name="select">
              <option value="value1">Familiar</option>
              <option value="value2">Amistad</option>
              <option value="value3">Otro:</option>
            </select>
          </div>
        </section>
        <!-- Información de Comunicación -->
        <section class="datos-personales-1">
          <div class="form-group-4">
            <label>Dirección:</label>
            <input type="text" placeholder="residencial" />
          </div>
          <div class="form-group-4">
            <label>Teléfono:</label>
            <input type="text" placeholder="residencial / móvil" />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "./../../../css/formulario1.css";
@import "./../../../css/Formulario/seccion2.css";
</style>
