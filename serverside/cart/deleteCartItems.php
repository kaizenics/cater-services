<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

$conn = mysqli_connect("localhost", "root", "", "caterapp");

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $cart_id = $data['item_id'];

    $sql = "DELETE FROM cartitems WHERE cart_id = '$cart_id'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("Message" => "Item removed from cart"));
    } else {
        echo json_encode(array("Message" => "Error removing item from cart: " . $conn->error));
    }
} else {
    echo "Invalid request method";
}

$conn->close();
?>