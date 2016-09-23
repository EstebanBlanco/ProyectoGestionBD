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
    
    $serverName = "ESTEBANPC\SQLEXPRESS"; //serverName\instanceName
	// Puesto que no se han especificado UID ni PWD en el array  $connectionInfo,
	// La conexión se intentará utilizando la autenticación Windows.
        //$connectionInfo = array( "Database"=>"RED_PARTY_TEC");
    $conn = sqlsrv_connect($serverName);
    $query = "SELECT name, database_id, create_date FROM sys.databases"; 
    $stmt = sqlsrv_query( $conn, $query);
    if( $stmt === false ) {
         die( print_r( sqlsrv_errors(), true));
    }
    // Hacer que sea disponible para su lectura la primera (y en este caso única) fila del conjunto resultado.
    if( sqlsrv_fetch( $stmt ) === false) {
         die( print_r( sqlsrv_errors(), true));
    }
    // Obtener los campos de la fila. Los índices de campo empiezan desde 0 y se deben obtener en orden.
    // Recuperar los nombres de campo por su nombre no está soportado por sqlsrv_get_field.
    $rows = [];
    while($row = sqlsrv_fetch_array($stmt))
    {
        $rows[] = $row;
    }
    echo json_encode($rows); 
}

function GetTable_and_Column(){
    $objDatos = json_decode(file_get_contents("php://input"));
    $serverName = "ESTEBANPC\SQLEXPRESS";
    //$connectionInfo = array("Database"=>$objDatos->dbName, "UID"=>$objDatos->userName, "PWD"=>$objDatos->password);
    $connectionInfo = array("Database"=>"redTEC", "UID"=>"sa", "PWD"=>"gabrielwhite_525");
    /*$query = "SELECT
                so.name AS Tabla,
                sc.name AS Columna,
                st.name AS Tipo,
                sc.max_length AS Tamaño
                FROM
                sys.objects so INNER JOIN
                sys.columns sc ON
                so.object_id = sc.object_id INNER JOIN sys.types st ON
                st.system_type_id = sc.system_type_id AND st.name != 'sysname' WHERE so.type = 'U' ORDER BY so.name,sc.name";
     */
    $conn = sqlsrv_connect( $serverName, $connectionInfo );
    if( $conn === false ) {
        die( print_r( sqlsrv_errors(), true));
    }

    $sql = "select * from Personas";
    $stmt = sqlsrv_query( $conn, $sql );
    
    /*$stmt = sqlsrv_prepare($conn, $sql);
    $result = sqlsrv_execute($stmt);
    $row = sqlsrv_fetch_object($result);
    echo json_encode($row);
    */
    
    
    if( $stmt === false) {
        die( print_r( sqlsrv_errors(), true) );
    }
    
    $rows = array();  
    // Hacer que sea disponible para su lectura la primera (y en este caso única) fila del conjunto resultado.
    $row = sqlsrv_fetch( $stmt );
    echo $row;
    
    while( $row = sqlsrv_fetch_array($stmt)) {
            $rows[] = $row;
    };
    echo json_encode($rows);
};
