angular.module('mySGAApp').controller("gestorDocentesCtrl", ['$scope', '$state', 'NgTableParams', '$location', '$http', '$cookies',
function($scope, $state, NgTableParams, $location, $http, $cookies){
  var ctrl = this;
  ctrl.disableDocente = false;
  ctrl.docente = {
    id: "",
    dni: "",
    nombres: "",
    apellidos: "",
    correo: "",
    celular: "",
    direccion: ""
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

  ctrl.revisarDNI = function () {
    if (isNaN(ctrl.docente.dni)) {
      var tamañoDNI = ctrl.docente.dni.length;
      ctrl.docente.dni = ctrl.docente.dni.substr(0,tamañoDNI-1);
      swal("¡Opss!", "El DNI debe ser sólo de 8 dígitos." , "error");
    }
  }

  ctrl.buscarDocentes = function () {
    // console.log(ctrl.apoderado);
    $http.get('./app/SGA/administrador/gestionDocentes/buscarDocentes.php',{params: {}}
    ).then(function (response) {
      if (response.data.status != 'Error') {
        try {
          ctrl.docentesLista = response.data;
          ctrl.docentesTabla = new NgTableParams({ dataset: ctrl.docentesLista });
        } catch (e) {
          swal("¡Opss!", "Ocurrió un error." + e , "error");
        }
      } else {
        swal("¡Opss!", "No se encuentró ningún docente.", "error");
      }
    })
  }

  ctrl.agregarDocente = function() {
    month = ctrl.docente.nacimiento.getMonth();
    if (month < 9) {
      month = parseInt(month) + 1
      month = '0' + month;
    }
    var fecha = ctrl.docente.nacimiento.getFullYear() + '-' + month + '-' + ctrl.docente.nacimiento.getDate();
    $http.get("./app/SGA/administrador/gestionDocentes/insertarDocente.php",{params: {dni: ctrl.docente.dni, nombres: ctrl.docente.nombres, apellidos: ctrl.docente.apellidos, correo: ctrl.docente.correo, telefono: ctrl.docente.telefono, direccion: ctrl.docente.direccion, nacimiento: fecha, genero: ctrl.docente.genero}})
    .then(function (response) {
      // console.log(response);
      if (response.data == 'HECHO SIN ERRORES') {
        ctrl.buscarDocentes();
        ctrl.agregarUsuario()
      } else {
        swal("¡Opss!", "No se pudo registrar el docente." , "error");
      }
    });
  }

  ctrl.agregarUsuario = function() {
    $http.get("./app/SGA/administrador/gestionDocentes/insertarUsuario.php",{params: {dni: ctrl.docente.dni, nombres: ctrl.docente.nombres, apellidos: ctrl.docente.apellidos, correo: ctrl.docente.correo}})
    .then(function (response) {
      if (response.data == 'HECHO SIN ERRORES') {
        swal("¡Bien hecho!", "El docente fue registrado exitosamente" , "success");
        ctrl.cancelar()
      } else {
        swal("¡Opss!", "No se pudo registrar el usuario del docente." , "error");
      }
    });
  }

  ctrl.eliminarDocente = function (docente) {
    $http.get("./app/SGA/administrador/gestionDocentes/eliminarDocente.php",{params: {id: docente.id}})
    .then(function (response) {
      // console.log(response);
      if (response.data == "HECHO SIN ERRORES") {
        ctrl.docentesLista.splice(ctrl.docentesLista.indexOf(docente),1);
        ctrl.cancelar();
        swal("¡Bien hecho!", "El docente fue eliminado exitosamente" , "success");
      } else {
        swal("¡Opss!", "No se pudo eliminar el docente." , "error");
      }
    });
  }

  ctrl.modificar = function () {
    $http.get("./app/SGA/administrador/gestionDocentes/modificarDocente.php",{params: {id: ctrl.docente.id, correo: ctrl.docente.correo, telefono: ctrl.docente.telefono, direccion: ctrl.docente.direccion}})
    .then(function (response) {
      // console.log(ctrl.docente);
      if (response.data == 'HECHO SIN ERRORES') {
        ctrl.cancelar();
        ctrl.buscarDocentes();
        swal("¡Bien hecho!", "La información del docente fue modificado exitosamente" , "success");
      } else {
        swal("¡Opss!", "No se pudo modificar la información del docente." , "error");
      }
    });
  }

  ctrl.modificarDocente = function(docente){
    ctrl.estado = "editar";
    ctrl.docente.id = docente.id;
    ctrl.docente.dni = docente.dni;
    ctrl.docente.nombres = docente.nombres;
    ctrl.docente.apellidos = docente.apellidos;
    ctrl.docente.correo = docente.correo;
    ctrl.docente.telefono = docente.telefono;
    ctrl.docente.direccion = docente.direccion;
    var anio = docente.nacimiento.substr(0,4);
    var mes = parseInt(docente.nacimiento.substr(5,2))-1;
    var dia = docente.nacimiento.substr(8,2);
    ctrl.docente.nacimiento = new Date(anio, mes, dia);
    ctrl.docente.genero = docente.genero;
    ctrl.disableDocente = true;
  }

  ctrl.cancelar = function() {
    ctrl.docente.id = "";
    ctrl.docente.dni = "";
    ctrl.docente.nombres = "";
    ctrl.docente.apellidos = "";
    ctrl.docente.correo = "";
    ctrl.docente.direccion = "";
    ctrl.docente.telefono = "";
    ctrl.docente.nacimiento = null;
    ctrl.docente.genero = null;
    ctrl.disableDocente = false;
  }

  ctrl.init = function () {
    if ($cookies.get('rol') == 'DOCENTE') {
      $state.go('inicioDocente');
    } else if ($cookies.get('rol') == 'ALUMNO'){
      $state.go('inicioAlumno');
    }
    ctrl.buscarDocentes();
  };

  ctrl.init();

}]);
