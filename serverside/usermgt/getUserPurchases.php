<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$conn = mysqli_connect("localhost", "root", "", "caterapp");

$query = "SELECT o.invoiceNum, o.addDate, a.firstname, a.lastname, a.address, p.payment_method, p.totalbill, ci.itemName, ci.quantity, o.note, o.status
          FROM orders o
          JOIN accounts a ON o.account_id = a.account_id
          JOIN payment p ON o.payment_id = p.payment_id
          JOIN cartitems ci ON o.cart_id = ci.cart_id;";

$result = mysqli_query($conn, $query);

if ($result !== false) {
    $userPurchases = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $purchase = array(
            'invoiceNum' => $row['invoiceNum'],
            'addDate' => $row['addDate'],
            'firstname' => $row['firstname'],
            'lastname' => $row['lastname'],
            'address' => $row['address'],
            'payment_method' => $row['payment_method'],
            'totalbill' => $row['totalbill'],
            'orderedItem' => $row['quantity'] . ' x ' . $row['itemName'],
            'note' => $row['note'],  
            'status' => $row['status']
        );

        $userPurchases[] = $purchase;
    }

    echo json_encode(array('success' => true, 'purchases' => $userPurchases));
} else {
    echo json_encode(array('success' => false, 'error' => mysqli_error($conn)));
}
?>

