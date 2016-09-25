/*Desarrollador: Carlos Villafuerte, Esteban Blanco
	Version: 1.0
	Module AngularJS: AdminSqlServer.
	Año: 2016
    Descripción: route, para la navegación de las paginas en AngularJS.
    ','ui.materialize'
*/
angular.module('AdminSqlServer', ['ngRoute'])
.config(function($routeProvider) 
{
    $routeProvider
        .when('/', {
            templateUrl	: 'appWEB/login/login.html',
            controller 	: 'loginCtrl'          
        })
        .when('/profile', {
            templateUrl	: 'appWEB/profile/profile.html',
            controller 	: 'profileCtrl'          
        }).when('/modeloRelacional', {
            templateUrl	: 'appWEB/modeloRelacional/modeloRelacional.html',
            controller 	: 'modeloRelacionalCtrl'          
        }).when('/tablas', {
            templateUrl	: 'appWEB/modeloRelacinal/tablas.html',
            controller 	: 'tablasCtrl'          
        })
        .when('/estadisticas', {
            templateUrl	: 'appWEB/estadisticas/estadisticas.html',
            controller 	: 'ControladorEstadisticas'          
        })
        .when('/archivos', {
            templateUrl	: 'appWEB/archivos/archivos.html',
            controller 	: 'archivosCtrl'          
        })
        .otherwise({
            redirectTo: '/'
        });
});