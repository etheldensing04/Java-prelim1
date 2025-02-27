<?php
include 'dbconnection.php';

if (isset($_POST['student_id'])) {
    $student_id = $_POST['student_id'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $gender = $_POST['gender'];
    $course = $_POST['course'];
    $user_address = $_POST['user_address'];
    $birthdate = $_POST['birthdate'];

    try {
        $stmt = $connection->prepare("UPDATE students_table SET first_name = ?, last_name = ?, email = ?, gender = ?, course = ?, user_address = ?, birthdate = ? WHERE student_id = ?");
        $stmt->execute([$first_name, $last_name, $email, $gender, $course, $user_address, $birthdate, $student_id]);
        echo json_encode(['res' => 'success']);
    } catch (PDOException $e) {
        echo json_encode(['res' => 'error', 'msg' => $e->getMessage()]);
    }
} else {
    echo json_encode(['res' => 'error', 'msg' => 'No student ID provided.']);
}
