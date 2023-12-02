<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

$conn = mysqli_connect("localhost", "root", "", "caterapp");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $account_id = $_GET['account_id'];

    $sql = "SELECT * FROM cartitems WHERE account_id = '$account_id'";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $cart_items = array();
        while($row = $result->fetch_assoc()) {
            $cart_items[] = $row;
        }
        echo json_encode($cart_items);
    } else {
        echo "No items found in the cart";
    }
} else {
    echo "Invalid request method";
}

$conn->close();
?>
