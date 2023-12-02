<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

$conn = mysqli_connect("localhost", "root", "", "caterapp");

$accountId = $_GET['account_id'];

$sql = "SELECT COUNT(*) AS cartItemCount FROM cartitems WHERE account_id = $accountId";

$result = mysqli_query($conn, $sql);

if ($result) {
    $row = mysqli_fetch_assoc($result);
    $cartItemCount = $row['cartItemCount'];
    echo json_encode(['cartItemCount' => $cartItemCount]);
} else {
    echo json_encode(['error' => 'Error querying the database']);
}

mysqli_close($conn);
?>