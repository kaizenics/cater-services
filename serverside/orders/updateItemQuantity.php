<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$conn = mysqli_connect("localhost", "root", "", "caterapp");

$input = json_decode(file_get_contents('php://input'), true);
$cartId = $input['cart_id'];

$queryDeduct = "UPDATE items 
                INNER JOIN cartitems ON items.item_id = cartitems.item_id
                SET items.qty = items.qty - cartitems.quantity
                WHERE cartitems.cart_id = $cartId";

$resultDeduct = mysqli_query($conn, $queryDeduct);

if ($resultDeduct) {
    $response['deduction_success'] = true;
} else {
    $response['deduction_success'] = false;
    $response['deduction_error'] = mysqli_error($conn);
}

echo json_encode($response);
mysqli_close($conn);
?>
