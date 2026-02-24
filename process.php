<?php
// Database configuration
$servername = "localhost";
$username = "root"; // Change this to your database username
$password = ""; // Change this to your database password
$dbname = "maxykeys_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create table if it doesn't exist
$sql = "CREATE TABLE IF NOT EXISTS contacts (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    service VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) !== TRUE) {
    echo "Error creating table: " . $conn->error;
}

// Process form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get form data and sanitize
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $phone = mysqli_real_escape_string($conn, $_POST['phone']);
    $service = mysqli_real_escape_string($conn, $_POST['service']);
    $message = mysqli_real_escape_string($conn, $_POST['message']);
    
    // Insert into database
    $sql = "INSERT INTO contacts (name, email, phone, service, message) 
            VALUES ('$name', '$email', '$phone', '$service', '$message')";
    
    if ($conn->query($sql) === TRUE) {
        // Send email notification (optional)
        $to = "contact@maxykeys.com"; // Change to your email
        $subject = "New Contact Form Submission - Maxykeys";
        $email_message = "Name: $name\n";
        $email_message .= "Email: $email\n";
        $email_message .= "Phone: $phone\n";
        $email_message .= "Service: $service\n";
        $email_message .= "Message:\n$message\n";
        
        $headers = "From: $email";
        
        mail($to, $subject, $email_message, $headers);
        
        // Redirect with success message
        header("Location: contact.php?status=success");
        exit();
    } else {
        // Redirect with error message
        header("Location: contact.php?status=error");
        exit();
    }
}

$conn->close();
?>