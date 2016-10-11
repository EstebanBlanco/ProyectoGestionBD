angular.module('AdminSqlServer')
.controller("ControladorEstadisticas", function($scope,$http,serveData)
{
    console.log("Controlador Estadisticas");
    $scope.VerGrafico;
    $scope.nombreArchivo;
    $scope.tOcupado;
    $scope.tDisponible;
    $scope.tActual;
    $scope.tMax;
    $scope.baseConectada = serveData.dbName;
    var ctx;
    
    /*Obtencion de los nombres de los archivos para mostrarlos al usuario*/
    $scope.ObtenerArchivos = function()
    {
        $scope.url = "http://localhost/AdministradorBaseDatosSQLServer/Conexion/conexion.php?Funcion=ObtenerArchivosBD";
        console.log(serveData.dbName, serveData.userName, serveData.password)
        $scope.data = {"dbName":serveData.dbName,"userName":serveData.userName,"password":serveData.password}; 
        $http.post($scope.url,$scope.data).success( function(response){
            if(response){ 
                console.log(response);
                $scope.listaArchivos = response;
            }
            else{
                alert("..¡Fallo la conecion con Sql Server.");
            }
        }); 
    };
    
    $scope.ObtenerArchivos();
    
    /*Obtencion de los datos de los archivos para alimentar el grafico:
     * Espacio ocupado
     * Espacio Libre
     * Tamaño Actual
     * Tamaño Máximo
     * */
    $scope.ObtenerEstadisticasArchivo = function()
    {
        $scope.url = "http://localhost/AdministradorBaseDatosSQLServer/Conexion/conexion.php?Funcion=ObtenerInformacionEstadistica";
        $scope.data = {"dbName":serveData.dbName,"userName":serveData.userName,"password":serveData.password,"nombreArchivo":$scope.nombreArchivo};
        $http.post($scope.url,$scope.data).success( function(response){
            if(response){ 
                console.log(response);
                $scope.tMax = response[0].TamanoMaximo;
                $scope.tOcupado = response[0].EspacioUtilizado;
                $scope.tDisponible = response[0].EspacioLibre;
                $scope.tActual = response[0].EspacioTotal;
                
                console.log($scope.tOcupado,$scope.tDisponible,$scope.tActual,$scope.tMax)
                $scope.VerGrafico();
            }
            else{
                alert("..¡Fallo la conecion con Sql Server.");
            }
        }); 
    };
   
  
    
    /*Pintar el gráfico con los datos del archivo seleccionado
     *Formato JSON, requerido por GoJs */
    $scope.VerGrafico = function()
    {
        ctx= document.getElementById("myChart");

        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Ocupado", "Disponible", "Tamaño", "Tamaño Máximo"],
                datasets: [{
                    label: ['Espacios es discos'],
                    data: [($scope.tOcupado/$scope.tMax)*100, ($scope.tDisponible/$scope.tMax)*100, ($scope.tActual/$scope.tMax)*100, 100],
                    backgroundColor: [
                        'rgba(248, 6, 6, 0.9)',
                        'rgba(22, 247, 176, 0.9)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'

                    ],
                    borderColor: [
                        'rgb(225, 9, 9, 1)',
                        'rgb(4, 199, 209, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }
  
});
