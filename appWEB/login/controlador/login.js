angular.module('AdminSqlServer')
.controller("loginCtrl", function($scope,$http,$location,serveData)
{
    /*Obtencion de los nombres de las bases de datos de un servidor dado*/
    $scope.GetAllDataBase = function()
    {
        console.log($scope.baseSeleccionada)
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
    $scope.GetAllDataBase();
    
    
    /*Validación de usuario. En caso de ser correcto, las credenciales y la base de datos se almacenan en un service
     * para su posterior uso.
     * */
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