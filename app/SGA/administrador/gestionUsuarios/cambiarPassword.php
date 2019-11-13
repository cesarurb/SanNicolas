<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json; charset=UTF-8');

  $response = [];
  $json_array = array();
  // $data = json_decode(file_get_contents("php://input"));
  $id = $_GET['id'];
  $pass_nueva = $_GET['dni'];
  // $empresa = $_GET['empresa'];
  $con = mysqli_connect('127.0.0.1', 'root', '', 'SGA_SAN_NICOLAS') or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );

  $tildes = $con->query("SET NAMES 'utf8'"); //Para que se muestren las tildes correctamente

  $query = "update USUARIO set PassUsuario = '$pass_nueva' where id = '$id'";

  try {
    $result = mysqli_query($con, $query) or die ( "Algo ha ido mal en la consulta a la base de datos");
    echo json_encode("HECHO SIN ERRORES");
  } catch (\Exception $e) {
    echo json_encode("$e.");
  }


?>
