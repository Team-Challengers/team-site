<?php

$username="jaison";
$password="jaison4ever";
$database="challengers";
$firstname=$_POST['firstname'];
$email=$_POST['email'];
$message=$_POST['message'];
mysql_connect(serverip,$username,$password);
@mysql_select_db($database) or die( "Unable to connect to Database");
$query = "INSERT INTO input  
VALUES('$firstname','$surname','$age')";mysql_query($query);mysql_close();

?>