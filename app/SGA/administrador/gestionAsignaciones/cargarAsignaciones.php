<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json; charset=UTF-8');

  $response = [];
  $json_array = array();
  // $data = json_decode(file_get_contents("php://input"));

  $anio = $_GET['anio'];

  $con = mysqli_connect('127.0.0.1', 'root', '', 'SGA_SAN_NICOLAS') or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );
  // $username = mysqli_real_escape_string($con, $data->username);

  $tildes = $con->query("SET NAMES 'utf8'"); //Para que se muestren las tildes correctamente
  $query = "select ASIGNACION.id, concat(DOCENTE.nombres,' ',DOCENTE.apellidos) as docente, CURSO.nombre as curso, concat(GRADO.numeroGrado,'° ',GRADO.nivel) as grado, SECCION.seccion, SECCION.turno FROM sga_san_nicolas.asignacion INNER JOIN DOCENTE ON DOCENTE.id = ASIGNACION.idDocente INNER JOIN CURSO ON CURSO.id = ASIGNACION.idCurso INNER JOIN GRADO ON GRADO.id = CURSO.idGrado INNER JOIN SECCION ON SECCION.id = ASIGNACION.idSeccion where ASIGNACION.anio = '$anio' and ASIGNACION.estado = 1";
  //
  $result = mysqli_query($con, $query) or die ( "Algo ha ido mal en la consulta a la base de datos");
  // //
  if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)){
      // $row['status'] = 'loggedin';
      // $row['useruniqueid'] = md5(uniqid());
      // $_SESSION['useruniqueid'] = $row['useruniqueid'];
      $json_array[] = $row;
    }
    echo (json_encode($json_array));
  } else {
    $response['status'] = "Error";
    echo json_encode($response);
  }
  // echo json_encode("ENTRA $username $password");
?>
