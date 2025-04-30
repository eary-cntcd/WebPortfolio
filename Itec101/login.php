<?php
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $student_id = $_POST['student_id'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT password_hash FROM students WHERE student_id = ?");
    $stmt->bind_param("s", $student_id);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($password_hash);
        $stmt->fetch();

        if (password_verify($password, $password_hash)) {
            echo "Login successful! Welcome, Student " . htmlspecialchars($student_id);
        } else {
            echo "Invalid password!";
        }
    } else {
        echo "Student ID not found!";
    }

    $stmt->close();
    $conn->close();
}
?>
