<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

$conn = mysqli_connect("localhost", "root", "");
$database = mysqli_select_db($conn, "caterapp");

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $query = "DELETE FROM items WHERE item_id = $id";

    if (mysqli_query($conn, $query)) {
        $response = array("Message" => "Item Deleted!");
        echo json_encode($response);
    } else {
        $response = array("Message" => "Failed to Delete an Item, Please try again!");
        echo json_encode($response);
    }
} else {
    $response = array("Message" => "No Data");
    echo json_encode($response);
}
?>
