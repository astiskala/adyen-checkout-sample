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
                <h1>Update Amount</h1>

                <label for="newAmount">New Amount:</label>
                <input type="text" id="newAmount" name="newAmount" />
                <input type="button" id="submitNewAmount" name="submitNewAmount" onclick="javascript:updateAmount();" value="Update" />

                <div class="payment-method">
                    <div id="dropin-container">
                        <!-- Drop-in will be rendered here -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://checkoutshopper-test.cdn.adyen.com/checkoutshopper/sdk/<?=$_GET['sdkVersion']?>/adyen.js"></script>
    <script src="../../assets/utils.js"></script>
    <script src="update-amount.js"></script>
</body>
</html>
