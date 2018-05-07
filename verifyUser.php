<?php
session_start();

include 'connect.php';
$connect = getDBConnection();

//Checking credentials in database

//Raw user input in SQL query = DANGER vvvvv
$sql = "SELECT * FROM users
        WHERE username = :username
            AND password = :password"; //used prepared statements

$stmt = $connect->prepare($sql);

//password shouldn't be sent to database in plain text
//apply sha1 encryption to the password for security
$data = array(":username" => $_POST['username'],
              ":password" => sha1($_POST['password']));

$stmt->execute($data);

$user = $stmt->fetch(PDO::FETCH_ASSOC); //returns fetch as associative array (instead of index array)

//redirecting user to quiz if credentials are valid
if(isset($user['username'])){
    $_SESSION['username'] = $user['username'];
    header('Location: index.php');
} else {
    echo "The values you entered were incorrect.
          <a href = 'login.php'>Retry</a>"; 
}
?>