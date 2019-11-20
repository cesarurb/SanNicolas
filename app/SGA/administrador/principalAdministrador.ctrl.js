angular.module('mySGAApp').controller('administradorCtrl', ['$scope', '$state', '$cookies',
function($scope, $state, $cookies){
  var ctrl = this;

  ctrl.irGestionarAlumno = function() {
    $state.go('gestionar-alumno')
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

  ctrl.irGestionarGrado = function() {
    $state.go('gestionar-grado');
  }

  ctrl.irGestionarSeccion = function() {
    $state.go('gestionar-seccion');
  }

  ctrl.irGestionarMatricula = function() {
    $state.go('gestionar-matricula');
  }

}]);
