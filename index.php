<!DOCTYPE html>
<!--Desarrollador: Carlos Villafuerte, Esteban Blanco
	Version: 1.0
	Module: AdminSqlServer
	Año: 2016 
-->
<html>
    <head>
    	{{Hola}}
        <meta charset="utf-8">
        <title>Administrador BD SqlServer</title>
        <!--Import Google Icon Font-->
        <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <!--Import materialize.css-->
        <link type="text/css" rel="stylesheet" href="lib/materialize-css/dist/css/materialize.min.css"  media="screen,projection"/>
        <link type="text/css" rel="stylesheet" href="style/style.css"/>
    </head>
    <body ng-app="AdminSqlServer">
        
    	<div>
            <div ng-view></div>
        </div>
        
        <!-- Carga libreria AngularJS.-->
    	<script type="text/javascript" src="lib/angular/angular.min.js" ></script>
    	<script type="text/javascript" src="lib/angular/angular-route.min.js" ></script>
        <!-- Carga libreria jQuery.-->
        <script src="lib/jquery/dist/jquery.min.js"></script>
        <script type="text/javascript" src="lib/materialize-css/dist/js/materialize.min.js"></script>
    	<!-- Carga libreria jQuery-UI.-->
        <script type="text/javascript" src="lib/jquery-ui/jquery-ui.min.js" ></script>
        <link rel="stylesheet" href="lib/jquery-ui/jquery-ui.min.css">
        
        

        <!--Carga el enrutamiento de AngularJS-->
        <script src="app.js"></script> 
        
        <!--Carga de jQuery events-->
        <script type="text/javascript" src="funciones.js"></script>
        
        <!-- Carga de controladores.-->
        <script type="text/javascript" src="appWEB/login/controlador/login.js" ></script>

    </body>
</html>
