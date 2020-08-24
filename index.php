<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Adyen Checkout samples</title>
    <link rel="stylesheet" href="assets/style.css" />
  </head>
  <body>
    <div class="container">
      <h1>Adyen Checkout samples</h1>
      <div class="intro">
        <p>
          This project been designed to highlight the capabilities of the Adyen Checkout
          SDK and to help developers familiarise themselves with various payment flows. It
          contains the following features:
        </p>
        <ul>
          <li>Ability to view the request and response of all synchronous API calls in your
            browser and in the console</li>
          <li>Ability to view Webhook notification responses</li>
          <li>Support for Pay by Link, Drop-in and Components</li>
          <li>UI-based toggles for various configuration options</li>
          <li>Native 3DS2 support</li>
          <li>Support for many alternative payment methods</li>
          <li>Adyen Giving example</li>
        </ul>
      </div>
      <div class="warning">
        <span class="warning-symbol">⚠️</span>
        <p class="warning-text">This sample project is for demonstration purposes only. It is purposefully insecure and as such, this code should not be used for any production implementations.</p>
      </div>
      <ul class="payment_methods__list">
        <li class="payment_methods__list__toplevel">
          <a href="dropin/">Drop-in</a>
        </li>
        <li class="payment_methods__list__toplevel">
          <a href="paybylink/">Pay by Link</a>
        </li>
        <li class="payment_methods__list__toplevel">
          <a href="adyengiving/">Adyen Giving</a>
        </li>
          <li class="payment_methods__list__toplevel">
            <a href="surcharging/">Surcharging</a>
          </li>
        <li class="payment_methods__list__toplevel">
          Components
          <ul class="payment_methods__list">
            <li class="payment_methods__list__element">
              <a href="components/card/">Card</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/ach/">ACH Direct Debit</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/afterpaytouch/">AfterPay Touch</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/alipay/">AliPay</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/bancontact/">Bancontact Mobile</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/boleto/">Boleto Bancário</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/giftcard/">Gift Card</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/googlepay/">Google Pay</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/ideal/">iDEAL</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/klarna/">Klarna</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/multibanco/">Multibanco</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/paypal/">PayPal</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/sepa/">SEPA Direct Debit</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/swish/">Swish</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/wechatpay/">WeChat Pay</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/zip/">Zip</a>
            </li>
          </ul>
        </li>
      </ul>

      <div class="info">
        <p>
          For more information, please refer to the
          <a
            href="https://docs.adyen.com/checkout/"
            target="_blank"
            rel="noreferrer"
            >Adyen documentation</a
          >.
        </p>
      </div>
    </div>
  </body>
</html>
