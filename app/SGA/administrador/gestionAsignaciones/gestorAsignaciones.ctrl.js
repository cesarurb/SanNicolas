angular.module('mySGAApp').controller("gestorAsignacionesCtrl", ['$scope', '$state','NgTableParams', '$location', '$http', '$cookies',
function($scope, $state, NgTableParams, $location, $http, $cookies){
  var ctrl = this;
  var fechaHoy = new Date();
  ctrl.asignacion = {
    id: "",
    docente: null,
    anio: fechaHoy.getFullYear(),
    grado: null,
    curso: null,
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

  ctrl.cargarAsignaciones = function () {
    // console.log(ctrl.anio);
    $http.get('./app/SGA/administrador/gestionAsignaciones/cargarAsignaciones.php',{params: {anio: ctrl.anio.anio}}
    ).then(function (response) {
      // console.log(response.data)
      try {
        if (response.data.status != 'Error') {
          ctrl.asignacionesLista = response.data;
          ctrl.asignacionesTabla = new NgTableParams({ dataset: ctrl.asignacionesLista });
        }
      } catch (e) {
        swal("¡Opss!", "Ocurrió un error." + e , "error");
      }
    })
  }

  ctrl.agregar = function() {
    $http.get("./app/SGA/administrador/gestionAsignaciones/buscarAsignacion.php",{params: {docente: ctrl.asignacion.docente.id, curso: ctrl.asignacion.curso.id, anio: ctrl.asignacion.anio, seccion: ctrl.asignacion.seccion.id}})
    .then(function (response) {
      if (response.data.status == 'Error') {
        // console.log(response.data);
        ctrl.agregarAsignacion();
      } else {
        swal("¡Opss!", "Ya existe una asignación con estos datos." , "error");
      }
    });
  }

  ctrl.agregarAsignacion = function() {
    $http.get("./app/SGA/administrador/gestionAsignaciones/insertarAsignacion.php",{params: {docente: ctrl.asignacion.docente.id, curso: ctrl.asignacion.curso.id, anio: ctrl.asignacion.anio, seccion: ctrl.asignacion.seccion.id}})
    .then(function (response) {
      // console.log(response);
      if (response.data == 'HECHO SIN ERRORES') {
        ctrl.asignacion.id = "";
        ctrl.asignacion.docente = null;
        ctrl.asignacion.curso = null;
        ctrl.asignacion.anio = fechaHoy.getFullYear();
        ctrl.asignacion.grado = null;
        ctrl.asignacion.turno = null;
        ctrl.obtenerAnios();
        swal("¡Bien hecho!", "La asignación fue registrada exitosamente" , "success");
      } else {
        swal("¡Opss!", "No se pudo registrar la asignación." , "error");
      }
    });
  }

  ctrl.eliminarAsignacion = function (asignacion) {
    $http.get("./app/SGA/administrador/gestionAsignaciones/eliminarAsignacion.php",{params: {id: asignacion.id}})
    .then(function (response) {
      // console.log(response);
      if (response.data == "HECHO SIN ERRORES") {
        ctrl.asignacionesLista.splice(ctrl.asignacionesLista.indexOf(asignacion),1);
        swal("¡Bien hecho!", "La asignación fue eliminada exitosamente" , "success");
      } else {
        swal("¡Opss!", "No se pudo eliminar la asignación." , "error");
      }
    });
  }

  ctrl.obtenerAnios = function () {
    $http.get('./app/SGA/administrador/gestionAsignaciones/buscarAnios.php',{params: {}}
    ).then(function (response) {
      if (response.data.status != 'Error') {
        try {
          ctrl.aniosLista = response.data;
          ctrl.anio = response.data[0];
          ctrl.cargarAsignaciones();
        } catch (e) {
          swal("¡Opss!", "Ocurrió un error." + e , "error");
        }
      } else {
        ctrl.aniosLista = null;
        swal("¡Opss!", "No se encuentró ninguna asignación para mostrar.", "error");
      }
    })
  }

  ctrl.obtenerGrados = function () {
    $http.get('./app/SGA/administrador/gestionAsignaciones/buscarGrados.php',{params: {}}
    ).then(function (response) {
      if (response.data.status != 'Error') {
        try {
          ctrl.gradosLista = response.data;
        } catch (e) {
          swal("¡Opss!", "Ocurrió un error." + e , "error");
        }
      } else {
        ctrl.gradosLista = null;
        swal("¡Opss!", "No se encuentró ningún grado para mostrar.", "error");
      }
    })
  }

  ctrl.obtenerSecciones = function () {
    $http.get('./app/SGA/administrador/gestionAsignaciones/buscarSecciones.php',{params: {grado: ctrl.asignacion.grado.id, anio: ctrl.asignacion.anio}}
    ).then(function (response) {
      if (response.data.status != 'Error') {
        try {
          ctrl.seccionesLista = response.data;
        } catch (e) {
          swal("¡Opss!", "Ocurrió un error." + e , "error");
        }
      } else {
        ctrl.seccionesLista = null;
        swal("¡Opss!", "No se encuentró ninguna sección de ese grado y año para mostrar.", "error");
      }
    })
  }

  ctrl.obtenerDocentes = function () {
    $http.get('./app/SGA/administrador/gestionAsignaciones/buscarDocentes.php',{params: {}}
    ).then(function (response) {
      if (response.data.status != 'Error') {
        try {
          ctrl.docentesLista = response.data;
        } catch (e) {
          swal("¡Opss!", "Ocurrió un error." + e , "error");
        }
      } else {
        ctrl.docentesLista = null;
        swal("¡Opss!", "No se encuentró ningún docente para mostrar.", "error");
      }
    })
  }

  ctrl.obtenerCursos = function () {
    $http.get('./app/SGA/administrador/gestionAsignaciones/buscarCursos.php',{params: {grado: ctrl.asignacion.grado.id}}
    ).then(function (response) {
      try {
        if (response.data.status != 'Error') {
          ctrl.cursosLista = response.data;
        } else {
          ctrl.cursosLista = null;
          swal("¡Opss!", "No se encuentró ningún curso para mostrar.", "error");
        }
      } catch (e) {
        swal("¡Opss!", "Ocurrió un error." + e , "error");
      }
    })
  }

  ctrl.init = function () {
    if ($cookies.get('rol') == 'DOCENTE') {
      $state.go('inicioDocente');
    } else if ($cookies.get('rol') == 'ALUMNO'){
      $state.go('inicioAlumno');
    }
    ctrl.obtenerGrados();
    ctrl.obtenerDocentes();
    ctrl.obtenerAnios();
  };

  ctrl.init();

}]);
