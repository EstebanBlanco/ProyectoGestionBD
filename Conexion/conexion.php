<?php

if(function_exists($_REQUEST['Funcion'])){
    $_REQUEST['Funcion']();
}
else
{
    echo '..¡No la encuentro!';
}

function ConectarConUsuario(){
    $objDatos = json_decode(file_get_contents("php://input"));
    //$objDatos->dbName $objDatos->userName $objDatos->password
    $serverName = "CARLOS\MSSQLSERVER1"; //serverName\instanceName
    $connectionInfo = array("Database"=>$objDatos->dbName, "UID"=>$objDatos->userName, "PWD"=>$objDatos->password);
    //$conn = sqlsrv_connect($serverName);
    $conn = sqlsrv_connect($serverName,$connectionInfo );
    if($conn){
        echo $conn;
    }
}

function GetAllDataBase(){
    $objDatos = json_decode(file_get_contents("php://input"));   
    $serverName = "CARLOS\MSSQLSERVER1";
    $connectionInfo = array("CharacterSet" => "UTF-8", "ReturnDatesAsStrings" => true, "MultipleActiveResultSets" => true);
    $conn = sqlsrv_connect($serverName,$connectionInfo);
    $query = "SELECT name FROM master.dbo.sysdatabases WHERE name NOT IN ('master','model','msdb','tempdb')";
    //$query = "SELECT name, database_id, create_date FROM sys.databases"; 
    $stmt = sqlsrv_query( $conn, $query);
    if( $stmt === false ) {
         die( print_r( sqlsrv_errors(), true));
    }
    $rows = array();  
    while( $row = sqlsrv_fetch_object($stmt)){
        $rows[]= $row;
    }
    echo (json_encode($rows));
    sqlsrv_free_stmt( $stmt);  
    sqlsrv_close( $conn);  
}

function GetTable_and_Column(){
    $objDatos = json_decode(file_get_contents("php://input"));
    $serverName = "CARLOS\MSSQLSERVER1";
    //$connectionInfo = array("Database"=>$objDatos->dbName, "UID"=>$objDatos->userName, "PWD"=>$objDatos->password);
        
    $connectionInfo = array("Database"=>"RED_PARTY_TEC", "UID"=>"sa", "PWD"=>"2016","CharacterSet" => "UTF-8", "ReturnDatesAsStrings" => true, "MultipleActiveResultSets" => true);//
    $conn = sqlsrv_connect($serverName,$connectionInfo);
    if( $conn === false ) {
        die( print_r( sqlsrv_errors(), true));
    }
    $sql = "SELECT TABLE_NAME as Tabla,COLUMN_NAME as Columna FROM INFORMATION_SCHEMA.COLUMNS";
    $stmt = sqlsrv_query($conn,$sql);
    if( $stmt === false) {
        echo 'Entre en el error(Falso)';
        die( print_r( sqlsrv_errors(), true) );
    }
    $rows = array();
    while( $row = sqlsrv_fetch_object($stmt)){
        $rows[]= $row;
        //echo json_encode($row);
    }
    echo (json_encode($rows));
    sqlsrv_free_stmt( $stmt);  
    sqlsrv_close( $conn);   
}

function get_Columna(){
    $objDatos = json_decode(file_get_contents("php://input"));
    $serverName = "CARLOS\MSSQLSERVER1";
    //$connectionInfo = array("Database"=>$objDatos->dbName, "UID"=>$objDatos->userName, "PWD"=>$objDatos->password);
        
    $connectionInfo = array("Database"=>"RED_PARTY_TEC", "UID"=>"sa", "PWD"=>"2016","CharacterSet" => "UTF-8", "ReturnDatesAsStrings" => true, "MultipleActiveResultSets" => true);//
    $conn = sqlsrv_connect($serverName,$connectionInfo);
    if( $conn === false ) {
        die( print_r( sqlsrv_errors(), true));
    }
    $sql = "select column_name as Columnas from INFORMATION_SCHEMA.COLUMNS where table_name = '$objDatos->Tabla'";
    $stmt = sqlsrv_query($conn,$sql);
    if( $stmt === false) {
        echo 'Entre en el error(Falso)';
        die( print_r( sqlsrv_errors(), true) );
    }
    $rows = array();
    while( $row = sqlsrv_fetch_object($stmt)){
        $rows[]= $row;
    }
    echo (json_encode($rows));
    sqlsrv_free_stmt( $stmt);  
    sqlsrv_close( $conn);   
}