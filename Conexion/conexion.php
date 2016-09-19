<?php

if(function_exists($_REQUEST['Funcion'])){
    $_REQUEST['Funcion']();
}
else
{
    echo 'La funcion no ha sido creada: Comuniquese';
}

function conectar()
{
    $objDatos = json_decode(file_get_contents("php://input"));
    
    $serverName = "CARLOS\MSSQLSERVER1"; //serverName\instanceName
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
    //$respuesta =  pg_fetch_all($result);

    echo json_encode($rows);
    
}