<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

$conn = mysqli_connect("localhost", "root", "", "caterapp");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $account_id = $data->account_id;
    $imageUrl = $data->imageUrl;
    $itemName = $data->itemName;
    $description = $data->description;
    $price = $data->price;
    $quantity = $data->quantity;

    // Call the stored function
    $query = "SELECT AddToCart('$account_id', '$imageUrl', '$itemName', '$description', '$price', '$quantity') AS Message";
    $result = mysqli_query($conn, $query);

    if ($result) {
        $row = mysqli_fetch_assoc($result);
        echo json_encode(array("Message" => $row['Message']));
    } else {
        echo json_encode(array("Message" => "Error calling stored function: " . mysqli_error($conn)));
    }
} else {
    echo json_encode(array("Message" => "Invalid request method"));
}
?>

