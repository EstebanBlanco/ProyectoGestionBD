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
    $serverName = "ESTEBANPC\SQLEXPRESS"; //serverName\instanceName
    $connectionInfo = array("Database"=>$objDatos->dbName, "UID"=>$objDatos->userName, "PWD"=>$objDatos->password);
    //$conn = sqlsrv_connect($serverName);
    $conn = sqlsrv_connect($serverName,$connectionInfo );
    if($conn){
        echo $conn;
    }
}

function GetAllDataBase(){
    $objDatos = json_decode(file_get_contents("php://input"));   
    $serverName = "ESTEBANPC\SQLEXPRESS";
    $connectionInfo = array("CharacterSet" => "UTF-8", "ReturnDatesAsStrings" => true, "MultipleActiveResultSets" => true);
    $conn = sqlsrv_connect($serverName,$connectionInfo);
    $query = "SELECT name, database_id, create_date FROM sys.databases"; 
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
    $serverName = "ESTEBANPC\SQLEXPRESS";
    //$connectionInfo = array("Database"=>$objDatos->dbName, "UID"=>$objDatos->userName, "PWD"=>$objDatos->password);
        
    $connectionInfo = array("Database"=>"redTEC", "UID"=>"sa", "PWD"=>"gabrielwhite_525");
    $conn = sqlsrv_connect($serverName,$connectionInfo);
    if( $conn === false ) {
        die( print_r( sqlsrv_errors(), true));
    }
    //$sql = "select * from Personas";
    $sql = "SELECT T.TABLE_NAME, C.COLUMN_NAME, C.DATA_TYPE, C.NUMERIC_PRECISION 
	FROM INFORMATION_SCHEMA.TABLES T INNER JOIN INFORMATION_SCHEMA.COLUMNS C ON
	(T.TABLE_NAME = C.TABLE_NAME)";
    //$stmt = sqlsrv_query($conn,$sql);
    //$stmt = sqlsrv_prepare($conn, $sql);
    //$result = sqlsrv_execute($stmt);
    if( $stmt === false) {
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
