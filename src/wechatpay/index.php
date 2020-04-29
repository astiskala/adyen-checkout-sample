<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Adyen Checkout Components sample code</title>
    <link rel="stylesheet" href="https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/<?=getenv('SDK_VERSION')?>/adyen.css">
    <link rel="stylesheet" href="../demo.css">
</head>
<body>
    <div class="container container--full-width">
        <div class="main">
            <a href="../">Back</a>

            <div class="checkout-container">
                <h1>WeChat Pay Component</h1>
                <div class="payment-method">
                    <div id="wechatpay-container">
                        <!-- WeChat Pay Component will be rendered here -->
                    </div>
                </div>
            </div>

            <div class="info">
                <p>Check the Source Code to see the full implementation.</p>
                <p>For more information, please refer to the <a href="https://docs.adyen.com/checkout/components-web/" target="_blank">Checkout Components documentation</a>.</p>
            </div>
        </div>

        <div class="sidebar">
        </div>
    </div>

    <script src="https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/<?=getenv('SDK_VERSION')?>/adyen.js"></script>
    <script src="../demo.js"></script>
    <script src="../utils.js"></script>
    <script src="/wechatpay/wechatpay.js"></script>
</body>
</html>
