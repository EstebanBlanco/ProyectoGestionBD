angular.module('AdminSqlServer')
.controller("loginCtrl", function($scope,$http)
{
    $scope.GetAllDataBase = function()
    {
        console.log($scope.baseSeleccionada)
        $scope.url = "http://localhost/AdministradorBaseDatosSQLServer/Conexion/conexion.php?Funcion=GetAllDataBase";
        $scope.data = {"":""};     
        $http.post($scope.url,$scope.data).success( function(response){
            if(response){ 
                $scope.allDateBase = response;
                console.log($scope.allDateBase);
            }
            else{
                alert("..¡Fallo la conecion con Sql Server.");
            }
        }); 
    };
    $scope.GetAllDataBase();
    
    $scope.conexionSqlServer = function(dbName,userName,password){
    	$scope.url = "http://localhost/AdministradorBaseDatosSQLServer/Conexion/conexion.php?Funcion=ConectarConUsuario";
        $scope.data = {dbName: dbName,userName: userName, password:password};     
        $http.post($scope.url,$scope.data)
        .success(function (response)
        {
            if(response){             
                console.log(response);
            }
            else{
                alert("Se inserto el cliente");
            }
        });
    };
});