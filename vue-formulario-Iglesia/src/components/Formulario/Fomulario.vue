<template>
  <div class="formulario-container">
    <Seccion1 />
    <!-- <Seccion2 />
    <Seccion3 /> -->
  </div>
</template>

<script setup>
import Seccion1 from "../Formulario/Secciones/Seccion1.vue";
import Seccion2 from "../Formulario/Secciones/Seccion2.vue";
import Seccion3 from "../Formulario/Secciones/Seccion3.vue";
</script>

<style scoped>
/* Contenedor con scroll */
.formulario-container {
  max-height: 75vh; /* Ajusta la altura máxima del formulario */
  overflow-y: auto; /* Agrega scroll vertical si el contenido es muy largo */
  padding: 20px;
  background-color: #4d4c4c; /* Fondo oscuro */
  border-radius: 10px;
  border: 2px solid #f8f40c; /* Borde dorado */
  box-shadow: 0px 4px 6px rgba(46, 42, 42, 0.3);
  color: white;
}

/* Personalización del scrollbar */
.formulario-container::-webkit-scrollbar {
  width: 8px;
}

.formulario-container::-webkit-scrollbar-thumb {
  background-color: #f8f40c; /* Color dorado */
  border-radius: 5px;
}

.formulario-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1); /* Fondo del scrollbar */
}
</style>
