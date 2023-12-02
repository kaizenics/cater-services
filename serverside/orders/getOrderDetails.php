<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$conn = mysqli_connect("localhost", "root", "", "caterapp");

$cartId = isset($_GET['cart_id']) ? intval($_GET['cart_id']) : 0;

$query = "CALL GetOrderDetails($cartId)";
$result = mysqli_query($conn, $query);

if ($result !== false) {
    $row = mysqli_fetch_assoc($result);

    if (!empty($row)) {
        echo $row['orderDetails'];
    } else {
        echo json_encode(array('error' => 'No data found for the specified cart ID.'));
    }
} else {
    echo json_encode(array('error' => mysqli_error($conn)));
}

mysqli_close($conn);
?>

