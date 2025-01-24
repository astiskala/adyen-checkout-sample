<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Adyen Checkout samples</title>
    <link rel="stylesheet" href="https://checkoutshopper-test.cdn.adyen.com/checkoutshopper/sdk/<?=$_GET['sdkVersion']?>/adyen.css">
    <link rel="stylesheet" href="../../assets/style.css">
</head>
<body>
    <div class="container container--full-width">
        <div class="main">
            <a href="../../">Back</a>

            <div class="checkout-container">
                <h1>Google Pay Component</h1>
                <div class="payment-method">

                    <div id="googlepay-container">
                        <!-- Google Pay Component will be rendered here -->
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
                <label for="native3ds2">Enable Native 3DS2:</label>
                <input type="checkbox" id="native3ds2" name="native3ds2" checked="checked" /><br />
                <label for="executeThreeD">executeThreeD:</label>
                <input type="checkbox" id="executeThreeD" name="executeThreeD" checked="checked" /><br />
                <label for="forceChallenge">Force Challenge:</label>
                <input type="checkbox" id="forceChallenge" name="forceChallenge" /><br />
              </form>
            </div>

            <div class="info">
                <p>
                    For more information, please refer to the <a href="https://docs.adyen.com/payment-methods/google-pay/web-component" target="_blank">Google Pay Component documentation</a>.
                </p>
            </div>
        </div>

        <div class="sidebar">
            <div class="header">
                <h2>Current state</h2>
            </div>
            <pre class="current-state">{}</pre>
        </div>
    </div>

    <script src="https://checkoutshopper-test.cdn.adyen.com/checkoutshopper/sdk/<?=$_GET['sdkVersion']?>/adyen.js"></script>
    <script src="../../assets/utils.js"></script>
    <script src="googlepay.js"></script>
</body>
</html>
