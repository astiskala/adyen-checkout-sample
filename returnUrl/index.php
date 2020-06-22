<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Adyen Checkout samples</title>
    <link rel="stylesheet" href="../assets/style.css">
</head>
<body>
    <div class="container container--full-width">
        <div class="main">
            <a href="../">Back</a>

            <div class="checkout-container">
                <h1>Redirect Result</h1>

                <div class="payment-method"></div>
            </div>
        </div>

        <div class="sidebar">
        </div>
    </div>

    <script src="../assets/utils.js"></script>
    <script src="/returnUrl/returnUrl.js"></script>
    <script>
<?php
  $request = $_SERVER['QUERY_STRING'];
  if (file_get_contents('php://input') != '') {
      $request .= file_get_contents('php://input');
  }

  $tmp = sys_get_temp_dir() . "/paymentData";
  print('handlePostback("' . file_get_contents($tmp) . '", "' . $request . '");');
?>
    </script>
</body>
</html>
