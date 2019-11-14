angular.module('mySGAApp').controller("gestorGradosCtrl", ['$scope', '$state', 'NgTableParams', '$location', '$http', '$cookies',
function($scope, $state, NgTableParams, $location, $http, $cookies){
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

  ctrl.revisarGrado = function () {
    var tamañoGrado = ctrl.grado.numeroGrado.length;
    if (isNaN(ctrl.grado.numeroGrado)) {
      ctrl.grado.numeroGrado = ctrl.grado.numeroGrado.substr(0,tamañoGrado-1);
      swal("¡Opss!", "El grado solo debe ser de un dígito." , "error");
    }
  }

  ctrl.cargarGrados = function () {
    $http.get('./app/SGA/administrador/gestionGrados/cargarGrados.php',{params: {}}
    ).then(function (response) {
      if (response.data.status != 'Error') {
        try {
          ctrl.gradosLista = response.data;
          ctrl.gradosTabla = new NgTableParams({ dataset: ctrl.gradosLista });
        } catch (e) {
          swal("¡Opss!", "Ocurrió un error." + e , "error");
        }
      } else {
        swal("¡Opss!", "No se encuentró ningún grado para mostrar.", "error");
      }
    })
  }

  ctrl.agregarGrado = function() {
    $http.get("./app/SGA/administrador/gestionGrados/insertarGrado.php",{params: {numeroGrado: ctrl.grado.numeroGrado, nivel: ctrl.grado.nivel}})
    .then(function (response) {
      // console.log(response);
      if (response.data == 'HECHO SIN ERRORES') {
        swal("¡Bien hecho!", "El grado fue registrado exitosamente" , "success");
        ctrl.cancelar();
      } else {
        swal("¡Opss!", "No se pudo registrar el curso." , "error");
      }
    });
  }

  ctrl.eliminarGrado = function (grado) {
    $http.get("./app/SGA/administrador/gestionGrados/eliminarGrado.php",{params: {id: grado.id}})
    .then(function (response) {
      // console.log(response);
      if (response.data == "HECHO SIN ERRORES") {
        ctrl.gradosLista.splice(ctrl.gradosLista.indexOf(grado),1);
        swal("¡Bien hecho!", "El grado fue eliminado exitosamente" , "success");
      } else {
        swal("¡Opss!", "No se pudo eliminar el grado." , "error");
      }
    });
  }

  ctrl.cancelar = function() {
    ctrl.grado.id = "";
    ctrl.grado.numeroGrado = "";
    ctrl.grado.nivel = null;
  }

  ctrl.init = function () {
    if ($cookies.get('rol') == 'DOCENTE') {
      $state.go('inicioDocente');
    } else if ($cookies.get('rol') == 'ALUMNO'){
      $state.go('inicioAlumno');
    }
    ctrl.cargarGrados();
  };

  ctrl.init();

}]);
