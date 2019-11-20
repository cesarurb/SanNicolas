<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json; charset=UTF-8');

  $response = [];
  $json_array = array();
  // $data = json_decode(file_get_contents("php://input"));

  $anio = $_GET['anio'];
  $grado = $_GET['idGrado'];

  $con = mysqli_connect('127.0.0.1', 'root', '', 'SGA_SAN_NICOLAS') or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );
  // $username = mysqli_real_escape_string($con, $data->username);

  $tildes = $con->query("SET NAMES 'utf8'"); //Para que se muestren las tildes correctamente

  $query = "select matricula.id, concat(alumno.nombres,' ',alumno.apellidos) as alumno, matricula.fechaMatricula from matricula inner join alumno on alumno.id = matricula.idAlumno where matricula.anio = '$anio' and matricula.idGrado = '$grado' and matricula.asignado = 0 and matricula.estado = 1";
  $result = mysqli_query($con, $query) or die ( "Algo ha ido mal en la consulta a la base de datos");
  if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)){
      $row['seccion'] = 'NO DEFINIDO';
      $row['turno'] = 'NO DEFINIDO';
      $json_array[] = $row;
    }
    echo (json_encode($json_array));
  } else {
    $response['status'] = "Error";
    echo json_encode($response);
  }

  // echo json_encode("ENTRA $username $password");
?>
