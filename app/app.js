var mySGAApp = angular.module("mySGAApp", ['ui.router','ui.router.stateHelper', 'ngCookies', 'ui.bootstrap', 'ngTable']);

mySGAApp.config(['stateHelperProvider', '$urlRouterProvider', '$qProvider', function(stateHelperProvider, $urlRouterProvider, $qProvider){
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
            name: 'homeAdmin',
            url: '/homeAdmin',
            templateUrl: 'app/SGA/administrador/home/home.html'
          // },
          // {
          //   name: 'gestionUsuarios',
          //   url: '/gestionUsuarios',
          //   templateUrl: 'app/SGA/administrador/usuarios/gestorUsuarios.html',
          //   controller: 'gestorUsuariosCtrl as GUCtrl',
          // },
          // {
          //   name: 'gestionEmpleados',
          //   url: '/gestionEmpleados',
          //   templateUrl: 'app/SGA/administrador/usuarios/gestorEmpleados.html',
          //   controller: 'gestorUsuariosCtrl as GUCtrl',
          // },
          // {
          //   name: 'empresa',
          //   url: '/empresa',
          //   templateUrl: 'app/SGA/administrador/empresas/empresa.html',
          //   children: [
          //     {
          //       name: 'gestionEmpresas',
          //       url: '/gestionEmpresas',
          //       templateUrl: 'app/SGA/administrador/empresas/gestorEmpresas.html',
          //       controller: 'gestorEmpresasCtrl as GECtrl'
          //     },
          //     {
          //       name: 'matrizFODA',
          //       url: '/matrizFODA/:empresaID',
          //       templateUrl: 'app/SGA/administrador/empresas/matrizFoda/matrizFoda.html',
          //       controller: 'matrizFodaCtrl as MFCtrl'
          //     },
          //     {
          //       name: 'matrizPvsA',
          //       url: '/matrizPvsA/:empresaID',
          //       templateUrl: 'app/SGA/administrador/empresas/matrizProcesosVSAreas/matrizPvsA.html',
          //       controller: 'matrizPvsACtrl as MPCtrl'
              // },
              // {
              //   name: 'matrizVer',
              //   url: '/matrizVer/:empresaID',
              //   templateUrl: 'app/SGA/administrador/empresas/matrizFoda/matrizFodaLectura.html',
              //   controller: 'matrizFodaCtrl as MFCtrl'
              }
            ]
          }
        ]
      // },
      // {
      //   name: 'coordinador',
      //   url: '/coordinador',
      //   templateUrl: 'app/SGA/coordinador/coordinador.html',
      //   children: [
      //     {
      //       name: 'homeCoordinador',
      //       url: '/homeCoordinador',
      //       templateUrl: 'app/SGA/coordinador/home/home.html'
      //     },
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
      //     }
      //   ]
      }
    ]
  }, { keepOriginalNames: true })
  // .state({
  //   name: 'login',
  //   url: '/login',
  //   templateUrl: 'app/SGA/login/login.html',
  //   controller: 'loginCtrl as ctrl'
  // });
  // $urlRouterProvider.otherwise("/login");
}]);

mySGAApp.controller("SGAController", ['$scope', function($scope){
  var ctrl = this;
}]);
