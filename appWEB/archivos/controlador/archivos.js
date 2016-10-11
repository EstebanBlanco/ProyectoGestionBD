angular.module('AdminSqlServer')
.controller("archivosCtrl", function($scope,$http,$location,serveData)
{
    $scope.baseConectada = serveData.dbName;   
     $scope.ProcesarOperacionArchivo;
     $scope.opcion = 'archivo';
     $scope.accion = 'agregar';
     $scope.nuevoNombre = "";
     $scope.size = "";
     $scope.maxSize = "";
     $scope.filegrowth = "";
     
     /*Obtencion de los nombres de los filegroups*/
      $scope.ObtenerFileGroups = function()
    {
        $scope.url = "http://localhost/AdministradorBaseDatosSQLServer/Conexion/conexion.php?Funcion=ObtenerFilegroupsBD";
        $scope.data = {"dbName":serveData.dbName,"userName":serveData.userName,"password":serveData.password}; 
        $http.post($scope.url,$scope.data).success( function(response){
            if(response){ 
                console.log(response);
                $scope.listaFgs = response;
            }
            else{
                alert("..¡Fallo la conecion con Sql Server.");
            }
        }); 
    };
    
    /*Obtencion de los nombres de los archivos*/
    $scope.ObtenerArchs = function()
    {
        $scope.url = "http://localhost:8080/AdministradorBaseDatosSQLServer/Conexion/conexion.php?Funcion=ObtenerArchivosBD";
        console.log(serveData.dbName, serveData.userName, serveData.password)
        $scope.data = {"dbName":serveData.dbName,"userName":serveData.userName,"password":serveData.password}; 
        $http.post($scope.url,$scope.data).success( function(response){
            if(response){ 
                console.log(response);
                $scope.listaArchs = response;
            }
            else{
                alert("..¡Fallo la conecion con Sql Server.");
            }
        }); 
    };
    
    $scope.ObtenerFileGroups();
    $scope.ObtenerArchs();
    
    /*Operaciones de la vista Archivos:
     * Agregar Filegroups
     * Agregar Archivos
     * Modificar uno o mas atributos de un archivo
     * */
    $scope.ProcesarOperacionArchivo = function()
    {   
        if ($scope.opcion == 'filegroup'){
            $scope.url = "http://localhost:8080/AdministradorBaseDatosSQLServer/Conexion/conexion.php?Funcion=CrearFilegroup";
            $scope.nombreF = serveData.dbName+$scope.nombre;
            console.log($scope.nombreF);
            $scope.data = {"dbName":serveData.dbName,"userName":serveData.userName,"password":serveData.password, "nombreFG":$scope.nombreF}; 
            $http.post($scope.url,$scope.data).success( function(response){
                if(response){ 
                    console.log(response);
                    console.log("Se agrego el filegroup")
                    $scope.ObtenerFileGroups();
                }
                else{
                    alert("..¡Fallo la conecion con Sql Server.");
                }
            });
        }
        else
        {
            if ($scope.accion == 'agregar'){
                $scope.url = "http://localhost:8080/AdministradorBaseDatosSQLServer/Conexion/conexion.php?Funcion=CrearArchivo";
                $scope.nombreF = serveData.dbName+$scope.nombre;
                console.log($scope.nombreF);
                $scope.data = {"dbName":serveData.dbName,"userName":serveData.userName,"password":serveData.password,
                    "nombreFile":$scope.nombreF,"filegroup":$scope.filegroup,"size":$scope.size,"maxSize":$scope.maxSize,
                    "filegrowth":$scope.filegrowth}; 
                $http.post($scope.url,$scope.data).success( function(response){
                    if(response){ 
                        console.log(response);
                        console.log("Se agrego el archivo")
                        
                    }
                    else{
                        alert("..¡Fallo la conecion con Sql Server.");
                    }
                });
            }
            else
            {
                $scope.url = "http://localhost:8080/AdministradorBaseDatosSQLServer/Conexion/conexion.php?Funcion=ModificarArchivo";
                $scope.listaModif = [$scope.nuevoNombre.length>0,$scope.size.length>0,
                    $scope.maxSize.length>0,$scope.filegrowth.length > 0]
                console.log($scope.listaModif);
                $scope.data = {"dbName":serveData.dbName,"userName":serveData.userName,"password":serveData.password,
                    "nombreFile":$scope.arch,"nuevoNombre":serveData.dbName+$scope.nuevoNombre,"size":$scope.size,"maxSize":$scope.maxSize,
                    "filegrowth":$scope.filegrowth,"listaModif":$scope.listaModif}; 
                $http.post($scope.url,$scope.data).success( function(response){
                    if(response){ 
                        console.log(response);
                        console.log("Se agrego el archivo")
                    }
                    else{
                        alert("..¡Fallo la conecion con Sql Server.");
                    }
                });
                
            }
        }
                
    };
});

