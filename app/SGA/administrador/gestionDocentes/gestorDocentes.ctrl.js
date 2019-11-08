angular.module('mySGAApp').controller("gestorDocentesCtrl", ['$scope', 'NgTableParams', '$location', '$http', '$cookies',
function($scope, NgTableParams, $location, $http, $cookies){
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
    $http.get("./app/SGA/administrador/gestionDocentes/insertarDocente.php",{params: {dni: ctrl.docente.dni, nombres: ctrl.docente.nombres, apellidos: ctrl.docente.apellidos, correo: ctrl.docente.correo, telefono: ctrl.docente.telefono, direccion: ctrl.docente.direccion}})
    .then(function (response) {
      console.log(response);
      if (response.data == 'HECHO SIN ERRORES') {
        swal("¡Bien hecho!", "El docente fue registrado exitosamente" , "success");
        ctrl.cancelar()
      } else {
        swal("¡Opss!", "No se pudo registrar el docente." , "error");
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
    ctrl.disableDocente = false;
  }

  ctrl.init = function () {
    ctrl.buscarDocentes();
  };

  ctrl.init();

}]);
