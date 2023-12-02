<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$conn = mysqli_connect("localhost", "root", "", "caterapp");

$input = json_decode(file_get_contents('php://input'), true);
$invoiceNum = $input['invoiceNum'];
$newStatus = $input['newStatus'];

$queryOrderedItems = "UPDATE ordereditems SET status = 'Item Delivered!' WHERE invoicenum = '$invoiceNum'";
$resultOrderedItems = mysqli_query($conn, $queryOrderedItems);

$queryOrders = "UPDATE orders SET status = 'Item Delivered!' WHERE invoicenum = '$invoiceNum'";
$resultOrders = mysqli_query($conn, $queryOrders);

if ($resultOrderedItems !== false && $resultOrders !== false) {
    echo json_encode(array('success' => true));
} else {
    echo json_encode(array('success' => false, 'error' => mysqli_error($conn)));
}

$conn->close();
?>
