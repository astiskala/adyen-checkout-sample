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
                <h1>Hosted Checkout</h1>
                <div class="payment-method">
                    <div id="hosted-container">
                        <!-- Link will be rendered here -->
                    </div>
                </div>

                <h2>Configuration Options</h2>
                <div class="configuration-options">
                  <form id="toggles">
                    <h3>Hosted Checkout</h3>
                    <label for="showRemovePaymentMethodButton">showRemovePaymentMethodButton:</label>
                    <input type="checkbox" id="showRemovePaymentMethodButton" name="showRemovePaymentMethodButton" checked="checked" />

                    <h3>Cards Component</h3>
                    <label for="enableStoreDetails">enableStoreDetails:</label>
                    <input type="checkbox" id="enableStoreDetails" name="enableStoreDetails" /><br />
                    <label for="hasHolderName">hasHolderName:</label>
                    <input type="checkbox" id="hasHolderName" name="hasHolderName" /><br />
                    <label for="holderNameRequired">holderNameRequired:</label>
                    <input type="checkbox" id="holderNameRequired" name="holderNameRequired" /><br />
                    <label for="hideCVC">hideCVC:</label>
                    <input type="checkbox" id="hideCVC" name="hideCVC" /><br />
                    <label for="showBrandIcon">showBrandIcon:</label>
                    <input type="checkbox" id="showBrandIcon" name="showBrandIcon" checked="checked" /><br />
                    <label for="billingAddressRequired">billingAddressRequired:</label>
                    <input type="checkbox" id="billingAddressRequired" name="billingAddressRequired" />

                    <h3>Locale Configuration</h3>
                    <label for="locale">locale:</label>
                    <input type="text" id="locale" name="locale" /><br />
                    <label for="countryCode">countryCode:</label>
                    <input type="text" id="countryCode" name="countryCode" /><br />
                    <label for="currency">currency:</label>
                    <input type="text" id="currency" name="currency" /><br />
                    <label for="value">value:</label>
                    <input type="text" id="value" name="value" /><br />

                    <h3>/payments Configuration</h3>
                    <label for="captureDelayHours">captureDelayHours:</label>
                    <input type="text" id="captureDelayHours" name="captureDelayHours" /><br />
                    <label for="enableOneClick">enableOneClick:</label>
                    <input type="checkbox" id="enableOneClick" name="enableOneClick" /><br />
                    <label for="store">store:</label>
                    <input type="text" id="store" name="store" /><br />
                    <label for="threeDSAuthenticationOnly">threeDSAuthenticationOnly:</label>
                    <input type="checkbox" id="threeDSAuthenticationOnly" name="threeDSAuthenticationOnly" /><br />

                    <input type="button" id="reload" name="reload" value="Generate New Hosted Checkout" />
                  </form>
                </div>
            </div>

            <div class="info">
                <p>
                    To make a payment, use our <a href="https://docs.adyen.com/development-resources/test-cards/test-card-numbers" target="_blank">test card numbers</a>.
                </p>
                <p>
                    For more information, please refer to the <a href="https://docs.adyen.com/online-payments/build-your-integration/?platform=Web&integration=Hosted+Checkout" target="_blank">Hosted Checkout documentation</a>.
                </p>
            </div>
        </div>

        <div class="sidebar">
        </div>
    </div>

    <script src="../assets/utils.js"></script>
    <script src="hosted.js"></script>
</body>
</html>
