<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json; charset=UTF-8');

  $response = [];
  $json_array = array();
  // $data = json_decode(file_get_contents("php://input"));
  //RECIBE VARIABLES
  $dni = $_GET['dni'];
  $nombres = $_GET['nombres'];
  $apellidos = $_GET['apellidos'];
  $correo = $_GET['correo'];

  // $username = mysqli_real_escape_string($con, $data->username);
  $con = mysqli_connect('127.0.0.1', 'root', '', 'SGA_SAN_NICOLAS') or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );
  // echo json_encode($query);
  $tildes = $con->query("SET NAMES 'utf8'"); //Para que se muestren las tildes correctamente
  // $query = "select * from usuarios where NombreUsuario = '$username' and PassUsuario = '$password'";
  $query = "insert into usuario values (uuid(), '$correo', '$dni', 'b1f56711-018e-11ea-afdd-e4e74986', upper('$nombres'), upper('$apellidos'), $dni, 1)";
  // echo json_encode("$query");
  //
  try {
    $result = mysqli_query($con, $query) or die ( "Algo ha ido mal en la consulta a la base de datos");
    echo json_encode("HECHO SIN ERRORES");
  } catch (\Exception $e) {
    echo json_encode("$e.");
  }
?>
