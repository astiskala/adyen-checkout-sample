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
                <h1>Pay by Link</h1>
                <div class="payment-method">
                    <div id="paybylink-container">
                        <!-- Link will be rendered here -->
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
                    <input type="button" id="reload" name="reload" value="Generate New Link" />
                  </form>
                </div>

                <h2>Configuration Options</h2>
                <div class="configuration-options">
                  <form id="toggles">
                    <h3>Pay by Link</h3>
                    <label for="reusable">reusable:</label>
                    <input type="checkbox" id="reusable" name="reusable" checked="checked" /><br />
                    <label for="storePaymentMethod">storePaymentMethod:</label>
                    <input type="checkbox" id="storePaymentMethod" name="storePaymentMethod" />
                  </form>
                </div>
            </div>

            <div class="info">
                <p>
                    To make a payment, use our <a href="https://docs.adyen.com/development-resources/test-cards/test-card-numbers" target="_blank">test card numbers</a>.
                </p>
                <p>
                    For more information, please refer to the <a href="https://docs.adyen.com/checkout/pay-by-link" target="_blank">Pay by Link documentation</a>.
                </p>
            </div>
        </div>

        <div class="sidebar">
        </div>
    </div>

    <script src="../assets/utils.js"></script>
    <script src="paybylink.js"></script>
</body>
</html>
