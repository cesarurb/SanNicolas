angular.module('mySGAApp').controller("gestorAlumnosCtrl", ['$scope', '$state','NgTableParams', '$location', '$http', '$cookies',
function($scope, $state, NgTableParams, $location, $http, $cookies){
  var ctrl = this;
  ctrl.disableApoderado = false;
  // ctrl.estado = "nuevo";
  // ctrl.titulo = "CREAR USUARIO"
  // ctrl.buscar_user = "";
  // ctrl.usuariosLista = [];
  // ctrl.Listadeusuario = false;
  ctrl.alumno = [];
  ctrl.apoderado = {
    id: "",
    dni: "",
    nombres: "",
    apellidos: "",
    correo: "",
    celular: "",
    direccion: ""
  };
  // ctrl.reestablecerContrasenia == false;

  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  ctrl.irHome = function() {
    $state.go('inicioAdmin');
  }

  // ctrl.contrasenia_dni = function (usuario) {
  //   var sql = "update USUARIO set pass_word = '" + usuario.dni + "' where id = '" + usuario.id + "'";
  //   $http.get("./app/PESI/administrador/usuarios/gestorUsuariosInsertar.php",{params: {sql: sql}})
  //   .then(function (response) {
  //     if (response.data != "Error") {
  //       ctrl.Listadeusuario = false;
  //       ctrl.cancelar();
  //       swal("¡Bien hecho!", "La contraseña se reestableció exitosamente" , "success");
  //     } else {
  //       swal("¡Opss!", "No se pudo reestablecer la contraseña." , "error");
  //     }
  //   });
  // }

  ctrl.buscarApoderado = function () {
    // console.log(ctrl.apoderado);
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
    //   try {
    //     ctrl.usuariosLista = response.data;
    //     // console.log(ctrl.usuariosLista);
    //     ctrl.usuarioTabla = new NgTableParams({ dataset: ctrl.usuariosLista });
    //     if (ctrl.usuariosLista.length) {
    //       ctrl.Listadeusuario = true;
    //     } else {
    //       ctrl.Listadeusuario = false;
    //       swal("¡Opss!", "No se encontró ningún usuario con esa descripción." , "error");
    //     }
    //   } catch (e) {
    //     ctrl.Listadeusuario = false;
    //     // console.log(e);
    //     swal("¡Opss!", "No se encontró ningún usuario con esa descripción." , "error");
    //   }
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
            swal("¡Opss!", "No se encuentra ningún apoderado con ese DNI.", "error");
          }
        })
      }
    })
  }

  ctrl.guardarAlumno = function() {
    $http.get("./app/SGA/administrador/gestionAlumnos/insertarAlumno.php",{params: {dni: ctrl.alumnoNuevo.dni, nombres: ctrl.alumnoNuevo.nombres, apellidos: ctrl.alumnoNuevo.apellidos, correo: ctrl.alumnoNuevo.correo, telefono: ctrl.alumnoNuevo.telefono, direccion: ctrl.alumnoNuevo.direccion, apoderado: ctrl.apoderado.id}})
    .then(function (response) {
      console.log(response);
      if (response.data == 'HECHO SIN ERRORES') {
        ctrl.alumnoNuevo.id = "";
        ctrl.alumnoNuevo.dni = "";
        ctrl.alumnoNuevo.nombres = "";
        ctrl.alumnoNuevo.apellidos = "";
        ctrl.alumnoNuevo.correo = "";
        ctrl.alumnoNuevo.direccion = "";
        ctrl.alumnoNuevo.telefono = "";
        ctrl.cancelar();
        swal("¡Bien hecho!", "El Alumno fue registrado exitosamente" , "success");
      } else {
        swal("¡Opss!", "No se pudo registrar el alumno." , "error");
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

  // ctrl.eliminar = function (usuario) {
  //   var sql = "delete from usuario where id = '" + usuario.id + "'";
  //   $http.get("./app/PESI/administrador/usuarios/gestorUsuariosInsertar.php",{params: {sql: sql}})
  //   .then(function (response) {
  //     // console.log(response);
  //     if (response.data != "Error") {
  //       ctrl.usuariosLista.splice(ctrl.usuariosLista.indexOf(usuario),1);
  //       swal("¡Bien hecho!", "El usuario fue eliminado exitosamente" , "success");
  //     } else {
  //       // console.log(response.data);
  //       swal("¡Opss!", "No se pudo eliminar el usuario." , "error");
  //     }
  //   });
  // }

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
    // ctrl.disableApoderado = true;
  };

  ctrl.init();

}]);
