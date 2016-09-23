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
        })
        .when('/estadisticas', {
            templateUrl	: 'appWEB/estadisticas/estadisticas.html',
            controller 	: 'estadisticasCtrl'          
        })
        .otherwise({
            redirectTo: '/'
        });
});