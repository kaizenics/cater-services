<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

try {
    $conn = new PDO("mysql:host=localhost;dbname=caterapp", "root", "");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $cart_id = $_POST['p_cart_id'];
    $account_id = $_POST['p_account_id'];
    $payment_method = $_POST['p_payment_method'];
    $totalbill = $_POST['p_totalbill'];

    $stmt = $conn->prepare('CALL ProcessOrder(:cart_id, :account_id, :payment_method, :totalbill)');
    $stmt->execute([
        'cart_id' => $cart_id,
        'account_id' => $account_id,
        'payment_method' => $payment_method,
        'totalbill' => $totalbill
    ]);

    echo json_encode(['message' => 'Order processed successfully']);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error processing order: ' . $e->getMessage()]);
}

$conn = null;
?>

