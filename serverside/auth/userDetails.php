<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With');

$conn = mysqli_connect('localhost', 'root', '', 'caterapp');

$account_id = mysqli_real_escape_string($conn, $_GET['account_id']);

if (!$account_id) {
    $response = array("success" => false, "message" => "Invalid or missing account_id");
    echo json_encode($response);
    exit;
}

$query = "CALL GetUserDetails($account_id)";
$result = mysqli_query($conn, $query);

if ($result) {
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $userDetails = array(
            "account_id" => $row['account_id'],
            "firstName" => $row['firstName'],
            "lastName" => $row['lastName'],
            "mobileNum" => $row['mobileNum'],
            "address" => $row['address'],
        );
        $response = array("success" => true, "user" => $userDetails);
        echo json_encode($response);
    } else {
        $response = array("success" => false, "message" => "User not found");
        echo json_encode($response);
    }
} else {
    $response = array("success" => false, "message" => "Error fetching user details");
    echo json_encode($response);
}
?>

