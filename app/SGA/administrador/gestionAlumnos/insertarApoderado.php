<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json; charset=UTF-8');

  $response = [];
  $json_array = array();
  // $data = json_decode(file_get_contents("php://input"));

  //RECIBE VARIABLES
  $id = $_GET['id'];
  $dni = $_GET['dni'];
  $nombres = $_GET['nombres'];
  $apellidos = $_GET['apellidos'];
  $correo = $_GET['correo'];
  $telefono = $_GET['telefono'];
  $direccion = $_GET['direccion'];

// $username = mysqli_real_escape_string($con, $data->username);
  $con = mysqli_connect('127.0.0.1', 'root', '', 'SGA_SAN_NICOLAS') or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );
  // echo json_encode($query);
  $tildes = $con->query("SET NAMES 'utf8'"); //Para que se muestren las tildes correctamente
  $query = "insert into apoderado values ('$id', '$dni', upper('$nombres'), upper('$apellidos'), '$correo', '$telefono', upper('$direccion'),1)";
  //
  try {
    $result = mysqli_query($con, $query) or die ( "Algo ha ido mal en la consulta a la base de datos");
    echo json_encode("HECHO SIN ERRORES");
  } catch (\Exception $e) {
    echo json_encode("$e.");
  }


?>
