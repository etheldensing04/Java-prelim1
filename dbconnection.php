<?php
$servername = "localhost"; 
$username = "root";         
$password = "";            
$dbname = "students_db";    

try {
    $connection = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $th) {
    die(json_encode(['error' => "Database Error: " . $th->getMessage()]));
}
