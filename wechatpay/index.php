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

    <script src="https://checkoutshopper-<?=getenv('ENVIRONMENT')?><?php if (getenv('DC')) { print '-' . getenv('DC'); }?>.adyen.com/checkoutshopper/sdk/<?=getenv('SDK_VERSION')?>/adyen.js"></script>
    <script src="../assets/utils.js"></script>
    <script src="/wechatpay/wechatpay.js"></script>
</body>
</html>
