angular.module('mySGAApp').controller("loginCtrl", ['$scope', '$state', '$location', '$http', '$cookies', function ($scope, $state, $location, $http, $cookies) {
  var ctrl = this;
  ctrl.estado = "DESLOGUEADO"
  var inicioSesion = $cookies.get('inicioSesion');
  // console.log(ctrl.usuario);
  $scope.login = function () {
    var username = $scope.username;
    var password = $scope.password;
    $http({
      url: './app/SGA/login/login.php',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: 'username='+ username + '&password=' + password
    }).then(function (response) {
      // console.log(response.data)
      try {
        response.data.forEach(function(element) {
          if(element.status == 'loggedin') {
            $cookies.put('usuarioID', element.codigo);
            $cookies.put('username', element.NombreUsuario);
            $cookies.put('rol', element.rol);
            $cookies.put('nombres', element.Nombres);
            $cookies.put('apellidos', element.Apellidos);
            $cookies.put('inicioSesion', true);
            $state.go('raiz');
            // console.log(element);
          } else {
            // ctrl.estado = "DESLOGUEADO";
            swal("¡Opss!", "El usuario no se encuentra en la base de datos" , "error");
          }
        });
      } catch (e) {
        // console.log(e);
        // ctrl.estado = "DESLOGUEADO";
        swal("¡Opss!", "Usuario o contraseña inválida." , "error");
      }
    })
  }

  ctrl.init = function() {
    if ($cookies.get('inicioSesion') == 'true') {
      $state.go('raiz');
    }
  }

  ctrl.init()
}]);
