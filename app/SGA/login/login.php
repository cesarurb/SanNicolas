<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  if(!isset($_POST)) die();

  session_start();

  $response = [];
  $json_array = array();
  $username = $_POST['username'];
  $password = $_POST['password'];

  $con = mysqli_connect('127.0.0.1', 'root', '', 'siad') or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );
  $tildes = $con->query("SET NAMES 'utf8'"); //Para que se muestren las tildes correctamente
  $query = "select * from usuarios where NombreUsuario = '$username' and PassUsuario = '$password'";
  // $query = "select * from usuario";
  //
  $result = mysqli_query($con, $query) or die ( "Algo ha ido mal en la consulta a la base de datos");
  // //
  if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)){
      $row['status'] = 'loggedin';
      $row['useruniqueid'] = md5(uniqid());
      $_SESSION['useruniqueid'] = $row['useruniqueid'];
      $json_array[] = $row;
    }
    echo (json_encode($json_array));
  } else {
    $response['status'] = "Error";
    echo json_encode($response);
  }
  // echo json_encode("ENTRA $username $password");
?>
