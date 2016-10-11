angular.module('AdminSqlServer')
.controller("fkCtrl", function($scope,$http,$location,serveData)
{
    $scope.ObtenerColumnas;
    $scope.CrearFK;
 
    $scope.ObtenerTablas = function()
    {
        $scope.url = "http://localhost:8080/AdministradorBaseDatosSQLServer/Conexion/conexion.php?Funcion=ObtenerTablas";
        console.log(serveData.dbName, serveData.userName, serveData.password)
        $scope.data = {"dbName":serveData.dbName,"userName":serveData.userName,"password":serveData.password}; 
        $http.post($scope.url,$scope.data).success( function(response){
            if(response){ 
                console.log(response);
                $scope.listaTabsD = response;
                $scope.listaTabsO = response;
            }
            else{
                alert("..¡Fallo la conecion con Sql Server.");
            }
        }); 
    };
    $scope.ObtenerTablas();
    
    $scope.ObtenerColumnas = function()
    {
        $scope.url = "http://localhost:8080/AdministradorBaseDatosSQLServer/Conexion/conexion.php?Funcion=get_Columna";
        console.log(serveData.dbName, serveData.userName, serveData.password)
        $scope.data = {"dbName":serveData.dbName,"userName":serveData.userName,"password":serveData.password,"Tabla":$scope.tablaDestino}; 
        $http.post($scope.url,$scope.data).success( function(response){
            if(response){ 
                console.log(response);
                $scope.listaColsD = response;
            }
            else{
                alert("..¡Fallo la conecion con Sql Server.");
            }
        }); 
    };
    
    $scope.ObtenerLlavesPrimarias = function()
    {
        $scope.url = "http://localhost:8080/AdministradorBaseDatosSQLServer/Conexion/conexion.php?Funcion=ObtenerPKs";
        console.log(serveData.dbName, serveData.userName, serveData.password)
        $scope.data = {"dbName":serveData.dbName,"userName":serveData.userName,"password":serveData.password,"Tabla":$scope.tablaOrigen}; 
        $http.post($scope.url,$scope.data).success( function(response){
            if(response){ 
                console.log(response);
                $scope.listaColsO = response;
            }
            else{
                alert("..¡Fallo la conecion con Sql Server.");
            }
        }); 
    };
    
    $scope.CrearFK = function()
    {
        $scope.url = "http://localhost:8080/AdministradorBaseDatosSQLServer/Conexion/conexion.php?Funcion=CrearFK";
        console.log(serveData.dbName, serveData.userName, serveData.password);
        $scope.data = {"dbName":serveData.dbName,"userName":serveData.userName,"password":serveData.password,
            "TablaRef":$scope.tablaDestino,"ColumnaRef":$scope.columnaDestino,"TablaPK":$scope.tablaOrigen,"ColumnaPK":$scope.columnaOrigen}; 
        console.log($scope.tablaDestino,$scope.columnaDestino,$scope.tablaOrigen,$scope.columnaOrigen);
        $http.post($scope.url,$scope.data).success( function(response){
            if(response){ 
                console.log(response);
            }
            else{
                alert("..¡Fallo la conecion con Sql Server.");
            }
        }); 
    };
    
    $scope.EliminarFK = function()
    {
        $scope.url = "http://localhost:8080/AdministradorBaseDatosSQLServer/Conexion/conexion.php?Funcion=EliminarFK";
        console.log(serveData.dbName, serveData.userName, serveData.password);
        $scope.data = {"dbName":serveData.dbName,"userName":serveData.userName,"password":serveData.password,
            "TablaRef":$scope.tablaDestino,"ColumnaRef":$scope.columnaDestino}; 
        $http.post($scope.url,$scope.data).success( function(response){
            if(response){ 
                console.log(response);
            }
            else{
                alert("..¡Fallo la conecion con Sql Server.");
            }
        }); 
    };
    
});

