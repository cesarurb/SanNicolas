angular.module('mySGAApp').controller("gestorAlumnosCtrl", ['$scope', '$state','NgTableParams', '$location', '$http', '$cookies',
function($scope, $state, NgTableParams, $location, $http, $cookies){
  var ctrl = this;
  ctrl.disableApoderado = false;
  ctrl.grupoSanguineoLista = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  ctrl.alumno = [];
  ctrl.apoderado = {
    id: "",
    dni: null,
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

  ctrl.irGestionarAlumno = function() {
    $state.go('gestionar-alumno')
  }

  ctrl.irRegistrarAlumno = function() {
    $state.go('registrar-alumno')
  }

  ctrl.revisarDNIAlumno = function () {
    if (isNaN(ctrl.alumnoNuevo.dni)) {
      var tamañoDNI = ctrl.alumnoNuevo.dni.length;
      ctrl.alumnoNuevo.dni = ctrl.alumnoNuevo.dni.substr(0,tamañoDNI-1);
      swal("¡Opss!", "El DNI del alumno debe ser sólo de 8 dígitos." , "error");
    }
  }

  ctrl.revisarDNIApoderado = function () {
    if (isNaN(ctrl.apoderado.dni)) {
      var tamañoDNI = ctrl.apoderado.dni.length;
      ctrl.apoderado.dni = ctrl.apoderado.dni.substr(0,tamañoDNI-1);
      swal("¡Opss!", "El DNI del apoderado debe ser sólo de 8 dígitos." , "error");
    }
  }

  ctrl.buscarApoderado = function () {
    $http.get('./app/SGA/administrador/gestionAlumnos/buscarApoderado.php',{params: {dni: ctrl.apoderado.dni}}
    ).then(function (response) {
      if (response.data.status != 'Error') {
        try {
          ctrl.apoderado.id = response.data.id;
          ctrl.apoderado.nombres = response.data.nombres;
          ctrl.apoderado.apellidos = response.data.apellidos;
          ctrl.apoderado.correo = response.data.correo;
          ctrl.apoderado.telefono = response.data.telefono;
          ctrl.apoderado.direccion = response.data.direccion;
          ctrl.disableApoderado = true;
        } catch (e) {
          swal("¡Opss!", "Ocurrió un error: " + e, "error");
        }
      } else {
        swal("¡Opss!", "No se encuentra ningún apoderado con ese DNI.", "error");
      }
    })
  }

  ctrl.cargarAlumnos = function () {
    $http.get('./app/SGA/administrador/gestionAlumnos/cargarAlumnos.php',{params: {}}
    ).then(function (response) {
      // console.log(response.data);
      if (response.data.status != 'Error') {
        try {
          ctrl.alumnosLista = response.data;
          ctrl.alumnosTabla = new NgTableParams({ dataset: ctrl.alumnosLista });
        } catch (e) {
          swal("¡Opss!", "Ocurrió un error." + e , "error");
        }
      } else {
        // swal("¡Opss!", "No se encuentró ningún alumno.", "error");
      }
    })
  }

  // ctrl.cargarTabla = function () {
  //   $http.get('./app/PESI/administrador/usuarios/gestorUsuariosBuscar.php',{params: {username:  ''}}
  //   ).then(function (response) {
  //     try {
  //       ctrl.usuariosLista = response.data;
  //       ctrl.usuariosTabla = new NgTableParams({ dataset: ctrl.usuariosLista });
  //     } catch (e) {
  //       swal("¡Opss!", "No se encontró ningún usuario." , "error");
  //     }
  //   })
  // }

  ctrl.agregar = function () {
    $http.get('./app/SGA/administrador/gestionAlumnos/buscarAlumno.php',{params: {dni: ctrl.alumnoNuevo.dni}}
    ).then(function (response) {
      if (response.data.status != 'Error') {
        swal("¡Opss!", "Ya se ha registrado este alumno con ese DNI.", "error");
      } else {
        $http.get('./app/SGA/administrador/gestionAlumnos/buscarApoderado.php',{params: {dni: ctrl.apoderado.dni}}
        ).then(function (response) {
          if (response.data.status == 'Error') {
            try {
              ctrl.guardarApoderado();
            } catch (e) {
              swal("¡Opss!", "Ocurrió un error: " + e, "error");
            }
          } else {
            try {
              ctrl.apoderado.id = response.data.id;
              ctrl.guardarAlumno();
            } catch (e) {
              swal("¡Opss!", "Ocurrió un error: " + e, "error");
            }
          }
        })
      }
    })
  }

  ctrl.guardarAlumno = function() {
    month = ctrl.alumnoNuevo.nacimiento.getMonth();
    if (month < 9) {
      month = parseInt(month) + 1
      month = '0' + month;
    }
    var fecha = ctrl.alumnoNuevo.nacimiento.getFullYear() + '-' + month + '-' + ctrl.alumnoNuevo.nacimiento.getDate();
    console.log(ctrl.alumnoNuevo);
    $http.get("./app/SGA/administrador/gestionAlumnos/insertarAlumno.php",{params: {dni: ctrl.alumnoNuevo.dni, nombres: ctrl.alumnoNuevo.nombres, apellidos: ctrl.alumnoNuevo.apellidos, correo: ctrl.alumnoNuevo.correo, telefono: ctrl.alumnoNuevo.telefono, direccion: ctrl.alumnoNuevo.direccion, nacimiento: fecha, genero: ctrl.alumnoNuevo.genero, grupoSanguineo: ctrl.alumnoNuevo.grupoSanguineo, apoderado: ctrl.apoderado.id}})
    .then(function (response) {
      console.log(response);
      if (response.data == 'HECHO SIN ERRORES') {
        ctrl.guardarUsuario();
        // swal("¡Bien hecho!", "El Alumno fue registrado exitosamente" , "success");
      } else {
        swal("¡Opss!", "No se pudo registrar el alumno." , "error");
      }
    });
  }

  ctrl.guardarUsuario = function() {
    $http.get("./app/SGA/administrador/gestionAlumnos/insertarUsuario.php",{params: {dni: ctrl.alumnoNuevo.dni, nombres: ctrl.alumnoNuevo.nombres, apellidos: ctrl.alumnoNuevo.apellidos, correo: ctrl.alumnoNuevo.correo}})
    .then(function (response) {
      // console.log(response);
      if (response.data == 'HECHO SIN ERRORES') {
        ctrl.alumnoNuevo.id = "";
        ctrl.alumnoNuevo.dni = "";
        ctrl.alumnoNuevo.nombres = "";
        ctrl.alumnoNuevo.apellidos = "";
        ctrl.alumnoNuevo.correo = "";
        ctrl.alumnoNuevo.direccion = "";
        ctrl.alumnoNuevo.telefono = "";
        ctrl.alumnoNuevo.nacimiento = null;
        ctrl.alumnoNuevo.genero = null;
        ctrl.alumnoNuevo.grupoSanguineo = null;
        ctrl.cancelar();
        swal("¡Bien hecho!", "El usuario del alumno fue registrado exitosamente" , "success");
      } else {
        swal("¡Opss!", "No se pudo registrar el usuario del alumno." , "error");
      }
    });
  }

  ctrl.guardarApoderado = function() {
    ctrl.apoderado.id = uuidv4();
    $http.get("./app/SGA/administrador/gestionAlumnos/insertarApoderado.php",{params: {id: ctrl.apoderado.id, dni: ctrl.apoderado.dni, nombres: ctrl.apoderado.nombres, apellidos: ctrl.apoderado.apellidos, correo: ctrl.apoderado.correo, telefono: ctrl.apoderado.telefono, direccion: ctrl.apoderado.direccion}})
    .then(function (response) {
      console.log(response);
      if (response.data == 'HECHO SIN ERRORES') {
        ctrl.guardarAlumno();
      } else {
        swal("¡Opss!", "Ocurrió un error con el apoderado." , "error");
      }
    });
  }

  ctrl.eliminarAlumno = function (alumno) {
    $http.get("./app/SGA/administrador/gestionAlumnos/eliminarAlumno.php",{params: {id: alumno.id}})
    .then(function (response) {
      // console.log(response);
      if (response.data != "Error") {
        ctrl.alumnosLista.splice(ctrl.alumnosLista.indexOf(alumno),1);
        swal("¡Bien hecho!", "El alumno fue eliminado exitosamente" , "success");
      } else {
        // console.log(response.data);
        swal("¡Opss!", "No se pudo eliminar el alumno." , "error");
      }
    });
  }

  // ctrl.modificar = function (usuario) {
  //   var sql = "update USUARIO set empresa = '" + usuario.empresa + "', rol = '" + usuario.rol
  //    + "', dni = '" + usuario.dni + "', nombres = '" + usuario.names + "', apellidos = '" + usuario.surname
  //    + "', direccion = '" + usuario.address + "', telefono = '" + usuario.phone + "', correo = '" + usuario.email
  //    // + "', genero = '" + usuario.genero
  //    + "' where id = '" + usuario.id + "'";
  //   $http.get("./app/PESI/administrador/usuarios/gestorUsuariosInsertar.php",{params: {sql: sql}})
  //   .then(function (response) {
  //     // console.log(response);
  //     if (response.data != "Error") {
  //       ctrl.Listadeusuario = false;
  //       ctrl.cancelar();
  //       swal("¡Bien hecho!", "El usuario fue modificado exitosamente" , "success");
  //     } else {
  //       // console.log(response.data);
  //       swal("¡Opss!", "No se pudo modificar el usuario." , "error");
  //     }
  //   });
  // }

  // ctrl.modificarusuario = function(usuario){
  //   ctrl.estado = "editar";
  //   ctrl.titulo = "EDITAR USUARIO"
  //   ctrl.usuario.id = usuario.id;
  //   ctrl.usuario.user_name = usuario.name_user;
  //   ctrl.usuario.empresa = usuario.empresa;
  //   ctrl.usuario.rol = usuario.rol;
  //   ctrl.usuario.dni = usuario.dni;
  //   ctrl.usuario.names = usuario.nombres;
  //   ctrl.usuario.surname = usuario.apellidos;
  //   ctrl.usuario.address = usuario.direccion;
  //   ctrl.usuario.phone = usuario.telefono;
  //   ctrl.usuario.email = usuario.correo;
  // }

  ctrl.copiarDireccion = function() {
    ctrl.apoderado.direccion = ctrl.alumnoNuevo.direccion;
  }

  ctrl.cancelar = function() {
    ctrl.apoderado.id = "";
    ctrl.apoderado.dni = "";
    ctrl.apoderado.nombres = "";
    ctrl.apoderado.apellidos = "";
    ctrl.apoderado.correo = "";
    ctrl.apoderado.direccion = "";
    ctrl.apoderado.telefono = "";
    ctrl.disableApoderado = false;
  }

  // ctrl.obtenerEmpresas = function () {
  //   $http.get('./app/PESI/administrador/usuarios/gestorUsuariosCargarEmpresas.php').then(function (response) {
  //     try {
  //       ctrl.empresasLista = response.data;
  //     } catch (e) {
  //
  //     }
  //   })
  // }

  ctrl.init = function () {
    if ($cookies.get('rol') == 'DOCENTE') {
      $state.go('inicioDocente');
    } else if ($cookies.get('rol') == 'ALUMNO'){
      $state.go('inicioAlumno');
    }
    ctrl.cargarAlumnos();
  };

  ctrl.init();

}]);
