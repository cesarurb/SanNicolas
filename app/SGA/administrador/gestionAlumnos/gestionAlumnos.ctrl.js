angular.module('mySGAApp').controller("gestorAlumnosCtrl", ['$scope', '$state','NgTableParams', '$location', '$http', '$cookies', '$stateParams',
function($scope, $state, NgTableParams, $location, $http, $cookies, $stateParams){
  var ctrl = this;
  ctrl.disableApoderado = false;
  ctrl.disableDNI = true;
  ctrl.grupoSanguineoLista = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  ctrl.alumno = [];
  ctrl.alumnoNuevo = {
    id: "",
    dni: "",
    nombres: "",
    apellidos: "",
    nacimiento: null,
    genero: null,
    grupoSanguineo: null,
    correo: "",
    telefono: "",
    direccion: ""
  };
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
          ctrl.disableDNI = true
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
    if (ctrl.alumnoNuevo.dni.length == 8 && ctrl.alumnoNuevo.nombres.length > 0 && ctrl.alumnoNuevo.apellidos.length > 0 && ctrl.alumnoNuevo.direccion.length > 0 && ctrl.alumnoNuevo.genero != null && ctrl.alumnoNuevo.grupoSanguineo != null && ctrl.apoderado.id.length > 0) {
      if (ctrl.alumnoNuevo.correo.length == 0 && ctrl.alumnoNuevo.telefono.length == 0) {
        ctrl.alumnoNuevo.correo = 'SIN CORREO';
        ctrl.alumnoNuevo.telefono = 'SIN TELÉFONO';
      } else {
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
    } else {
      swal("¡Opss!", "Datos incorrectos, verifique toda la información ingresada ", "error");
    }

  }

  ctrl.guardarAlumno = function() {
    month = ctrl.alumnoNuevo.nacimiento.getMonth();
    if (month < 9) {
      month = parseInt(month) + 1
      month = '0' + month;
    }
    var fecha = ctrl.alumnoNuevo.nacimiento.getFullYear() + '-' + month + '-' + ctrl.alumnoNuevo.nacimiento.getDate();
    $http.get("./app/SGA/administrador/gestionAlumnos/insertarAlumno.php",{params: {dni: ctrl.alumnoNuevo.dni, nombres: ctrl.alumnoNuevo.nombres, apellidos: ctrl.alumnoNuevo.apellidos, correo: ctrl.alumnoNuevo.correo, telefono: ctrl.alumnoNuevo.telefono, direccion: ctrl.alumnoNuevo.direccion, nacimiento: fecha, genero: ctrl.alumnoNuevo.genero, grupoSanguineo: ctrl.alumnoNuevo.grupoSanguineo, apoderado: ctrl.apoderado.id}})
    .then(function (response) {
      // console.log(response);
      if (response.data == 'HECHO SIN ERRORES') {
        // console.log(ctrl.alumnoNuevo.correo);
        if (ctrl.alumnoNuevo.correo == "SIN CORREO") {
          ctrl.alumnoNuevo.correo = ctrl.alumnoNuevo.dni;
        }
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
      // console.log(response);
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

  ctrl.modificarAlumno = function(){
    if (ctrl.alumno.nombres.length > 0 && ctrl.alumno.apellidos.length > 0 && ctrl.alumno.direccion.length > 0 && ctrl.alumno.genero != null && ctrl.alumno.grupoSanguineo != null) {
      if (ctrl.alumno.correo.length == 0 && ctrl.alumno.telefono.length == 0) {
        ctrl.alumno.correo = 'SIN CORREO';
        ctrl.alumno.telefono = 'SIN TELÉFONO';
      } else {
        month = ctrl.alumno.nacimiento.getMonth();
        if (month < 9) {
          month = parseInt(month) + 1
          month = '0' + month;
        }
        var fecha = ctrl.alumno.nacimiento.getFullYear() + '-' + month + '-' + ctrl.alumno.nacimiento.getDate();
        $http.get("./app/SGA/administrador/gestionAlumnos/modificarAlumno.php",{params: {id: ctrl.alumno.id, nombres: ctrl.alumno.nombres, apellidos: ctrl.alumno.apellidos, correo: ctrl.alumno.correo, telefono: ctrl.alumno.telefono, direccion: ctrl.alumno.direccion, nacimiento: fecha, genero: ctrl.alumno.genero, grupoSanguineo: ctrl.alumno.grupoSanguineo}})
        .then(function (response) {
          if (response.data == 'HECHO SIN ERRORES') {
            swal("¡Bien hecho!", "El Alumno fue modificado exitosamente" , "success");
          } else {
            swal("¡Opss!", "No se pudo modificar el alumno." , "error");
          }
        });
      }
    } else {
      swal("¡Opss!", "Datos incorrectos, verifique toda la información ingresada ", "error");
    }
  }

  ctrl.modificarApoderado = function () {
    $http.get('./app/SGA/administrador/gestionAlumnos/buscarApoderado.php',{params: {dni: ctrl.apoderado.dni}}
    ).then(function (response) {
      if (response.data.status == 'Error') {
        try {
          ctrl.guardarApoderado();
        } catch (e) {
          swal("¡Opss!", "Ocurrió un error: " + e, "error");
        }
      } else {
        ctrl.apoderado.id = response.data.id;
        if (ctrl.disableApoderado == true) {
          //solo cambiar idApoderado
          $http.get("./app/SGA/administrador/gestionAlumnos/modificarIdApoderado.php",{params: {id: ctrl.alumno.id, idApoderado: ctrl.apoderado.id}})
          .then(function (response) {
            // console.log(response);
            if (response.data == 'HECHO SIN ERRORES') {
              swal("¡Bien hecho!", "Se cambió el apoderado del alumno" , "success");
            } else {
              swal("¡Opss!", "No se pudo cambiar el apoderado del alumno." , "error");
            }
          });
        } else {
          //solo cambiar info apoderado
          $http.get("./app/SGA/administrador/gestionAlumnos/modificarApoderado.php",{params: {id: ctrl.apoderado.id, nombres: ctrl.apoderado.nombres, apellidos: ctrl.apoderado.apellidos, correo: ctrl.apoderado.correo, telefono: ctrl.apoderado.telefono, direccion: ctrl.apoderado.direccion}})
          .then(function (response) {
            // console.log(response);
            if (response.data == 'HECHO SIN ERRORES') {
              swal("¡Bien hecho!", "La información del apoderado fue modificado exitosamente" , "success");
            } else {
              swal("¡Opss!", "No se pudo modificar el apoderado del alumno." , "error");
            }
          });
        }
      }
    })
  }

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
    ctrl.disableDNI = false;
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

  ctrl.cargarInfo = function () {
    ctrl.alumno.id = $stateParams.idAlumno;
    $http.get('./app/SGA/administrador/gestionAlumnos/cargarAlumno.php',{params: {id: ctrl.alumno.id}}
    ).then(function (response) {
        ctrl.alumno.dni = response.data.dni;
        ctrl.alumno.nombres = response.data.nombres;
        ctrl.alumno.apellidos = response.data.apellidos;
        ctrl.alumno.correo = response.data.correo;
        ctrl.alumno.telefono = response.data.telefono;
        ctrl.alumno.direccion = response.data.direccion;
        ctrl.alumno.grupoSanguineo = response.data.grupoSanguineo;
        ctrl.alumno.genero = response.data.genero;
        fechaStr = response.data.nacimiento;
        yearM = fechaStr.substr(0,4);
        monthM = fechaStr.substr(5,2);
        dayM = fechaStr.substr(8,2);
        ctrl.alumno.nacimiento = new Date(yearM, monthM, dayM);
        ctrl.apoderado.id = response.data.idApoderado;
        $http.get('./app/SGA/administrador/gestionAlumnos/cargarApoderado.php',{params: {id: ctrl.apoderado.id}}
        ).then(function (response) {
          ctrl.apoderado.dni = response.data.dni;
          ctrl.apoderado.nombres = response.data.nombres;
          ctrl.apoderado.apellidos = response.data.apellidos;
          ctrl.apoderado.correo = response.data.correo;
          ctrl.apoderado.direccion = response.data.direccion;
          ctrl.apoderado.telefono = response.data.telefono;
          ctrl.disableDNI = true;
        })
    })
  }

  ctrl.irEditarAlumno = function(id) {
    $state.go('editar-alumno', {idAlumno: id});
  }

  ctrl.init();

}]);
