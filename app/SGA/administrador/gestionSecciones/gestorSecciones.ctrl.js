angular.module('mySGAApp').controller("gestorSeccionesCtrl", ['$scope', '$state', 'NgTableParams', '$location', '$http', '$cookies',
function($scope, $state, NgTableParams, $location, $http, $cookies){
  var ctrl = this;
  var fechaHoy = new Date();
  ctrl.seccion = {
    id: "",
    anio: fechaHoy.getFullYear(),
    grado: null,
    seccion: "",
    turno: null
  };

  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  ctrl.irHome = function() {
    $state.go('inicioAdmin');
  }

  ctrl.obtenerGrados = function () {
    $http.get('./app/SGA/administrador/gestionSecciones/buscarGrados.php',{params: {}}
    ).then(function (response) {
      if (response.data.status != 'Error') {
        try {
          ctrl.gradosLista = response.data;
        } catch (e) {
          swal("¡Opss!", "Ocurrió un error." + e , "error");
        }
      } else {
        swal("¡Opss!", "No se encuentró ningún grado para mostrar.", "error");
      }
    })
  }

  ctrl.cargarSecciones = function () {
    $http.get('./app/SGA/administrador/gestionSecciones/cargarSecciones.php',{params: {anio: ctrl.anio.anio}}
    ).then(function (response) {
      try {
        if (response.data.status != 'Error') {
          ctrl.seccionesLista = response.data;
          ctrl.seccionesTabla = new NgTableParams({ dataset: ctrl.seccionesLista });
        } else {
          swal("¡Opss!", "No se encuentró ninguna sección en el año escogido.", "error");
        }
      } catch (e) {
        swal("¡Opss!", "Ocurrió un error." + e , "error");
      }
    })
  }

  ctrl.agregarSeccion = function() {
    $http.get("./app/SGA/administrador/gestionSecciones/insertarSeccion.php",{params: {seccion: ctrl.seccion.seccion, grado: ctrl.seccion.grado.id, anio: ctrl.seccion.anio, turno: ctrl.seccion.turno}})
    .then(function (response) {
      // console.log(response);
      if (response.data == 'HECHO SIN ERRORES') {
        ctrl.obtenerAnios();
        swal("¡Bien hecho!", "La sección fue registrada exitosamente" , "success");
        ctrl.cancelar();
      } else {
        swal("¡Opss!", "No se pudo registrar la sección." , "error");
      }
    });
  }

  ctrl.eliminarSeccion = function (seccion) {
    $http.get("./app/SGA/administrador/gestionSecciones/eliminarSeccion.php",{params: {id: seccion.id}})
    .then(function (response) {
      // console.log(response);
      if (response.data == "HECHO SIN ERRORES") {
        ctrl.seccionesLista.splice(ctrl.seccionesLista.indexOf(seccion),1);
        swal("¡Bien hecho!", "La sección fue eliminada exitosamente" , "success");
      } else {
        swal("¡Opss!", "No se pudo eliminar la sección." , "error");
      }
    });
  }

  ctrl.obtenerAnios = function () {
    $http.get('./app/SGA/administrador/gestionSecciones/buscarAnios.php',{params: {}}
    ).then(function (response) {
      if (response.data.status != 'Error') {
        try {
          ctrl.aniosLista = response.data;
          ctrl.anio = response.data[0];
          ctrl.cargarSecciones();
        } catch (e) {
          swal("¡Opss!", "Ocurrió un error." + e , "error");
        }
      } else {
        ctrl.aniosLista = null;
        swal("¡Opss!", "No se encuentró ninguna asignación para mostrar.", "error");
      }
    })
  }

  ctrl.cancelar = function() {
    ctrl.seccion.id = "";
    ctrl.seccion.anio = fechaHoy.getFullYear();
    ctrl.seccion.grado = null;
    ctrl.seccion.seccion = "";
    ctrl.seccion.turno = null;
  }

  ctrl.init = function () {
    if ($cookies.get('rol') == 'DOCENTE') {
      $state.go('inicioDocente');
    } else if ($cookies.get('rol') == 'ALUMNO'){
      $state.go('inicioAlumno');
    }
    ctrl.obtenerAnios();
    ctrl.obtenerGrados();
  };

  ctrl.init();

}]);
