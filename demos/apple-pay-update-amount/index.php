<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Adyen Checkout samples</title>
    <link rel="stylesheet" href="https://checkoutshopper-test.cdn.adyen.com/checkoutshopper/sdk/<?=$_GET['sdkVersion']?>/adyen.css">
    <link rel="stylesheet" href="../../assets/style.css">
    <style type="text/css">
      .main {
        width: 100%;
      }

    </style>
</head>
<body>
    <div class="container container--full-width">
        <div class="main">
            <a href="../../">Back</a>

            <div class="checkout-container">
                <div class="payment-method">
                    <div id="applepay-container">
                        <!-- Component will be rendered here -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://checkoutshopper-test.cdn.adyen.com/checkoutshopper/sdk/<?=$_GET['sdkVersion']?>/adyen.js"></script>
    <script src="../../assets/utils.js"></script>
    <script src="apple-pay-update-amount.js"></script>
</body>
</html>
