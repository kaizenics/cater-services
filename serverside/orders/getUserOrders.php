<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

$conn = mysqli_connect("localhost", "root", "", "caterapp");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $account_id = $_GET['account_id'];

    $sql = "SELECT * FROM ordereditems WHERE account_id = '$account_id'";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $orders = array();
        while ($row = $result->fetch_assoc()) {
            $orderDetails = array(
                'invoiceNum' => $row['invoicenum'],
                'addDate' => $row['addDate'],
                'totalbill' => $row['totalbill'],
                'status' => $row['status'],
                'note' => $row['note'],
                'items' => array(
                    array(
                        'itemName' => $row['itemName'],
                        'quantity' => $row['qnty'],
                    )
                ),
            );
        
            $orders[] = $orderDetails;
        }
        

        echo json_encode($orders);
    } else {
        echo json_encode([]);
    }
} else {
    echo "Invalid request method";
}

$conn->close();
?>
