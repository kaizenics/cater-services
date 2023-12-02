<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

$conn = mysqli_connect("localhost", "root", "", "caterapp");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $invoiceNum = json_decode(file_get_contents('php://input'), true)['invoiceNum'];

    $sql = "SELECT * FROM ordereditems WHERE invoicenum = '$invoiceNum'";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $orders = array();
        $totalRevenue = 0; // Initialize total revenue

        while ($row = $result->fetch_assoc()) {
            $orderDetails = array(
                'invoiceNum' => $row['invoicenum'],
                'addDate' => $row['addDate'],
                'totalbill' => $row['totalbill'],
                'status' => $row['status'],
                'items' => array(
                    array(
                        'itemName' => $row['itemName'],
                        'quantity' => $row['qnty'],
                    )
                ),
            );

            $orders[] = $orderDetails;

            // Deduct quantities and update status
            deductQuantities($conn, $row['itemName'], $row['qnty'], $invoiceNum);
            $totalRevenue += $row['totalbill'];
        }

        // Update total revenue in the orders table
        updateTotalRevenue($conn, $invoiceNum, $totalRevenue);

        echo json_encode($orders);
    } else {
        echo json_encode([]);
    }
} else {
    echo "Invalid request method";
}

$conn->close();

function deductQuantities($conn, $itemName, $quantity, $invoiceNum) {
    // Get current quantity from items table
    $getItemQtyQuery = "SELECT qty FROM items WHERE itemName = '$itemName'";
    $getItemQtyResult = $conn->query($getItemQtyQuery);

    if ($getItemQtyResult->num_rows > 0) {
        $row = $getItemQtyResult->fetch_assoc();
        $currentQty = $row['qty'];

        // Deduct quantity
        $newQty = $currentQty - $quantity;

        // Update items table with new quantity
        $updateQtyQuery = "UPDATE items SET qty = $newQty WHERE itemName = '$itemName'";
        $conn->query($updateQtyQuery);

        // Update status in ordereditems table
        $updateStatusQuery = "UPDATE ordereditems SET status = 'Item Delivered!' WHERE itemName = '$itemName' AND invoicenum = '$invoiceNum'";
        $conn->query($updateStatusQuery);

        // Update status in orders table
        $updateOrderStatusQuery = "UPDATE orders SET status = 'Item Delivered!' WHERE invoicenum = '$invoiceNum'";
        $conn->query($updateOrderStatusQuery);
    }
}
function updateTotalRevenue($conn, $invoiceNum, $totalRevenue) {
    // Update total revenue in the orders table
    $updateTotalRevenueQuery = "UPDATE orders SET totalRevenue = $totalRevenue WHERE invoicenum = '$invoiceNum'";
    $conn->query($updateTotalRevenueQuery);
}
?>
