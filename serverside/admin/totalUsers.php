<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$conn = mysqli_connect("localhost", "root", "", "caterapp");

$query = "SELECT COUNT(*) AS totalUsers FROM accounts";
$result = mysqli_query($conn, $query);

if ($result !== false) {
    $row = mysqli_fetch_assoc($result);
    $totalUsers = $row['totalUsers'];

    echo json_encode(array('success' => true, 'totalUsers' => $totalUsers));
} else {
    echo json_encode(array('success' => false, 'error' => mysqli_error($conn)));
}
?>
