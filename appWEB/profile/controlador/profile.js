/* global go, NaN */
angular.module('AdminSqlServer')
.controller("profileCtrl", function($scope,$http,$location,serveData)
{
    $scope.baseConectada = serveData.dbName;
});
