/* global go, NaN */
angular.module('AdminSqlServer')
.controller("tablasCtrl", function($scope,$http,$location,serveData)
{
    $scope.saludo = "Hola mae";
    $scope.baseConectada = serveData.dbName;
});


