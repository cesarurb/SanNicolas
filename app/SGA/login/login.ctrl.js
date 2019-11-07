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
      console.log(response.data)
      try {
        response.data.forEach(function(element) {
          if(element.status == 'loggedin') {
            $cookies.put('usuarioID', element.codigo);
            $cookies.put('username', element.NombreUsuario);
            // $cookies.put('name', element.nombres);
            if (element.NivelUsuario == "1") {
              $cookies.put('rol', 'ADMIN');
            }
            // $cookies.put('nombres', element.nombres);
            // $cookies.put('apellidos', element.apellidos);
            $cookies.put('inicioSesion', true);
            $state.go('raiz');
            // console.log($cookies.get('empresa'));
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
    // $cookies.put('inicioSesion', false);
    console.log($cookies.get('inicioSesion'))
    if ($cookies.get('inicioSesion') == 'true') {
      // $state.go('home');
    }
  }

  ctrl.init()
}]);
