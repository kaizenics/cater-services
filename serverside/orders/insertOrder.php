<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

$conn = mysqli_connect("localhost", "root", "", "caterapp");

$input = json_decode(file_get_contents('php://input'), true);
$cartId = $input['cart_id'];
$specialNote = $input['note']; 

// Stored procedure to process order
$query = "CALL ProcessOrder($cartId, '$specialNote')";

$result = mysqli_query($conn, $query);

if ($result) {
    $response['success'] = true;
} else {
    $response['success'] = false;
    $response['error'] = mysqli_error($conn);
}

echo json_encode($response);
mysqli_close($conn);
?>
