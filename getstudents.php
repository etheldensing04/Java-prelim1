<?php
include 'dbconnection.php';


if (isset($_GET['id'])) {
    $student_id = $_GET['id'];

    try {
        $stmt = $connection->prepare("SELECT student_id, first_name, last_name, email, gender, course, user_address, birthdate FROM students_table WHERE student_id = ?");
        $stmt->execute([$student_id]);
        
        $student = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($student) {

            header('Content-Type: application/json');
            echo json_encode($student);
        } else {

            echo json_encode(['res' => 'error', 'msg' => 'No student found with that ID.']);
        }
    } catch (PDOException $e) {

        echo json_encode(['res' => 'error', 'msg' => $e->getMessage()]);
    }
} else {

    $query = "SELECT student_id, first_name, last_name, email, gender, course, user_address, 
              EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM birthdate) AS age 
              FROM css_tb";

    $stmt = $connection->prepare($query);
    $stmt->execute();
    $students = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($students);
}
?>