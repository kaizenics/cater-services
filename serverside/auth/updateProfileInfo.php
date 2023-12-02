<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

$conn = mysqli_connect("localhost", "root", "", "caterapp");

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    
    $updatedData = json_decode(file_get_contents('php://input'), true);
    $accountId = $updatedData['account_id'];
    $firstName = $updatedData['firstName'];
    $lastName = $updatedData['lastName'];
    $mobileNum = $updatedData['mobileNum'];
    $address = $updatedData['address'];

    $updateQuery = "UPDATE accounts SET firstName='$firstName', lastName='$lastName', mobileNum='$mobileNum', address='$address' WHERE account_id='$accountId'";
    
    if (mysqli_query($conn, $updateQuery)) {
        $response = array("success" => true, "message" => "User details updated successfully");
    } else {
        $response = array("success" => false, "error" => "Failed to update user details");
    }

    echo json_encode($response);
    exit;
}

$conn->close();
?>

