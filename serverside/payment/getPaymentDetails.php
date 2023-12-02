<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

try {
    $conn = new PDO("mysql:host=localhost;dbname=caterapp", "root", "");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $cart_id = isset($_GET['cart_id']) ? $_GET['cart_id'] : null;

    if ($cart_id) {
        $stmt = $conn->prepare('CALL GetPaymentDetails(:cart_id)');
        $stmt->bindParam(':cart_id', $cart_id, PDO::PARAM_INT);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            echo json_encode(['totalbill' => $result['totalbill']]);
        } else {
            echo json_encode(['error' => 'No payment details found for the provided cart_id']);
        }
    } else {
        echo json_encode(['error' => 'Missing cart_id parameter']);
    }
} catch(PDOException $e) {
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
} finally {
    $conn = null;
}
?>

