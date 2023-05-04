<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Adyen Checkout samples</title>
    <link rel="stylesheet" href="https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/<?=getenv('SDK_VERSION')?>/adyen.css">
    <link rel="stylesheet" href="../../assets/style.css">
</head>
<body>
    <div class="container container--full-width">
        <div class="main">
            <a href="../../">Back</a>

            <div class="checkout-container">
                <h1>WeChat Pay Component</h1>
                <div class="payment-method">
                    <div id="wechatpay-container">
                        <!-- WeChat Pay Component will be rendered here -->
                    </div>
                </div>
            </div>

            <h2>Configuration Options</h2>
            <div class="configuration-options">
              <form id="toggles">
                <h3>Locale Configuration</h3>
                <label for="locale">locale:</label>
                <input type="text" id="locale" name="locale" /><br />
                <label for="countryCode">countryCode:</label>
                <input type="text" id="countryCode" name="countryCode" /><br />
                <label for="currency">currency:</label>
                <input type="text" id="currency" name="currency" /><br />
                <label for="value">value:</label>
                <input type="text" id="value" name="value" /><br />
                <input type="button" id="reload" name="reload" value="Reload Component" />

                <h3>/payments Configuration</h3>
                <label for="captureDelayHours">captureDelayHours:</label>
                <input type="text" id="captureDelayHours" name="captureDelayHours" /><br />
                <label for="store">store:</label>
                <input type="text" id="store" name="store" /><br />
              </form>
            </div>

            <div class="info">
                <p>For more information, please refer to the <a href="https://docs.adyen.com/payment-methods/wechat-pay/wechat-pay-desktop-qr-payments/web-component" target="_blank">WeChat Pay Component documentation</a>.</p>
            </div>
        </div>

        <div class="sidebar">
        </div>
    </div>

    <script src="https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/<?=getenv('SDK_VERSION')?>/adyen.js"></script>
    <script src="../../assets/utils.js"></script>
    <script src="wechatpay.js"></script>
</body>
</html>
