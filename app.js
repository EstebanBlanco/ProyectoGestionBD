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
        }).when('/prueba', {
            templateUrl	: 'appWEB/prueba.html',
            controller 	: 'loginCtrl'          
        })
        .otherwise({
            redirectTo: '/'
        });
});