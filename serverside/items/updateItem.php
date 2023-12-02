<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

$conn = mysqli_connect("localhost", "root", "");
$database = mysqli_select_db($conn, "caterapp");

$encodedData = file_get_contents('php://input');
$decodedData = json_decode($encodedData, true);

$id = $_GET['id'];
$itemName = isset($decodedData['itemName']) ? $decodedData['itemName'] : '';
$price = isset($decodedData['price']) ? $decodedData['price'] : '';
$description = isset($decodedData['description']) ? $decodedData['description'] : '';
$qty = isset($decodedData['qty']) ? $decodedData['qty'] : '';

// Update the item directly
$updateQuery = "UPDATE items SET itemName = '$itemName', price = '$price', description = '$description', qty = '$qty' WHERE item_id = '$id'";
if (mysqli_query($conn, $updateQuery)) {
    // Fetch the updated data
    $updatedItemData = mysqli_fetch_assoc(mysqli_query($conn, "SELECT * FROM items WHERE item_id = '$id'"));

    $response[] = array("Message" => "Item Updated!", "Data" => $updatedItemData);
    echo json_encode($response);
} else {
    $response[] = array("Message" => "Failed to Update this Item, Please try again!");
    echo json_encode($response);
}
?>

