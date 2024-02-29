<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Adyen Checkout samples</title>
    <link rel="stylesheet" href="https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/<?=$_GET['sdkVersion']?>/adyen.css">
    <link rel="stylesheet" href="../../assets/style.css">
    <style type="text/css">
      .main {
        width: 100%;
      }

      .my-fields {
        text-align: left;
        width: 350px;
      }

      .adyen-checkout__input, .my-holdername__input {
        border: 3px solid #000;
        border-radius: 0;
      }

      .my-whatsthis__div {
        width: 100%;
        text-align: right;
        padding-top: 5px;
      }

      .my-holdername__label {
        font-size: .81em;
        font-weight: 400;
        line-height: 13px;
        padding-bottom: 5px;
      }

      .my-holdername__input {
        padding: 4px;
        width: 250px;
        font-family: "Comic Sans MS", "Comic Sans", cursive;
        font-size: 20px;
      }

    </style>
</head>
<body>
    <div class="container container--full-width">
        <div class="main">
            <a href="../../">Back</a>

            <div class="checkout-container">
                <h1>Overriding Card Component Style</h1>
                <div class="payment-method">
                    <div id="card-container" class="payment-method__container">
                        <!-- Card Component will be rendered here -->
                    </div>
                    <div class="my-fields">
                      <div class="my-whatsthis__div">
                        <a href="#">What's this?</a>
                      </div>
                      <label for="myHolderName" class="my-holdername__label">Card holder name</label><br />
                      <input type="text" id="myHolderName" name="myHolderName" class="my-holdername__input" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/<?=$_GET['sdkVersion']?>/adyen.js"></script>
    <script src="../../assets/utils.js"></script>
    <script src="overriding-card-style.js"></script>
</body>
</html>
