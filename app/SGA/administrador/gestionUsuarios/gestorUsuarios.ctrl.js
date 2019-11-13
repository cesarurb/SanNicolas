angular.module('mySGAApp').controller("gestorUsuariosCtrl", ['$scope', '$state', 'NgTableParams', '$location', '$http', '$cookies',
function($scope, $state, NgTableParams, $location, $http, $cookies){
  var ctrl = this;
  ctrl.disableDocente = false;
  ctrl.usuario = {
    id: "",
    dni: "",
    nombreUsuario: "",
    nombres: "",
    apellidos: "",
    rol: ""
  };

  ctrl.irHome = function() {
    $state.go('inicioAdmin');
  }

  ctrl.cargarUsuarios = function () {
    $http.get('./app/SGA/administrador/gestionUsuarios/cargarUsuarios.php',{params: {}}
    ).then(function (response) {
      if (response.data.status != 'Error') {
        try {
          ctrl.usuariosLista = response.data;
          ctrl.usuariosTabla = new NgTableParams({ dataset: ctrl.usuariosLista });
        } catch (e) {
          swal("¡Opss!", "Ocurrió un error." + e , "error");
        }
      } else {
        swal("¡Opss!", "No se encuentró ningún usuario.", "error");
      }
    })
  }

  ctrl.eliminarUsuario = function (usuario) {
    $http.get("./app/SGA/administrador/gestionUsuarios/eliminarUsuario.php",{params: {id: usuario.id}})
    .then(function (response) {
      // console.log(response);
      if (response.data == "HECHO SIN ERRORES") {
        ctrl.usuariosLista.splice(ctrl.usuariosLista.indexOf(usuario),1);
        ctrl.cancelar();
        swal("¡Bien hecho!", "El usuario fue eliminado exitosamente" , "success");
      } else {
        swal("¡Opss!", "No se pudo eliminar el usuario." , "error");
      }
    });
  }

  ctrl.contrasenia_dni = function () {
    $http.get("./app/SGA/administrador/gestionUsuarios/cambiarPassword.php",{params: {id: ctrl.usuario.id, dni: ctrl.usuario.dni}})
    .then(function (response) {
      console.log(response);
      if (response.data != "Error") {
        ctrl.cancelar();
        swal("¡Bien hecho!", "La contraseña se reestableció exitosamente" , "success");
      } else {
        swal("¡Opss!", "No se pudo reestablecer la contraseña." , "error");
      }
    });
  }

  ctrl.verUsuario = function(usuario){
    ctrl.usuario.id = usuario.id;
    ctrl.usuario.dni = usuario.dni;
    ctrl.usuario.nombreUsuario = usuario.NombreUsuario;
    ctrl.usuario.nombres = usuario.Nombres;
    ctrl.usuario.apellidos = usuario.Apellidos;
    ctrl.usuario.rol = usuario.rol;
  }

  ctrl.cancelar = function() {
    ctrl.usuario.id = "";
    ctrl.usuario.dni = "";
    ctrl.usuario.nombreUsuario = "";
    ctrl.usuario.nombres = "";
    ctrl.usuario.apellidos = "";
    ctrl.usuario.rol = "";
  }


  ctrl.init = function () {
    ctrl.cargarUsuarios();
  };

  ctrl.init();

}]);
