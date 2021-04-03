<?
    $con=mysqli_connect('MySQL:3306','jaison','jaison4ever');
    if(!con){
        echo 'Coudlnot connect';
    }
    if(!mysqli_select_db($con,'challengers')){
        echo 'Database isnt selected';
    }
    $value=$_POST['firstname'];
    $value2=$_POST['email'];
    $value3=$_POST['message'];

    $sql= "INSERT INTO contact (Name,Email,Message) VALUES ('$value','$value2','$value3')";

    if(!mysqli_query($con,$sql)){
        echo 'Not inserted';
    }
    else{
        echo 'Inserted';
    }
    header("refresh:2; url=contact.html");

?>


