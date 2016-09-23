<!DOCTYPE html>
<!--Desarrollador: Carlos Villafuerte, Esteban Blanco
	Version: 1.0
	Module AngularJS: AdminSqlServer
	Año: 2016 
-->
<html>
    <head>
        <meta charset="utf-8">
        <title>Administrador BD SqlServer</title>
        <!--Importa las Iconos de google que utiliza Materialize.-->
        <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="lib/jquery-ui/jquery-ui.min.css">
        <link rel="stylesheet" href="lib/bootstrap/css/bootstrap.min.css">

        <link type="text/css" rel="stylesheet" href="style/style.css"/>
        <!--Da un formtado en el cuadro..-->
        <link href="lib/assets/css/goSamples.css" rel="stylesheet" type="text/css" />
    </head>
    <body ng-app="AdminSqlServer"> <!-- -->
        
    	<div>
            <div ng-view></div>
        </div>
        
        
        <!-- Carga libreria AngularJS.-->
    	<script type="text/javascript" src="lib/angular/angular.min.js" ></script>
        <script type="text/javascript" src="lib/angular/angular-route.min.js" ></script> 
        <!-- Carga libreria jQuery.--> 
        <script src="lib/jquery/dist/jquery.min.js"></script>
        <!-- Carga libreria GoJS.-->
        <script type="text/javascript" src="lib/go-debug.js"></script>
        <!-- <script type="text/javascript" src="lib/goSamples.js"></script> no se ocupa, pero no lo elimine-->
        <!-- Carga libreria Bootstrap.-->
        <script src="lib/bootstrap/js/bootstrap.min.js"></script>
        <!-- Carga libreria jQuery-UI.-->
        <script type="text/javascript" src="lib/jquery-ui/jquery-ui.min.js" ></script>     
        <script type="text/javascript" src="lib/chart/Chart.js"></script>
   
        <!--Carga el enrutamiento de AngularJS-->
        <script src="app.js"></script> 
        
        <!--Carga de jQuery events-->
        <script type="text/javascript" src="funciones.js"></script>  
        
        <script type="text/javascript" src="appWEB/service.js" ></script>
        
        <!-- Carga de controladores.-->
        <script type="text/javascript" src="appWEB/login/controlador/login.js" ></script>
        <script type="text/javascript" src="appWEB/estadisticas/controlador/estadisticas.js"></script>
        <script type="text/javascript" src="appWEB/profile/controlador/profile.js"></script>
    </body>
</html>
