<?php
include 'dbconnection.php';

// Get the posted data
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$email = $_POST['email'];
$gender = $_POST['gender'];
$course = $_POST['course'];
$user_address = $_POST['user_address'];
$birthdate = $_POST['birthdate'];

try {
    $stmt = $connection->prepare("INSERT INTO students_table (first_name, last_name, email, gender, course, user_address, birthdate) VALUES (?, ?, ?, ?, ?, ?, ?)");
    
    $stmt->execute([$first_name, $last_name, $email, $gender, $course, $user_address, $birthdate]);

    echo json_encode(['res' => 'success']);
} catch (PDOException $e) {
    // Return error response
    echo json_encode(['res' => 'error', 'msg' => $e->getMessage()]);
}
?>