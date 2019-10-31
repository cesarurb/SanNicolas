angular.module('myPESIApp').controller('raizCtrl', ['$scope', '$state', '$cookies', '$location',

function($scope, $state, $cookies, $location){
  var ctrl = this;
  ctrl.usuario = {
    userID: $cookies.get('usuarioID'),
    username: $cookies.get('username'),
    nombre: $cookies.get('name'),
    rolUsuario: $cookies.get('rol'),
    empresa: $cookies.get('empresa'),
    nombres: $cookies.get('nombres'),
    apellidos: $cookies.get('apellidos')
  }
  var inicioSesion = $cookies.get('inicioSesion');

  ctrl.logOut = function () {
    $cookies.remove('usuarioID');
    $cookies.remove('username');
    $cookies.remove('rol');
    $cookies.remove('empresa');
    $cookies.remove('nombres');
    $cookies.remove('apellidos');
    $cookies.put('inicioSesion', false);
    $state.go('login');
  };

  ctrl.irGestionUsuarios = function() {
    if ($cookies.get('rol') == 'COORDINADOR') {
      $state.go('gestionEmpleados');
    } else if ($cookies.get('rol') == 'EMPLEADO') {
      $state.go('gestionCuenta');
    } else {
      $state.go('gestionUsuarios');
    }
  }

  ctrl.irGestionEmpresas = function() {
    if ($cookies.get('rol') == 'COORDINADOR') {
      $state.go('gestionEmpresa');
    } else if ($cookies.get('rol') == 'EMPLEADO') {
      $state.go('verEmpresas');
    } else {
      $state.go('gestionEmpresas');
    }
  }

  ctrl.irHome = function() {
    if ($cookies.get('rol') == 'COORDINADOR') {
      $state.go('gestionEmpleados');
    } else if ($cookies.get('rol') == 'EMPLEADO') {
      $state.go('homeEmpleado');
    } else {
      $state.go('homeAdmin');
    }
  }

  ctrl.init = function () {
    // console.log(ctrl.usuario);
    if (inicioSesion == 'false') {
      $state.go('login');
    } else {
      ctrl.irHome();
      // $state.go('matrizPvsA', {empresaID: '89b7ec22-f05c-11e9-bccd-e4e74986983'});
    }
  };


  ctrl.init();
}]);
