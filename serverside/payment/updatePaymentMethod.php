<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

$conn = mysqli_connect("localhost", "root", "", "caterapp");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $cartId = $data->cart_id;
    $paymentMethod = $data->payment_method;

    $updatePaymentQuery = "CALL UpdatePaymentMethod($cartId, '$paymentMethod')";
    $result = mysqli_query($conn, $updatePaymentQuery);

    if ($result) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to update payment method']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}

mysqli_close($conn);
?>
