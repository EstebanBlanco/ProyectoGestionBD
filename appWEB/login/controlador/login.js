angular.module('AdminSqlServer')
.controller("loginCtrl", function($scope,$http)
{
    console.log("Hola mae")
    $scope.saludar = "Hola... Estamos en el controldor y la vista de login."

    $scope.conexionSqlServer = function(){
    	$scope.url = "http://localhost/AdministradorBaseDatosSQLServer/Conexion/conexion.php?Funcion=conectar";
        $scope.data = {Cedula: "Hola..."};     
        $http.post($scope.url,$scope.data)
        .success(function (response)
        {
            //console.log(response);
            if(response)
            {
                console.log(response);
            }
            else
            {
                alert("Se inserto el cliente");
            }
        });
    }
});