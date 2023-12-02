<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$conn = mysqli_connect("localhost", "root", "", "caterapp");

$query = "SELECT COUNT(*) AS totalOrderedDishes FROM ordereditems";
$result = mysqli_query($conn, $query);

if ($result !== false) {
    $row = mysqli_fetch_assoc($result);
    $totalOrderedDishes = $row['totalOrderedDishes'];

    echo json_encode(array('success' => true, 'totalOrderedDishes' => $totalOrderedDishes));
} else {
    echo json_encode(array('success' => false, 'error' => mysqli_error($conn)));
}
?>
