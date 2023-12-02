<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$conn = mysqli_connect("localhost", "root", "", "caterapp");

$query = "SELECT SUM(totalRevenue) as totalRevenue FROM orders";

$result = mysqli_query($conn, $query);

if ($result !== false) {
    $row = mysqli_fetch_assoc($result);
    $totalRevenue = $row['totalRevenue'];

    echo json_encode(array('success' => true, 'totalRevenue' => $totalRevenue));
} else {
    echo json_encode(array('success' => false, 'error' => mysqli_error($conn)));
}

$conn->close();
?>
