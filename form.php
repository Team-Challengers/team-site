<?php
    define('DB_NAME','challengers');
    define('DB_USER','jaison');
    define('DB_PASSWORD','jaison4ever');
    define('DB_HOST','MySQL:3306');

    $link=mysql_connect(DB_HOST,DB_USER,DB_PASSWORD);

    if(!$link){
        die('could not connect:'.mysql_error());
    }

    $dbselected=mysql_select_db(DB_NAME,$link);
    if(!$dbselected){
        die('Can\'t use database'.DB_NAME.':'.mysql_error());
    }

    echo 'Connected successfully!';
    
    $value=$_POST['firstname'];
    $value2=$_POST['email'];
    $value3=$_POST['message'];

    $sql="INSERT INTO contact (Name,Email,Message) VALUES ('$value','$value2','$value3')";
    if(!mysql_query($sql)){
        die('Error: '.mysql_error());
    }

    mysql_close();
?>