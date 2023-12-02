<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With');

$conn = mysqli_connect('localhost', 'root', '', 'caterapp');

$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData, true);

if (!$DecodedData || !is_array($DecodedData) || empty($DecodedData['Email2']) || empty($DecodedData['Password2'])) {
    $response = array("Message" => "Invalid or missing input data", "UserId" => null);
    echo json_encode($response);
    exit;
}

$Email2 = mysqli_real_escape_string($conn, $DecodedData['Email2']);
$Password2 = mysqli_real_escape_string($conn, $DecodedData['Password2']);

$query = "SELECT * FROM admin WHERE email = '$Email2';";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    if ($row['password'] == $Password2) {
        $response = array("Message" => "Welcome!", "UserId" => $row['admin_id']);
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
