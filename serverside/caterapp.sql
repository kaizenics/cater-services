-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 12, 2023 at 08:03 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `caterapp`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`` PROCEDURE `AddPaymentAndUpdateTotalBill` (IN `p_cart_id` INT, IN `p_itemName` VARCHAR(255), IN `p_price` DECIMAL(10,2), IN `p_quantity` INT)   BEGIN
    DECLARE total_price DECIMAL(10, 2);
    
    DECLARE payment_exists INT DEFAULT 0;
    SELECT COUNT(*) INTO payment_exists
    FROM payment
    WHERE cart_id = p_cart_id;

    IF payment_exists > 0 THEN
 
        UPDATE payment
        SET totalbill = totalbill + (p_price * p_quantity)
        WHERE cart_id = p_cart_id;
    ELSE
 
        INSERT INTO payment (cart_id, payment_method, totalbill)
        VALUES (p_cart_id, 'your_payment_method_here', (p_price * p_quantity));
    END IF;

    SELECT SUM(price * quantity) INTO total_price
    FROM cartitems
    WHERE cart_id = p_cart_id;
    
    UPDATE payment
    SET totalbill = total_price
    WHERE cart_id = p_cart_id;
END$$

CREATE DEFINER=`` PROCEDURE `GetOrderDetails` (IN `cartId` INT)   BEGIN
    DECLARE invoiceNum INT;
    DECLARE addDate DATE;
    DECLARE firstname VARCHAR(255);
    DECLARE lastname VARCHAR(255);
    DECLARE address VARCHAR(255);
    DECLARE payment_method VARCHAR(255);
    DECLARE totalbill DECIMAL(10, 2);
    DECLARE itemName VARCHAR(255);
    DECLARE quantity INT;
    DECLARE note TEXT;  -- Add this line for the special note

    SELECT o.invoiceNum, o.addDate, a.firstname, a.lastname, a.address, p.payment_method, p.totalbill, ci.itemName, ci.quantity, o.note  -- Include the note field
    INTO invoiceNum, addDate, firstname, lastname, address, payment_method, totalbill, itemName, quantity, note
    FROM orders o
    JOIN accounts a ON o.account_id = a.account_id
    JOIN payment p ON o.payment_id = p.payment_id
    JOIN cartitems ci ON o.cart_id = ci.cart_id
    WHERE o.cart_id = cartId;

    IF invoiceNum IS NOT NULL THEN
        SELECT JSON_OBJECT(
            'invoiceNum', invoiceNum,
            'addDate', addDate,
            'firstname', firstname,
            'lastname', lastname,
            'address', address,
            'payment_method', payment_method,
            'totalbill', totalbill,
            'items', JSON_ARRAY(
                JSON_OBJECT(
                    'itemName', itemName,
                    'quantity', quantity
                )
            ),
            'note', note  -- Include the note field in the JSON response
        ) AS orderDetails;
    ELSE
        SELECT JSON_OBJECT('error', 'Invalid cart ID') AS orderDetails;
    END IF;
END$$

CREATE DEFINER=`` PROCEDURE `GetPaymentDetails` (IN `p_cart_id` INT)   BEGIN
    SELECT totalbill FROM payment WHERE cart_id = p_cart_id;
END$$

CREATE DEFINER=`` PROCEDURE `GetUserDetails` (IN `p_account_id` INT)   BEGIN
    SELECT
        account_id,
        firstname AS firstName,
        lastname AS lastName,
        mobilenum AS mobileNum,
        address
    FROM accounts
    WHERE account_id = p_account_id;
END$$

CREATE DEFINER=`` PROCEDURE `ProcessOrder` (IN `cartId` INT, IN `specialNote` TEXT)   BEGIN
    DECLARE invoiceNum INT;
    DECLARE addDate DATE;

    -- Generate random invoice number
    SET invoiceNum = FLOOR(100000 + RAND() * 900000);
    SET addDate = CURDATE();

    -- Stored procedure to deduct quantity and insert into orders
    INSERT INTO orders (account_id, payment_id, cart_id, invoicenum, addDate, note, status)
    SELECT ci.account_id, p.payment_id, ci.cart_id, invoiceNum, addDate, 
           CASE WHEN specialNote = '' THEN 'N/A' ELSE specialNote END, 'Not yet Delivered'
    FROM cartitems ci
    JOIN payment p ON p.cart_id = ci.cart_id
    WHERE ci.cart_id = cartId
    AND ci.cart_id NOT IN (SELECT DISTINCT cart_id FROM orders);

    -- Insert into ordereditems
    INSERT INTO ordereditems (account_id, payment_id, cart_id, firstname, lastname, address, invoicenum, addDate, itemName, payment_method, qnty, totalbill, note, status)
    SELECT
        o.account_id,
        p.payment_id,
        o.cart_id,
        a.firstname,
        a.lastname,
        a.address,
        o.invoiceNum,
        o.addDate,
        ci.itemName,
        p.payment_method,
        ci.quantity, 
        p.totalbill,
        CASE WHEN specialNote = '' THEN 'N/A' ELSE specialNote END,
        'Not yet Delivered'
    FROM
        orders o
    JOIN cartitems ci ON o.cart_id = ci.cart_id
    JOIN payment p ON p.cart_id = ci.cart_id
    JOIN accounts a ON a.account_id = o.account_id
    WHERE
        o.cart_id = cartId
        AND o.cart_id NOT IN (SELECT DISTINCT cart_id FROM ordereditems);
END$$

CREATE DEFINER=`` PROCEDURE `UpdateItem` (IN `p_id` INT, IN `p_itemName` VARCHAR(255), IN `p_price` DECIMAL(10,2), IN `p_description` TEXT, IN `p_qty` INT)   BEGIN
    UPDATE items
    SET
        itemName = p_itemName,
        price = p_price,
        description = p_description,
        qty = p_qty
    WHERE item_id = p_id;
END$$

CREATE DEFINER=`` PROCEDURE `UpdatePaymentMethod` (IN `p_cartId` INT, IN `p_paymentMethod` VARCHAR(255))   BEGIN
    DECLARE paymentRecordCount INT;

    -- Check if the payment record already exists for the cart
    SELECT COUNT(*) INTO paymentRecordCount FROM payment WHERE cart_id = p_cartId;

    IF paymentRecordCount > 0 THEN
        -- If the payment record exists, update the payment method
        UPDATE payment SET payment_method = p_paymentMethod WHERE cart_id = p_cartId;
    ELSE
        -- If the payment record does not exist, insert a new record
        INSERT INTO payment (cart_id, payment_method) VALUES (p_cartId, p_paymentMethod);
    END IF;

    SELECT 'success' AS result;

END$$

CREATE DEFINER=`` PROCEDURE `UpdateTotalBill` (IN `cartID` INT)   BEGIN
    DECLARE total DECIMAL(10,2);
    
    SELECT SUM(price * quantity) INTO total
    FROM cartitems
    WHERE cart_id = cartID;
    
    UPDATE payment
    SET totalbill = total
    WHERE cart_id = cartID;
END$$

--
-- Functions
--
CREATE DEFINER=`` FUNCTION `AddToCart` (`p_account_id` INT, `p_imageUrl` VARCHAR(255), `p_itemName` VARCHAR(255), `p_description` TEXT, `p_price` DECIMAL(10,2), `p_quantity` INT) RETURNS VARCHAR(255) CHARSET utf8 COLLATE utf8_general_ci  BEGIN
    DECLARE message VARCHAR(255);

    INSERT INTO cartitems (account_id, imageUrl, itemName, description, price, quantity)
    VALUES (p_account_id, p_imageUrl, p_itemName, p_description, p_price, p_quantity);

    IF ROW_COUNT() > 0 THEN
        SET message = 'Item added to cart';
    ELSE
        SET message = 'Error adding item to cart';
    END IF;

    RETURN message;
END$$

CREATE DEFINER=`` FUNCTION `deductQuantities` (`itemName` VARCHAR(255), `quantity` INT, `invoiceNum` INT) RETURNS VARCHAR(50) CHARSET utf8 COLLATE utf8_general_ci  BEGIN
  DECLARE currentQty INT;
  DECLARE newQty INT;

  SELECT qty INTO currentQty FROM items WHERE itemName = itemName;

  IF currentQty IS NULL THEN
    RETURN 'Item not found';
  END IF;

  SET newQty = currentQty - quantity;

  UPDATE items SET qty = newQty WHERE itemName = itemName;

  UPDATE ordereditems SET status = 'Item Delivered!' WHERE itemName = itemName AND invoicenum = invoiceNum;

  UPDATE orders SET status = 'Item Delivered!' WHERE invoicenum = invoiceNum;

  RETURN 'Success';

END$$

CREATE DEFINER=`` FUNCTION `updateTotalRevenue` (`invoiceNum` INT, `totalRevenue` DECIMAL(10,2)) RETURNS VARCHAR(50) CHARSET utf8 COLLATE utf8_general_ci  BEGIN

  UPDATE orders SET totalRevenue = totalRevenue WHERE invoicenum = invoiceNum;

  RETURN 'Success';

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `account_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `mobilenum` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`account_id`, `email`, `password`, `firstname`, `lastname`, `address`, `mobilenum`, `role`) VALUES
(56, 'niko', '$2y$10$yNksNlpPMlukp4GqJlIo5eZjXWqWgbtym6W6VmcWUfAIYHUf2oVVi', 'Niko', 'Soriano', 'Panabo', '09307154994', ''),
(57, 'crisjohn@gmail.com', '$2y$10$.BO5PScsWfbvmNYOAsRpauM8zMu5.YM3Ww9FpE/k.GNuHc5//oG/K', 'Cris Jhon', 'Cantos', 'Buhangin, Davao City', '09123456789', ''),
(58, 'allanamarie19@gmail.com', '$2y$10$MTJsT0BNlUQZMpeD0JuZieXQlnNtOGh55HpVMjGagUGZFRYeOTx6u', 'Allana Marie ', 'Laguna', 'Blk. 19, Lot 27, Rosalina 3, Baliok, Davao City', '09434908756', ''),
(59, 'nicosejohnsoriano@gmail.com', '$2y$10$vdwoIP1s/Axdtjt9fycghOC2QxlKmn/dCHz40JPbiFqCIL5FoGShq', 'Nicose John', 'Soriano', '1946 Quezon Street, Purok Chico, Barangay Sto. Nino, Panabo City', '09307154994', ''),
(60, 'james.piastro@gmail.com', '$2y$10$etTSgMpq99KcmjaQFYA9FONzRhTbkY/VteDict9oFTEzsgQK453cK', 'James Anthony', 'Piastro', 'Jerome, R.Castillo, Davao City', '0924234234', ''),
(61, 'zoro@gmail.com', '$2y$10$0EpeJMHBbWOspLA9Fqlp..5f9YlpaYms5IehaFzixkSyJfmHhS1qy', 'Roronoa', 'Zoro', 'One Piece World', '0923324345', ''),
(62, 'chopper@gmail.com', '$2y$10$l.OoQEV9rHc9JeA6rKlcj.goNFX7miCvQnhKW.LHFpglk63TP8Hre', 'Tony Tony', 'Chopper', 'One Piece World', '0912312445', ''),
(63, 'jansenken.tinio@tv.com', '$2y$10$dE5NLvumexWbFsWqEO36S.tQNXQoRwyEO4vZB.w5d0sYe7/eNuPMa', 'Ken', 'Tinio', 'Pampanga ', '093128371', ''),
(64, 'nico.robin@email.com', '$2y$10$3oyN0ZW.ioCDMQR3Hmi9A.Wzr1YpbSpY6j8x..f99hUeugZXWx2TO', 'Nico', 'Robin', 'East Blue', '09123456789', ''),
(65, 'soul.brook@gmail.com', '$2y$10$Ev5esEGWE8oMOqkcuX6ptOTLOB1UxYQZVVOfXljDpR14FYDFyMCzq', 'Soul', 'Brook', 'West Blue', '09123456789', ''),
(66, 'kozuki.oden@gmail.com', '$2y$10$6LwofWOS53gcDSrWRaMIYu7tI36.uRHtHt3gZh5bbXSJXR8C1bRcC', 'Oden', 'Kozuki', 'Wano Kuni, One Piece World', '093467583423', ''),
(67, 'jhon.cantos@hcdc.edu.ph', '$2y$10$MagUWYaBNGinlMrkyVXBEevuRU8lLI7g7Z8qdJLF.tL8DzSUyQvAa', 'Cris Jhon ', 'Cantos', 'Davao City', '87798786', '');

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `email`, `password`, `role`) VALUES
(1, 'ategangs', '2023', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `cartitems`
--

CREATE TABLE `cartitems` (
  `cart_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `imageUrl` varchar(555) NOT NULL,
  `itemName` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` int(255) NOT NULL,
  `quantity` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `cartitems`
--

INSERT INTO `cartitems` (`cart_id`, `account_id`, `imageUrl`, `itemName`, `description`, `price`, `quantity`) VALUES
(118, 58, 'http://localhost/serverside/items/uploads/image-dish.png', 'Sisig', 'Filipino food style dish sisig', 89, 5),
(119, 58, 'http://localhost/serverside/items/uploads/chicharon.png', 'Chicharon', 'Deep-fried pork belly.', 80, 1),
(120, 56, 'http://localhost/serverside/items/uploads/lumpia.png', 'Lumpia', 'Served as hot and new lumpia', 50, 3),
(124, 60, 'http://localhost/serverside/items/uploads/isaw.png', 'Isaw', 'Grilled chicken or pig intestines.', 10, 10),
(125, 62, 'http://localhost/serverside/items/uploads/lechon.png', 'Lechon Baboy', 'Filipino Lechon Baboy ', 200, 3),
(126, 56, 'http://localhost/serverside/items/uploads/isaw.png', 'Isaw', 'Grilled chicken or pig intestines.', 10, 5),
(130, 64, 'http://localhost/serverside/items/uploads/isaw.png', 'Isaw', 'Grilled chicken or pig intestines.', 10, 4),
(131, 56, 'http://localhost/serverside/items/uploads/Filipino-Pork-Barbecue.png', 'Pork BBQ', 'Hot and Grilled Juicy Filipino Pork BBQ', 15, 3),
(132, 66, 'http://localhost/serverside/items/uploads/bulalo.png', 'Bulalo', 'A hearty beef bone marrow soup with vegetables.', 85, 3),
(133, 56, 'http://localhost/serverside/items/uploads/adobo.png', 'Adobo', 'A classic Filipino dish made with chicken or pork', 75, 6),
(134, 67, 'http://localhost/serverside/items/uploads/lechon.png', 'Lechon Baboy', 'Filipino Lechon Baboy ', 200, 30),
(135, 67, 'http://localhost/serverside/items/uploads/bulalo.png', 'Bulalo', 'A hearty beef bone marrow soup with vegetables.', 85, 3),
(136, 67, 'http://localhost/serverside/items/uploads/chicharon.png', 'Chicharon', 'Deep-fried pork belly.', 80, 6),
(137, 67, 'http://localhost/serverside/items/uploads/Filipino-Pork-Barbecue.png', 'Pork BBQ', 'Hot and Grilled Juicy Filipino Pork BBQ', 15, 4),
(138, 56, 'http://localhost/serverside/items/uploads/sinigang.png', 'Sinigang', 'Filipino Sinigang soup dish', 75, 4),
(139, 66, 'http://localhost/serverside/items/uploads/isaw.png', 'Isaw', 'Grilled chicken or pig intestines.', 10, 5),
(140, 56, 'http://localhost/serverside/items/uploads/lumpia.png', 'Lumpia', 'Served as hot and new lumpia', 50, 3),
(141, 56, 'http://localhost/serverside/items/uploads/chicharon.png', 'Chicharon', 'Deep-fried pork belly.', 80, 2);

-- --------------------------------------------------------

--
-- Table structure for table `deductqty`
--

CREATE TABLE `deductqty` (
  `cart_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `item_id` int(11) NOT NULL,
  `itemName` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `description` text NOT NULL,
  `qty` int(255) NOT NULL,
  `imageUrl` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`item_id`, `itemName`, `price`, `description`, `qty`, `imageUrl`) VALUES
(20, 'Bicol Express', 69, 'Spicy Bicol Express is on the way', 70, 'uploads/BICOL EXPRESS.png'),
(21, 'Lumpia', 50, 'Served as hot and new lumpia', 66, 'uploads/lumpia.png'),
(23, 'Lechon Baboy', 200, 'Filipino Lechon Baboy ', 20, 'uploads/lechon.png'),
(24, 'Sinigang', 75, 'Filipino Sinigang soup dish', 46, 'uploads/sinigang.png'),
(25, 'Pinakbet', 65, 'Filipino Pinakbet soup', 17, 'uploads/pakbet.png'),
(26, 'Sisig', 89, 'Filipino food style dish sisig', 34, 'uploads/image-dish.png'),
(37, 'Dinuguan', 65, 'Fresh and home-made filipino dinuguan', 24, 'uploads/dinuguan.png'),
(46, 'Chicharon', 80, 'Deep-fried pork belly.', 25, 'uploads/chicharon.png'),
(47, 'Isaw', 10, 'Grilled chicken or pig intestines.', 35, 'uploads/isaw.png'),
(48, 'Leche Flan', 50, 'A smooth and creamy custard dessert.', 30, 'uploads/leche flan.png'),
(50, 'Pork BBQ', 15, 'Hot and Grilled Juicy Filipino Pork BBQ', 47, 'uploads/Filipino-Pork-Barbecue.png'),
(51, 'Beef Kaldereta', 60, 'A beef and tomato stewed dish', 50, 'uploads/beef kaldereta.png'),
(52, 'Spaghetti', 65, 'A sweet and savory spaghetti filipino dish.', 50, 'uploads/spageettt.png'),
(53, 'Adobo', 75, 'A classic Filipino dish made with chicken or pork', 44, 'uploads/adobo.png'),
(54, 'Bulalo', 85, 'A hearty beef bone marrow soup with vegetables.', 50, 'uploads/bulalo.png');

--
-- Triggers `items`
--
DELIMITER $$
CREATE TRIGGER `before_insert_items` BEFORE INSERT ON `items` FOR EACH ROW BEGIN
  -- Check if the quantity is negative and set it to 0
  IF NEW.qty < 0 THEN
    SET NEW.qty = 0;
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `ordereditems`
--

CREATE TABLE `ordereditems` (
  `ordereditem_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `payment_id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `address` varchar(555) NOT NULL,
  `invoicenum` int(255) NOT NULL,
  `addDate` date NOT NULL,
  `qnty` int(255) NOT NULL,
  `itemName` varchar(255) NOT NULL,
  `totalbill` int(255) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `note` text NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ordereditems`
--

INSERT INTO `ordereditems` (`ordereditem_id`, `account_id`, `payment_id`, `cart_id`, `firstname`, `lastname`, `address`, `invoicenum`, `addDate`, `qnty`, `itemName`, `totalbill`, `payment_method`, `note`, `status`) VALUES
(38, 58, 147, 119, 'Allana Marie ', 'Laguna', 'Blk. 19, Lot 27, Rosalina 3, Baliok, Davao City', 892792, '2023-11-24', 1, 'Chicharon', 80, 'Cash on Delivery', '', 'Item Delivered!'),
(39, 56, 148, 120, 'Niko', 'Soriano', 'Panabo', 818682, '2023-11-25', 3, 'Lumpia', 150, 'GCash', '', 'Item Delivered!'),
(40, 60, 149, 124, 'James Anthony', 'Piastro', 'Jerome, R.Castillo, Davao City', 176765, '2023-11-25', 10, 'Isaw', 100, 'Cash on Delivery', '', 'Item Delivered!'),
(41, 62, 150, 125, 'Tony Tony', 'Chopper', 'One Piece World', 149660, '2023-11-25', 3, 'Lechon Baboy', 600, 'your_payment_method_here', '', 'Item Delivered!'),
(42, 56, 151, 126, 'Niko', 'Soriano', 'Panabo', 895490, '2023-11-25', 5, 'Isaw', 50, 'GCash', '', 'Not yet Delivered'),
(43, 64, 152, 130, 'Nico', 'Robin', 'East Blue', 509812, '2023-11-25', 4, 'Isaw', 40, 'Cash on Delivery', '', 'Not yet Delivered'),
(44, 56, 153, 131, 'Niko', 'Soriano', 'Panabo', 522546, '2023-11-27', 3, 'Pork BBQ', 45, 'Cash on Delivery', 'remove the sticks', 'Item Delivered!'),
(45, 56, 155, 133, 'Niko', 'Soriano', 'Panabo', 804478, '2023-11-28', 6, 'Adobo', 450, 'Cash on Delivery', 'hawaa ang dahon sa lauren', 'Item Delivered!'),
(47, 56, 157, 138, 'Niko', 'Soriano', 'Panabo', 937196, '2023-11-29', 4, 'Sinigang', 300, 'Cash on Delivery', 'tanggali ug sabaw ang sinigang', 'Item Delivered!'),
(48, 66, 158, 139, 'Oden', 'Kozuki', 'Wano Kuni, One Piece World', 573366, '2023-11-30', 5, 'Isaw', 50, 'Cash on Delivery', 'paki tanggal ang stick please', 'Item Delivered!'),
(49, 56, 159, 141, 'Niko', 'Soriano', 'Panabo', 285331, '2023-11-30', 2, 'Chicharon', 160, 'Cash on Delivery', 'add more vinegar', 'Not yet Delivered');

--
-- Triggers `ordereditems`
--
DELIMITER $$
CREATE TRIGGER `update_total_revenue` AFTER UPDATE ON `ordereditems` FOR EACH ROW BEGIN
    DECLARE invoice_total DECIMAL(10, 2);
    DECLARE invoice_num VARCHAR(255);

    SET invoice_num = NEW.invoicenum;
    SET invoice_total = NEW.totalbill;

    UPDATE orders
    SET totalRevenue = (
        SELECT SUM(totalbill) FROM ordereditems WHERE invoicenum = invoice_num
    )
    WHERE invoicenum = invoice_num;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `payment_id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `invoicenum` int(255) NOT NULL,
  `addDate` date NOT NULL,
  `note` text NOT NULL,
  `totalRevenue` decimal(10,2) NOT NULL DEFAULT 0.00,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `account_id`, `payment_id`, `cart_id`, `invoicenum`, `addDate`, `note`, `totalRevenue`, `status`) VALUES
(80, 58, 147, 119, 892792, '2023-11-24', '', '80.00', 'Item Delivered!'),
(81, 56, 148, 120, 818682, '2023-11-25', '', '150.00', 'Item Delivered!'),
(82, 60, 149, 124, 176765, '2023-11-25', '', '100.00', 'Item Delivered!'),
(83, 62, 150, 125, 149660, '2023-11-25', '', '600.00', 'Item Delivered!'),
(84, 56, 151, 126, 895490, '2023-11-25', '', '0.00', 'Not yet Delivered'),
(85, 64, 152, 130, 509812, '2023-11-25', '', '0.00', 'Not yet Delivered'),
(86, 56, 153, 131, 522546, '2023-11-27', 'remove the sticks', '45.00', 'Item Delivered!'),
(87, 56, 155, 133, 804478, '2023-11-28', 'hawaa ang dahon sa lauren', '450.00', 'Item Delivered!'),
(89, 56, 157, 138, 937196, '2023-11-29', 'tanggali ug sabaw ang sinigang', '300.00', 'Item Delivered!'),
(90, 66, 158, 139, 573366, '2023-11-30', 'paki tanggal ang stick please', '50.00', 'Item Delivered!'),
(91, 56, 159, 141, 285331, '2023-11-30', 'add more vinegar', '0.00', 'Not yet Delivered');

--
-- Triggers `orders`
--
DELIMITER $$
CREATE TRIGGER `before_insert_orders` BEFORE INSERT ON `orders` FOR EACH ROW BEGIN
    DECLARE invoiceNum INT;
    DECLARE addDate DATE;

    -- Generate random invoice number
    SET invoiceNum = FLOOR(100000 + RAND() * 900000);
    SET addDate = CURDATE();

    -- Set the generated values for the new row
    SET NEW.invoicenum = invoiceNum;
    SET NEW.addDate = addDate;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `payment_method` varchar(355) NOT NULL,
  `totalbill` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`payment_id`, `cart_id`, `payment_method`, `totalbill`) VALUES
(146, 118, 'Cash on Delivery', 445),
(147, 119, 'Cash on Delivery', 80),
(148, 120, 'GCash', 150),
(149, 124, 'Cash on Delivery', 100),
(150, 125, 'GCash', 600),
(151, 126, 'GCash', 50),
(152, 130, 'Cash on Delivery', 40),
(153, 131, 'GCash', 45),
(154, 132, 'GCash', 255),
(155, 133, 'Cash on Delivery', 450),
(156, 136, 'Cash on Delivery', 480),
(157, 138, 'Cash on Delivery', 300),
(158, 139, 'Cash on Delivery', 50),
(159, 141, 'Cash on Delivery', 160);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `cartitems`
--
ALTER TABLE `cartitems`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `deductqty`
--
ALTER TABLE `deductqty`
  ADD KEY `deductqty_ibfk_1` (`cart_id`),
  ADD KEY `deductqty_ibfk_2` (`item_id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `ordereditems`
--
ALTER TABLE `ordereditems`
  ADD PRIMARY KEY (`ordereditem_id`),
  ADD KEY `accounts_fk` (`account_id`),
  ADD KEY `carts_fk` (`cart_id`),
  ADD KEY `payments_fk` (`payment_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `account_list` (`account_id`),
  ADD KEY `cart_list` (`cart_id`),
  ADD KEY `payment_list` (`payment_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `cart_id` (`cart_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cartitems`
--
ALTER TABLE `cartitems`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `ordereditems`
--
ALTER TABLE `ordereditems`
  MODIFY `ordereditem_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=160;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cartitems`
--
ALTER TABLE `cartitems`
  ADD CONSTRAINT `account_id` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `deductqty`
--
ALTER TABLE `deductqty`
  ADD CONSTRAINT `deductqty_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cartitems` (`cart_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `deductqty_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ordereditems`
--
ALTER TABLE `ordereditems`
  ADD CONSTRAINT `accounts_fk` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`),
  ADD CONSTRAINT `carts_fk` FOREIGN KEY (`cart_id`) REFERENCES `cartitems` (`cart_id`),
  ADD CONSTRAINT `payments_fk` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `account_list` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`),
  ADD CONSTRAINT `cart_list` FOREIGN KEY (`cart_id`) REFERENCES `cartitems` (`cart_id`),
  ADD CONSTRAINT `payment_list` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cartitems` (`cart_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
