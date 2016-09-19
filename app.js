//Route: Para la navegación de las paginas en AngularJS

angular.module('AdminSqlServer', ['ngRoute'])
.config(function($routeProvider) 
{
    $routeProvider
        .when('/', {
            templateUrl	: 'appWEB/login/login.html',
            controller 	: 'loginCtrl'          
        })
        .otherwise({
            redirectTo: '/'
        });
});