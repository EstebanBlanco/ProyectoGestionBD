/* global go, NaN */
angular.module('AdminSqlServer')
.controller("tablasCtrl", function($scope,$http,$location,serveData)
{
    
    $scope.baseConectada = serveData.dbName;
    $scope.esquemaSeleccionado = "";
    $scope.primaryKey = false;
    $scope.isNull = false;
    $scope.tiposDatos = ["int","varchar","char","datetime"];
    $scope.tipoSeleccionado = "";
    $scope.traerEsquemas = function(){
        $scope.url = "http://localhost:8080/AdministradorBaseDatosSQLServer/Conexion/conexion.php?Funcion=GetAllSchemes";
        $scope.data = {dbName: serveData.dbName,userName: serveData.userName, password: serveData.password};     
        $http.post($scope.url,$scope.data).success( function(response){
            if(response){
                $scope.listaEsquemas = response;        
            }
            else{
                alert("..¡Fallo la conecion con Sql Server.");
            }
        }); 
    };
    $scope.Columnas = [];
    $scope.agregarColumna = function(nombreColumna,tipoSeleccionado,primaryKey,isNull){
        if(primaryKey == true){
            var llaveP = "primary key";
            $scope.Columnas.push({Columna:nombreColumna,Tipo:tipoSeleccionado,esLlave:"primary key",esNull:""});
            console.log($scope.Columnas);
            return;
        }
        else if(isNull == true){
            $scope.Columnas.push({Columna:nombreColumna,Tipo:tipoSeleccionado,esLlave:"",esNull:"null"});
            console.log($scope.Columnas);
            return;
        }
        else if(isNull == false){
            $scope.Columnas.push({Columna:nombreColumna,Tipo:tipoSeleccionado,esLlave:"",esNull:"not null"});
            console.log($scope.Columnas);
            return;
        }
        
        
        
    };
    
    $scope.agregarTabla = function(nombreTabla,esquemaSeleccionado){
        $scope.url = "http://localhost:8080/AdministradorBaseDatosSQLServer/Conexion/conexion.php?Funcion=AddTabla";
        $scope.data = {dbName: serveData.dbName,userName: serveData.userName, password: serveData.password, NombreTabla:nombreTabla, Esquema:esquemaSeleccionado, Columnas:$scope.Columnas};     
        $http.post($scope.url,$scope.data).success( function(response){
            if(response){
                console.log(response);        
            }
            else{
                alert("..¡Fallo la conecion con Sql Server.");
            }
        }); 
    };
    $scope.traerEsquemas();
});


