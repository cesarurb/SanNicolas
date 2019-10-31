angular.module('myPESIApp').controller("loginCtrl", ['$scope', '$state', '$location', '$http', '$cookies', function ($scope, $state, $location, $http, $cookies) {
  var ctrl = this;
  ctrl.estado = "DESLOGUEADO"
  var inicioSesion = $cookies.get('inicioSesion');
  // console.log(ctrl.usuario);
  $scope.login = function () {
    var username = $scope.username;
    var password = $scope.password;
    $http({
      url: './app/PESI/login/login.php',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: 'username='+ username + '&password=' + password
    }).then(function (response) {
      try {
        response.data.forEach(function(element) {
          if(element.status == 'loggedin') {
            ctrl.estado = "LOGUEADO";
            $cookies.put('usuarioID', element.id);
            $cookies.put('username', element.name_user);
            $cookies.put('name', element.nombres);
            $cookies.put('rol', element.rol);
            $cookies.put('empresa', element.empresa);
            $cookies.put('nombres', element.nombres);
            $cookies.put('apellidos', element.apellidos);
            $cookies.put('inicioSesion', true);
            $state.go('raiz');
            // console.log($cookies.get('empresa'));
          } else {
            ctrl.estado = "DESLOGUEADO";
            swal("¡Opss!", "El usuario no se encuentra en la base de datos" , "error");
          }
        });
      } catch (e) {
        // console.log(e);
        ctrl.estado = "DESLOGUEADO";
        swal("¡Opss!", "Usuario o contraseña inválida." , "error");
      }
    })
  }

  ctrl.init = function() {
    inicioSesion = $cookies.get('inicioSesion');
    if (inicioSesion == 'true') {
      $state.go('homeAdmin');
    }
  }

  ctrl.init()
}]);
