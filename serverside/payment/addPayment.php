<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

try {
    $conn = new PDO("mysql:host=localhost;dbname=caterapp", "root", "");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $itemName = $_POST['p_itemName'];
    $price = $_POST['p_price'];
    $quantity = $_POST['p_quantity'];
    $cart_id = $_POST['p_cart_id']; 

    $stmt = $conn->prepare('CALL AddPaymentAndUpdateTotalBill(:cart_id, :itemName, :price, :quantity)');
    $stmt->execute([
        'cart_id' => $cart_id,
        'itemName' => $itemName,
        'price' => $price,
        'quantity' => $quantity
    ]);

    echo json_encode(['message' => 'Payment successful']);
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}

$conn = null;
?>
