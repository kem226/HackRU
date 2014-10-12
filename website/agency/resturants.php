<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Agency - Start Bootstrap Theme</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/mystyle.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/agency.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="font-awesome-4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="http://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
    <link href='http://fonts.googleapis.com/css?family=Kaushan+Script' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700' rel='stylesheet' type='text/css'>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body id="page-top" class="pages">

    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-fixed-top navbar-shrink">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header page-scroll">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand page-scroll" href="#page-top"> <img src="img/logos/logomini.png"></a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li class="hidden">
                        <a href="#page-top"></a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#services">Munch!</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#portfolio">Portfolio</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#team">Team</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#contact">Contact</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="login.html">Log in</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
    </nav>
    
<?php

include "api-php-master/orderin/api.php";

$ordrin_api = new Ordrin\APIs("bn1lAtr4jzqJRUZkpiiUzsIPm9Cm4aM_Vxa7QpWeYRQ", Ordrin\APIs::TEST);

$email = "kem226@cornell.edu";
$password = "buzzzz";


$address = array(
  "addr" => "900 Broadway",
  "city" => "New York",
  "state" => "NY",
  "zip" => "10003",
  "phone" => "555-555-5555"
                 );

$credit_card = array(
  "card_name" => "Test User",
  "card_expiry" => "01/2016",
  "card_number" => "4111111111111111",
  "card_cvc" => "123",
  "card_bill_addr" => $address["addr"],
  "card_bill_city" => $address["city"],
  "card_bill_state" => $address["state"],
  "card_bill_zip" => $address["zip"],
  "card_bill_phone" => $address["phone"]
                     );

$delivery_list = $ordrin_api->delivery_list(array("datetime" => "ASAP",
                                                  "addr" => "900 Broadway",
                                                  "city" => "New York",
                                                  "zip" => "10003"));
$restaurant_id = (string)($delivery_list[0]["id"]);

 foreach($delivery_list as $id){
    echo $id["id"];
    
 }

//$detail = $ordrin_api->restaurant_details(array("rid" => $restaurant_id));



//$acc_resp = $ordrin_api->create_account(array("email" => $email,
                                             // "pw" => $password,
                                            //  "first_name" => "Test",
                                            //  "last_name" => "User"));
//echo json_encode($acc_resp, JSON_PRETTY_PRINT);

//$acc_desc = $ordrin_api->get_account_info(array("email" => $email,
  //                                              "current_password" => $password));
//echo json_encode($acc_desc, JSON_PRETTY_PRINT);
/*
function find_item_to_order($item_list){
  foreach($item_list as $item){
    if($item["is_orderable"] == 1){
      if(floatval($item["price"]) >= 5.00){
        return (string)$item["id"];
      }
    } else {
      if(array_key_exists("children", $item)){
        $item_id = find_item_to_order($item["children"]);
        if(!is_null($item_id)){
          return $item_id;
        }
      }
    }
  }
  return null;
}

$item_id = find_item_to_order($detail["menu"]);
$tray = "$item_id/10";

$order_data = array_merge($address, $credit_card, array("rid" => $restaurant_id,
                                                        "tray" => $tray,
                                                        "tip" => "5.00",
                                                        "first_name" => "Test",
                                                        "last_name" => "User",
                                                        "delivery_date" => "ASAP",
                                                        "em" => $email));
echo json_encode($ordrin_api->order_guest($order_data));

*/




if (!isset($_POST["signup"])) {
    
    
    
 }
 
 if (!isset($_POST["login"])){
  
    
 }
    
?>

   <div class="container">
	<div class="row clearfix">
		<div class="col-md-12 column">
			<h3>
				h3. Lorem ipsum dolor sit amet.
			</h3>
			<table class="table table-hover table-condensed">
				<thead>
					<tr>
						<th>
							#
						</th>
						<th>
							Product
						</th>
						<th>
							Payment Taken
						</th>
						<th>
							Status
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							1
						</td>
						<td>
							TB - Monthly
						</td>
						<td>
							01/04/2012
						</td>
						<td>
							Default
						</td>
					</tr>
					<tr class="active">
						<td>
							1
						</td>
						<td>
							TB - Monthly
						</td>
						<td>
							01/04/2012
						</td>
						<td>
							Approved
						</td>
					</tr>
					<tr class="success">
						<td>
							2
						</td>
						<td>
							TB - Monthly
						</td>
						<td>
							02/04/2012
						</td>
						<td>
							Declined
						</td>
					</tr>
					<tr class="warning">
						<td>
							3
						</td>
						<td>
							TB - Monthly
						</td>
						<td>
							03/04/2012
						</td>
						<td>
							Pending
						</td>
					</tr>
					<tr class="danger">
						<td>
							4
						</td>
						<td>
							TB - Monthly
						</td>
						<td>
							04/04/2012
						</td>
						<td>
							Call in to confirm
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
</div>

</body>

</html>
