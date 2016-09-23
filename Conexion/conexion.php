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
    /*$sql = "SELECT so.name AS Tabla, sc.name AS Columna, st.name AS Tipo, sc.max_length AS Tamaño "
            . "FROM sys.objects AS so INNER JOIN sys.columns AS sc ON so.object_id = sc.object_id "
            . "INNER JOIN sys.types AS st ON st.system_type_id = sc.system_type_id "
            . "AND st.name != ? "
            . "WHERE so.type = ? ORDER BY so.name,sc.name";*/
    $params = array("sysname","U");
    $stmt = sqlsrv_query($conn,$sql,$params);
    //$stmt = sqlsrv_prepare($conn, $sql, $params);
    //$result = sqlsrv_execute($stmt);
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

function ObtenerInformacionEstadistica(){
    $objDatos = json_decode(file_get_contents("php://input"));
    
    $serverName = "ESTEBANPC\SQLEXPRESS"; //serverName\instanceName
    $connectionInfo = array("Database"=>$objDatos->dbName, "UID"=>$objDatos->userName, "PWD"=>$objDatos->password);
    $conn = sqlsrv_connect($serverName,$connectionInfo );
    $query = "select SF.name,cast((U.allocated_extent_page_count*8)/1024 as int) as EspacioUtilizado, "
            . "cast((U.unallocated_extent_page_count*8)/1024 as int) as EspacioLibre, "
            . "cast((U.total_page_count*8)/1024 as int) as EspacioTotal,"
            . "cast((SF.maxsize*8)/1024 as int) as TamanoMaximo "
            . "from sysfiles sf inner join sys.dm_db_file_space_usage U on sf.fileid=u.file_id "
            . "where name = ? "; 
    $stmt = sqlsrv_query($conn,$query,array($objDatos->nombreArchivo));
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
    sqlsrv_close($conn); 
}

function ObtenerArchivosBD(){
    $objDatos = json_decode(file_get_contents("php://input"));
    
    $serverName = "ESTEBANPC\SQLEXPRESS";
    $connectionInfo = array("Database"=>$objDatos->dbName, "UID"=>$objDatos->userName, "PWD"=>$objDatos->password);
    $conn = sqlsrv_connect($serverName,$connectionInfo );
    $query = "SELECT name FROM sysfiles"; 
    $stmt = sqlsrv_query($conn,$query);
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
    sqlsrv_close($conn); 
}
