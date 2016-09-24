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
    $connectionInfo = array("Database"=>$objDatos->dbName, "UID"=>$objDatos->userName, "PWD"=>$objDatos->password,"CharacterSet" => "UTF-8", "ReturnDatesAsStrings" => true, "MultipleActiveResultSets" => true);
        
    //$connectionInfo = array("Database"=>"RED_PARTY_TEC", "UID"=>"sa", "PWD"=>"2016","CharacterSet" => "UTF-8", "ReturnDatesAsStrings" => true, "MultipleActiveResultSets" => true);//
    $conn = sqlsrv_connect($serverName,$connectionInfo);
    if( $conn === false ) {
        die( print_r( sqlsrv_errors(), true));
    }
    $consulta1 = "SELECT TABLE_NAME as Tabla,COLUMN_NAME as Columna FROM INFORMATION_SCHEMA.COLUMNS";
    $stmt = sqlsrv_query($conn,$consulta1);
    if( $stmt === false) {
        echo 'Entre en el error(Falso)';
        die( print_r( sqlsrv_errors(), true) );
    }
    $respuesta1 = array();
    while( $row = sqlsrv_fetch_object($stmt)){
        $respuesta1[]= $row;
    }
    $consulta2 = "SELECT OBJECT_NAME(fk.parent_object_id) AS TableName,COL_NAME(fc.parent_object_id,fc.parent_column_id) AS ColumnName,OBJECT_NAME (fk.referenced_object_id) AS ReferenceTableName, COL_NAME(fc.referenced_object_id, fc.referenced_column_id) AS ReferenceColumnName FROM sys.foreign_keys AS fk INNER JOIN sys.foreign_key_columns AS fc ON fk.OBJECT_ID = fc.constraint_object_id";
    $stmt2 = sqlsrv_query($conn,$consulta2);
    if( $stmt === false) {
        echo 'Entre en el error(Falso)';
        die( print_r( sqlsrv_errors(), true) );
    }
    $respuesta2 = array();
    while( $row = sqlsrv_fetch_object($stmt2)){
        $respuesta2[]= $row;
    }
    $consulta3 = "SELECT Col.Column_Name as llave from INFORMATION_SCHEMA.TABLE_CONSTRAINTS Tab,INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE Col WHERE Col.Constraint_Name = Tab.Constraint_Name AND Col.Table_Name = Tab.Table_Name AND Constraint_Type = 'PRIMARY KEY'";
    $stmt3 = sqlsrv_query($conn,$consulta3);
    if( $stmt3 === false) {
        echo 'Entre en el error(Falso)';
        die( print_r( sqlsrv_errors(), true) );
    }
    $respuesta3 = array();
    while( $row = sqlsrv_fetch_object($stmt3)){
        $respuesta3[]= $row;
    }
    $allConsulta = array();
    $allConsulta[] = $respuesta1;
    $allConsulta[] = $respuesta2;
    $allConsulta[] = $respuesta3;
    echo (json_encode($allConsulta));
    
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
    
    $serverName = "CARLOS\MSSQLSERVER1"; //serverName\instanceName
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
    
    $serverName = "CARLOS\MSSQLSERVER1";
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
