<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With');

$conn = mysqli_connect('localhost', 'root', '', 'caterapp');

$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData, true);

if (!$DecodedData || !is_array($DecodedData) || empty($DecodedData['Email']) || empty($DecodedData['Password'])) {
    $response = array("Message" => "Invalid or missing input data", "UserId" => null);
    echo json_encode($response);
    exit;
}

$Email = mysqli_real_escape_string($conn, $DecodedData['Email']);
$Password = mysqli_real_escape_string($conn, $DecodedData['Password']);

$query = "SELECT * FROM accounts WHERE email = '$Email';";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    if (password_verify($Password, $row['password'])) {
        $response = array("Message" => "Welcome!", "UserId" => $row['account_id'], "firstNameId" => $row['firstname'], "Role" => $row['role']);
        echo json_encode($response);
    } else {
        $response = array("Message" => "Incorrect Password", "UserId" => null);
        echo json_encode($response);
    }
} else {
    $response = array("Message" => "Incorrect Email", "UserId" => null);
    echo json_encode($response);
}
?>
