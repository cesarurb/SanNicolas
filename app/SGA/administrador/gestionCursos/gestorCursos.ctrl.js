angular.module('mySGAApp').controller("gestorCursosCtrl", ['$scope', '$state','NgTableParams', '$location', '$http', '$cookies',
function($scope, '$state', NgTableParams, $location, $http, $cookies){
  var ctrl = this;
  ctrl.curso = {
    id: "",
    nombre: "",
    grado: null
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
    $http.get('./app/SGA/administrador/gestionCursos/buscarGrados.php',{params: {}}
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

  ctrl.buscarCursos = function () {
    $http.get('./app/SGA/administrador/gestionCursos/buscarCursos.php',{params: {}}
    ).then(function (response) {
      // console.log(response.data)
      if (response.data.status != 'Error') {
        try {
          ctrl.cursosLista = response.data;
          ctrl.cursosTabla = new NgTableParams({ dataset: ctrl.cursosLista });
        } catch (e) {
          swal("¡Opss!", "Ocurrió un error." + e , "error");
        }
      } else {
        swal("¡Opss!", "No se encuentró ningún curso.", "error");
      }
    })
  }

  ctrl.agregarCurso = function() {
    console.log(ctrl.curso);
    $http.get("./app/SGA/administrador/gestionCursos/insertarCurso.php",{params: {nombre: ctrl.curso.nombre, grado: ctrl.curso.grado.id}})
    .then(function (response) {
      console.log(response);
      if (response.data == 'HECHO SIN ERRORES') {
        swal("¡Bien hecho!", "El curso fue registrado exitosamente" , "success");
        ctrl.cancelar();
      } else {
        swal("¡Opss!", "No se pudo registrar el curso." , "error");
      }
    });
  }

  ctrl.eliminarCurso = function (curso) {
    $http.get("./app/SGA/administrador/gestionCursos/eliminarCurso.php",{params: {id: curso.id}})
    .then(function (response) {
      // console.log(response);
      if (response.data == "HECHO SIN ERRORES") {
        ctrl.cursosLista.splice(ctrl.cursosLista.indexOf(curso),1);
        swal("¡Bien hecho!", "El docente fue eliminado exitosamente" , "success");
      } else {
        swal("¡Opss!", "No se pudo eliminar el docente." , "error");
      }
    });
  }

  ctrl.cancelar = function() {
    ctrl.curso.id = "";
    ctrl.curso.nombre = "";
    ctrl.curso.apellidos = "";
    ctrl.curso.grado = null;
  }

  ctrl.init = function () {
    ctrl.obtenerGrados();
    ctrl.buscarCursos();
  };

  ctrl.init();

}]);
