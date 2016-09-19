angular.module('AdminSqlServer')
.controller("loginCtrl", function($scope,$http)
{
    console.log("Hola mae ya entre y me cai...");
    $scope.autenticado = ["Windows Authentication","SQL Server Authentication"]
    $scope.selecion = "";
    $scope.habilitar = function(seleccionado)
    {
        console.log(seleccionado);
    };
    
    $scope.conexionSqlServer = function(dbName,userName,password){
        console.log(dbName+userName+password);
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
    };
});