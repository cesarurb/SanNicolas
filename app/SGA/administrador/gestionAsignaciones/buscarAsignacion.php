<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json; charset=UTF-8');

  $response = [];
  $json_array = array();

  // $data = json_decode(file_get_contents("php://input"));
  $docente = $_GET['docente'];
  $curso = $_GET['curso'];
  $anio = $_GET['anio'];
  $turno = $_GET['turno'];

  $con = mysqli_connect('127.0.0.1', 'root', '', 'SGA_SAN_NICOLAS') or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );
  // $username = mysqli_real_escape_string($con, $data->username);

  $tildes = $con->query("SET NAMES 'utf8'"); //Para que se muestren las tildes correctamente
  $query = "select * from asignacion where idDocente = '$docente' AND idCurso = '$curso' AND anio = '$anio' AND turno = '$turno' AND Estado = 1";
  //
  $result = mysqli_query($con, $query) or die ( "Algo ha ido mal en la consulta a la base de datos");
  // //
  if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)){
      $json_array = $row;
    }
    // echo (json_encode($query));
    echo (json_encode($json_array));
  } else {
    $response['status'] = "Error";
    echo json_encode($response);
  }
?>
