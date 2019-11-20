angular.module('mySGAApp').controller("gestorMatriculasCtrl", ['$scope', '$state','NgTableParams', '$location', '$http', '$cookies',
function($scope, $state, NgTableParams, $location, $http, $cookies){
  var ctrl = this;
  var fechaHoy = new Date();
  ctrl.matricula = {
    id: "",
    anio: fechaHoy.getFullYear().toString(),
    grado: null,
    seccion: null,
    alumno: null
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

  ctrl.cargarMatriculas = function () {
    try {
      $http.get('./app/SGA/administrador/gestionMatriculas/cargarMatriculas.php',{params: {anio: ctrl.anio.anio, idGrado: ctrl.grado.id}}
      ).then(function (response) {
        // console.log(response.data);
        if (response.data.status != 'Error') {
          ctrl.matriculasLista = response.data;
          try {
            $http.get('./app/SGA/administrador/gestionMatriculas/cargarMatriculas2.php',{params: {anio: ctrl.anio.anio, idGrado: ctrl.grado.id}}
            ).then(function (response) {
              // console.log(response.data);
              if (response.data.status != 'Error') {
                response.data.forEach(element => ctrl.matriculasLista.push(element));
                ctrl.matriculasTabla = new NgTableParams({ dataset: ctrl.matriculasLista });
                // console.log(ctrl.matriculasLista);
              }
            })
          } catch (e) {
            swal("¡Opss!", "Ocurrió un error." + e , "error");
          }
        } else {
          try {
            $http.get('./app/SGA/administrador/gestionMatriculas/cargarMatriculas2.php',{params: {anio: ctrl.anio.anio, idGrado: ctrl.grado.id}}
            ).then(function (response) {
              // console.log(response.data);
              if (response.data.status != 'Error') {
                ctrl.matriculasLista = response.data;
                ctrl.matriculasTabla = new NgTableParams({ dataset: ctrl.matriculasLista });
              } else {
                ctrl.matriculasLista = null;
              }
            })
          } catch (e) {
            swal("¡Opss!", "Ocurrió un error." + e , "error");
          }
        }
        // console.log(ctrl.matriculasLista);

      })
    } catch (e) {
      swal("¡Opss!", "Ocurrió un error." + e , "error");
    }
  }

  ctrl.agregar = function() {
    $http.get("./app/SGA/administrador/gestionMatriculas/buscarMatricula.php",{params: {idAlumno: ctrl.matricula.alumno.id, anio: ctrl.matricula.anio}})
    .then(function (response) {
      if (response.data.status == 'Error') {
        // console.log(ctrl.matricula);
        if (ctrl.matricula.seccion == null) {
          ctrl.agregarMatricula();
        } else {
          ctrl.agregarMatriculaSeccion();
        }
      } else {
        swal("¡Opss!", "Ya existe una matricula con estos datos." , "error");
      }
    });
  }

  ctrl.agregarMatricula = function() {
    $http.get("./app/SGA/administrador/gestionMatriculas/insertarMatricula.php",{params: {idAlumno: ctrl.matricula.alumno.id, anio: ctrl.matricula.anio, idGrado: ctrl.matricula.grado.id}})
    .then(function (response) {
      // console.log(response);
      if (response.data == 'HECHO SIN ERRORES') {
        ctrl.matricula.id = "";
        ctrl.matricula.alumno = null;
        ctrl.matricula.seccion = null;
        ctrl.matricula.anio = fechaHoy.getFullYear();
        ctrl.matricula.grado = null;
        ctrl.obtenerAnios();
        swal("¡Bien hecho!", "La matrícula fue registrada exitosamente" , "success");
      } else {
        swal("¡Opss!", "No se pudo registrar la matrícula." , "error");
      }
    });
  }

  ctrl.agregarMatriculaSeccion = function() {
    $http.get("./app/SGA/administrador/gestionMatriculas/insertarMatriculaSeccion.php",{params: {idAlumno: ctrl.matricula.alumno.id, anio: ctrl.matricula.anio, idGrado: ctrl.matricula.grado.id, idSeccion: ctrl.matricula.seccion.id}})
    .then(function (response) {
      // console.log(response);
      if (response.data == 'HECHO SIN ERRORES') {
        ctrl.matricula.id = "";
        ctrl.matricula.alumno = null;
        ctrl.matricula.seccion = null;
        ctrl.matricula.anio = fechaHoy.getFullYear();
        ctrl.matricula.grado = null;
        ctrl.obtenerAnios();
        swal("¡Bien hecho!", "La asignación fue registrada exitosamente" , "success");
      } else {
        swal("¡Opss!", "No se pudo registrar la asignación." , "error");
      }
    });
  }

  ctrl.eliminarMatricula = function (matricula) {
    $http.get("./app/SGA/administrador/gestionMatriculas/eliminarMatricula.php",{params: {id: matricula.id}})
    .then(function (response) {
      // console.log(response);
      if (response.data == "HECHO SIN ERRORES") {
        ctrl.matriculasLista.splice(ctrl.matriculasLista.indexOf(matricula),1);
        swal("¡Bien hecho!", "La matrícula fue eliminada exitosamente" , "success");
      } else {
        swal("¡Opss!", "No se pudo eliminar la matrícula." , "error");
      }
    });
  }

  ctrl.obtenerAnios = function () {
    $http.get('./app/SGA/administrador/gestionMatriculas/buscarAnios.php',{params: {}}
    ).then(function (response) {
      if (response.data.status != 'Error') {
        try {
          ctrl.aniosLista = response.data;
          ctrl.anio = response.data[0];
          ctrl.obtenerGrados();
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
    $http.get('./app/SGA/administrador/gestionMatriculas/buscarGrados.php',{params: {}}
    ).then(function (response) {
      if (response.data.status != 'Error') {
        try {
          ctrl.gradosLista = response.data;
          ctrl.grado = response.data[0];
          ctrl.cargarMatriculas();
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
    if (ctrl.matricula.anio.length == 4) {
      $http.get('./app/SGA/administrador/gestionMatriculas/buscarSecciones.php',{params: {grado: ctrl.matricula.grado.id, anio: ctrl.matricula.anio}}
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
  }

  ctrl.buscarAlumno = function () {
    $http.get('./app/SGA/administrador/gestionMatriculas/buscarAlumno.php',{params: {dni: ctrl.matricula.alumno.dni}}
    ).then(function (response) {
      if (response.data.status != 'Error') {
        try {
          ctrl.matricula.alumno.id = response.data.id;
          ctrl.matricula.alumno.nombre = response.data.nombres + ' ' + response.data.apellidos;
          ctrl.disableAlumno = true;
        } catch (e) {
          swal("¡Opss!", "Ocurrió un error: " + e, "error");
        }
      } else {
        swal("¡Opss!", "No se encuentra ningún alumno con ese DNI.", "error");
      }
    })
  }

  ctrl.cancelar = function () {
    ctrl.matricula.alumno.id = '';
    ctrl.matricula.alumno.nombre = '';
    ctrl.matricula.alumno.dni = '';
    ctrl.disableAlumno = false;
  }

  ctrl.init = function () {
    if ($cookies.get('rol') == 'DOCENTE') {
      $state.go('inicioDocente');
    } else if ($cookies.get('rol') == 'ALUMNO'){
      $state.go('inicioAlumno');
    }
    // ctrl.obtenerGrados();
    // ctrl.obtenerDocentes();
    ctrl.obtenerAnios();
  };

  ctrl.init();

}]);
