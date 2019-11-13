angular.module('mySGAApp').controller('administradorCtrl', ['$scope', '$state', '$cookies',
function($scope, $state, $cookies){
  var ctrl = this;

  ctrl.irGestionarAlumno = function() {
    $state.go('registrar-alumno')
  }

  ctrl.irGestionarDocente = function() {
    $state.go('gestionar-docente');
  }

  ctrl.irGestionarCurso = function() {
    $state.go('gestionar-curso');
  }

  ctrl.irGestionarAsignacion = function() {
    $state.go('gestionar-asignacion');
  }

  ctrl.irGestionarUsuarios = function() {
    $state.go('gestionar-usuario');
  }

  // ctrl.irLogin = function() {
  //   $state.go('login');
  //   $scope.toggleSidenav();
  // }
  //
  // ctrl.irHome = function() {
  //   $state.go('home');
  //   $scope.toggleSidenav();
  // }

}]);
