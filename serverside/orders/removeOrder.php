<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

$conn = mysqli_connect("localhost", "root", "", "caterapp");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $invoiceNum = $data['invoiceNum'];
    
    $deleteOrders = "DELETE FROM orders WHERE invoicenum = '$invoiceNum'";
    $deleteOrderedItems = "DELETE FROM ordereditems WHERE invoicenum = '$invoiceNum'";

    if ($conn->query($deleteOrders) && $conn->query($deleteOrderedItems)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to cancel order']);
    }
} else {
    echo "Invalid request method";
}

$conn->close();
?>
