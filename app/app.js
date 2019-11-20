var mySGAApp = angular.module("mySGAApp", ['ui.router','ui.router.stateHelper', 'ngCookies', 'ui.bootstrap', 'ngTable', 'ngMaterial', 'ngMessages']);

mySGAApp.config(['stateHelperProvider', '$urlRouterProvider', function(stateHelperProvider, $urlRouterProvider){
  // $qProvider.errorOnUnhandledRejections(false);
  stateHelperProvider
  .state({
    name: 'raiz',
    url: '/raiz',
    templateUrl: 'app/SGA/raiz.html',
    controller: 'raizCtrl as RCtrl',
    children:[
      {
        name: 'administrador',
        url: '/administrador',
        templateUrl: 'app/SGA/administrador/administrador.html',
        children: [
          {
            name: 'inicioAdmin',
            url: '/inicioAdmin',
            templateUrl: 'app/SGA/administrador/principalAdministrador.html',
            controller: 'administradorCtrl as AdmCtrl'
          },
          {
            name: 'gestionar-alumno',
            url: '/gestionAlumno',
            templateUrl: 'app/SGA/administrador/gestionAlumnos/listarAlumnos.html',
            controller: 'gestorAlumnosCtrl as GACtrl',
          },
          {
            name: 'registrar-alumno',
            url: '/registrarAlumno',
            templateUrl: 'app/SGA/administrador/gestionAlumnos/registrarAlumnos.html',
            controller: 'gestorAlumnosCtrl as GACtrl',
          },
          {
            name: 'editar-alumno',
            url: '/editarAlumno/:idAlumno',
            templateUrl: 'app/SGA/administrador/gestionAlumnos/editarAlumno.html',
            controller: 'gestorAlumnosCtrl as GACtrl',
          },
          {
            name: 'gestionar-docente',
            url: '/gestionDocente',
            templateUrl: 'app/SGA/administrador/gestionDocentes/gestorDocentes.html',
            controller: 'gestorDocentesCtrl as GDCtrl',
          },
          {
            name: 'gestionar-curso',
            url: '/gestionCurso',
            templateUrl: 'app/SGA/administrador/gestionCursos/gestorCursos.html',
            controller: 'gestorCursosCtrl as GCCtrl',
          },
          {
            name: 'gestionar-asignacion',
            url: '/gestionAsignacion',
            templateUrl: 'app/SGA/administrador/gestionAsignaciones/gestorAsignaciones.html',
            controller: 'gestorAsignacionesCtrl as GAsCtrl'
          },
          {
            name: 'gestionar-usuario',
            url: '/gestionUsuario',
            templateUrl: 'app/SGA/administrador/gestionUsuarios/gestorUsuarios.html',
            controller: 'gestorUsuariosCtrl as GUCtrl'
          },
          {
            name: 'gestionar-grado',
            url: '/gestionGrado',
            templateUrl: 'app/SGA/administrador/gestionGrados/gestorGrados.html',
            controller: 'gestorGradosCtrl as GGCtrl'
          },
          {
            name: 'gestionar-seccion',
            url: '/gestionSeccion',
            templateUrl: 'app/SGA/administrador/gestionSecciones/gestorSecciones.html',
            controller: 'gestorSeccionesCtrl as GSCtrl'
          }
        ]
      },
      {
        name: 'alumno',
        url: '/alumno',
        templateUrl: 'app/SGA/alumno/alumno.html',
        children: [
          {
            name: 'inicioAlumno',
            url: '/inicioAlumno',
            templateUrl: 'app/SGA/alumno/principalAlumno.html',
            controller: 'alumnoCtrl as AlumCtrl'
      // },
      //     {
      //       name: 'gestionEmpleados',
      //       url: '/gestionEmpleados',
      //       templateUrl: 'app/SGA/coordinador/usuarios/gestorEmpleados.html',
      //       controller: 'gestorEmpleadosCtrl as GEmpCtrl',
      //     },
      //     {
      //       name: 'empresaCoordinador',
      //       url: '/empresaCoordinador',
      //       templateUrl: 'app/SGA/coordinador/empresas/empresa.html',
      //       children: [
      //         {
      //           name: 'gestionEmpresa',
      //           url: '/gestionEmpresa',
      //           templateUrl: 'app/SGA/coordinador/empresas/gestorEmpresa.html',
      //           controller: 'gestorEmpresasCtrl as GECtrl'
      //         },
      //         {
      //           name: 'matrizFODAEmpresa',
      //           url: '/matrizFODAEmpresa/:empresaID',
      //           templateUrl: 'app/SGA/coordinador/empresas/matrizFoda/matrizFODAEmpresa.html',
      //           controller: 'matrizFodaCtrl as MFCtrl'
      //         },
      //         {
      //           name: 'matrizPvsAEmpresa',
      //           url: '/matrizPvsAEmpresa/:empresaID',
      //           templateUrl: 'app/SGA/coordinador/empresas/matrizProcesosVSAreas/matrizPvsAEmpresa.html',
      //           controller: 'matrizPvsACtrl as MPCtrl'
      //         // },
      //         // {
      //         //   name: 'matrizVer',
      //         //   url: '/matrizVer/:empresaID',
      //         //   templateUrl: 'app/SGA/administrador/empresas/matrizFoda/matrizFodaLectura.html',
      //         //   controller: 'matrizFodaCtrl as MFCtrl'
      //         }
      //       ]
          }
        ]
      }
    ]
  }, { keepOriginalNames: true })
  .state({
    name: 'login',
    url: '/login',
    templateUrl: 'app/SGA/login/login.html',
    controller: 'loginCtrl as LCtrl'
  });
  $urlRouterProvider.otherwise("/raiz");
}]);

mySGAApp.controller("SGAController", ['$scope', function($scope){
  var ctrl = this;
}]);
