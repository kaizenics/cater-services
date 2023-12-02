<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

$conn = mysqli_connect("localhost", "root", "");
$database = mysqli_select_db($conn, "caterapp");

$itemName = $_POST['itemName'];
$price = $_POST['price'];
$description = $_POST['description'];
$qty = $_POST['qty'];

$targetDirectory = "uploads/";
$targetFile = $targetDirectory . basename($_FILES["image"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["image"]["tmp_name"]);
    if($check !== false) {
        $uploadOk = 1;
    } else { 
        $uploadOk = 0;
    }
}

if (file_exists($targetFile)) {
    $uploadOk = 0;
}

if ($_FILES["image"]["size"] > 10485760) {
    $uploadOk = 0;
}

if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "webp") {
    $uploadOk = 0;
}

if ($uploadOk == 0) {
    $response[] = array("Message" => "Failed to upload image");
    echo json_encode($response);
} else {
    if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
        $imageUrl = $targetFile;

        $query = "INSERT INTO items (itemName, price, description, qty, imageUrl) 
        VALUES ('$itemName', '$price', '$description', '$qty', '$imageUrl')";

        if (mysqli_query($conn, $query)) {
            $response[] = array("Message" => "Item Added!");
            echo json_encode($response);
        } else {
            $response[] = array("Message" => "Failed to Add Item, Please try again!");
            echo json_encode($response);
        }
    } else {
        $response[] = array("Message" => "Failed to upload image");
        echo json_encode($response);
    }
}
?>
