<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

    $conn = mysqli_connect("localhost", "root", "");
    $database = mysqli_select_db($conn, "caterapp");

    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $query = "SELECT * FROM items WHERE item_id = $id";
    } else {
        $query = "SELECT * FROM items";
    }

    $result = mysqli_query($conn, $query);
    if (mysqli_num_rows($result) > 0) {
        $items = array();

        while ($row = mysqli_fetch_assoc($result)) {
            $items[] = $row;
        }
        echo json_encode($items);
    } else {
        $response[] = array("Message" => "No items found");
        echo json_encode($response);
    }
?>
