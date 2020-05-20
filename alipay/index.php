<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Adyen Checkout samples</title>
    <link rel="stylesheet" href="https://checkoutshopper-<?=getenv('ENVIRONMENT')?><?php if (getenv('DC')) { print '-' . getenv('DC'); }?>.adyen.com/checkoutshopper/sdk/<?=getenv('SDK_VERSION')?>/adyen.css">
    <link rel="stylesheet" href="../assets/style.css">
</head>
<body>
    <div class="container container--full-width">
        <div class="main">
            <a href="../">Back</a>

            <div class="checkout-container">
                <h1>AliPay Component</h1>
                <div class="payment-method">
                    <div id="alipay-container">
                        <!-- AliPay Component will be rendered here -->
                    </div>
                </div>
            </div>

            <div class="info">
                <p>
                    To make a payment, use our <a href="https://docs.adyen.com/development-resources/test-cards/test-card-numbers#alipay" target="_blank">Alipay test credentials</a>.
                </p>
                <p>For more information, please refer to the <a href="https://docs.adyen.com/payment-methods/alipay/web-component" target="_blank">Alipay Component documentation</a>.</p>
            </div>
        </div>

        <div class="sidebar">
        </div>
    </div>

    <script src="https://checkoutshopper-<?=getenv('ENVIRONMENT')?><?php if (getenv('DC')) { print '-' . getenv('DC'); }?>.adyen.com/checkoutshopper/sdk/<?=getenv('SDK_VERSION')?>/adyen.js"></script>
    <script src="../assets/utils.js"></script>
    <script src="/alipay/alipay.js"></script>
</body>
</html>
