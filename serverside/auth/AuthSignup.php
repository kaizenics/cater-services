<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With');

$conn = mysqli_connect('localhost', 'root', '', 'caterapp');

$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData, true);

if (
    isset($DecodedData['firstName']) &&
    isset($DecodedData['lastName']) &&
    isset($DecodedData['address']) &&
    isset($DecodedData['mobileNum']) &&
    isset($DecodedData['email']) &&
    isset($DecodedData['password'])
) {
    $firstName = $DecodedData['firstName'];
    $lastName = $DecodedData['lastName'];
    $address = $DecodedData['address'];
    $mobileNum = $DecodedData['mobileNum'];
    $email = $DecodedData['email'];
    $password = password_hash($DecodedData['password'], PASSWORD_BCRYPT);

    $checkQuery = "SELECT * FROM accounts WHERE email = '$email'";
    $checkResult = mysqli_query($conn, $checkQuery);

    if (mysqli_num_rows($checkResult) > 0) {
        $mess = "Error: Email already exists";
    } else {
        $query = "INSERT INTO accounts (firstname, lastname, address, mobileNum, email, password) VALUES ('$firstName', '$lastName', '$address', '$mobileNum', '$email', '$password')";
        $return = mysqli_query($conn, $query);

        if ($return) {
            $mess = "Successfully Registered!";
        } else {
            $mess = 'Error';
        }
    }
} else if (
    isset($DecodedData['firstName']) &&
    isset($DecodedData['lastName']) &&
    isset($DecodedData['address']) &&
    isset($DecodedData['mobileNum'])
) {
    $firstName = $DecodedData['firstName'];
    $lastName = $DecodedData['lastName'];
    $address = $DecodedData['address'];
    $mobileNum = $DecodedData['mobileNum'];

    $query = "INSERT INTO accounts (firstname, lastname, address, mobileNum) VALUES ('$firstName', '$lastName', '$address', '$mobileNum')";
    $return = mysqli_query($conn, $query);

    if ($return) {
        $mess = "Successfully Registered!";
    } else {
        $mess = 'Error';
    }
} else {
    $mess = "Error: Missing required fields";
}

$response[] = array('Message' => $mess);
echo json_encode($response);
?>
