<template>
  <div class="contenedor-formulario-1">
    <h1 class="titulo">Estado de Cuenta (Cuotas recibidas)</h1>
    <div class="formulario">
      <div class="informacion-seccion-contorno">
        <h1 class="informacion-seccion-titulo">Fecha de ingreso:</h1>
        <!-- Nombres y Apellidos -->
        <section class="datos-personales-1">
          <div class="form-group-1">
            <label>Nombre completo:</label>
            <input type="text" placeholder="nombre completo" />
          </div>
          <div class="form-group-1">
            <label>Fecha Ingreso:</label>
            <input type="text" placeholder="numero " />
          </div>
        </section>
      </div>
      <!-- informacion beneficiario -->
      <div class="informacion-seccion-contorno">
        <h1 class="informacion-seccion-titulo">Estado de Cuenta</h1>

        <!-- año monto #recibo Estado acciones -->
        <table class="minimal-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Año</th>
              <th>Monto</th>
              <th>#Recibo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>2022</td>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
              <td>Cancelado</td>
              <td>
                <button class="btn-editar">A</button>
                <button class="btn-eliminar">B</button>
              </td>
            </tr>
            <tr>
              <th>2</th>
              <td>2023</td>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
              <td>Cancelado</td>
              <td>
                <button class="btn-editar">A</button>
                <button class="btn-eliminar">B</button>
              </td>
            </tr>
            <tr>
              <th>3</th>
              <td>2024</td>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
              <td>Cancelado</td>
              <td>
                <button class="btn-editar">A</button>
                <button class="btn-eliminar">B</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "./../../../css/formulario1.css";
@import "./../../../css/Formulario/seccion2.css";
</style>
