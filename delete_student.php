<?php
include 'dbconnection.php';

if (isset($_POST['id'])) {
    $student_id = $_POST['id'];

    try {
        $stmt = $connection->prepare("DELETE FROM students_table WHERE student_id = ?");
        $stmt->execute([$student_id]);
        if ($stmt->rowCount() > 0) {
            echo json_encode(['res' => 'success']);
        } else {
            echo json_encode(['res' => 'error', 'msg' => 'No student found with that ID.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['res' => 'error', 'msg' => $e->getMessage()]);
    }
} else {
    echo json_encode(['res' => 'error', 'msg' => 'No student ID provided.']);
}
?>