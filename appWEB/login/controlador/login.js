angular.module('AdminSqlServer')
.controller("loginCtrl", function($scope,$http,$location,serveData)
{
    $scope.GetAllDataBase = function()
    {
        $scope.url = "http://localhost/AdministradorBaseDatosSQLServer/Conexion/conexion.php?Funcion=GetAllDataBase";
        $scope.data = {"":""};     
        $http.post($scope.url,$scope.data).success( function(response){
            if(response){ 
                $scope.allDateBase = response;
                console.log(response);
            }
            else{
                alert("..¡Fallo la conecion con Sql Server.");
            }
        }); 
    };
    console.log("Mae afuera del callback");
    console.log($scope.allDateBase);
    $scope.GetAllDataBase();
    
    $scope.conexionSqlServer = function(dbName,userName,password){
    	$scope.url = "http://localhost/AdministradorBaseDatosSQLServer/Conexion/conexion.php?Funcion=ConectarConUsuario";
        $scope.data = {dbName: dbName,userName: userName, password:password};     
        $http.post($scope.url,$scope.data)
        .success(function (response)
        {
            if(response){
                serveData.dbName = dbName;
                serveData.userName = userName;
                serveData.password = password;
                console.log(response);
                $location.path("/profile");
                
            }
            else{
                alert("¡¡Fallo la conexion!!");
            }
        });
    };
});