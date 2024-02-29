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
          <a href="dropin/?sdkVersion=<?=getenv('SDK_VERSION')?>">Drop-in</a>
        </li>
        <li class="payment_methods__list__toplevel">
          <a href="dropin-simplified/?sdkVersion=<?=getenv('SDK_VERSION')?>">Drop-in (Simplified)</a>
        </li>
        <li class="payment_methods__list__toplevel">
          <a href="hosted/?sdkVersion=<?=getenv('SDK_VERSION')?>">Hosted Checkout</a>
        </li>
        <li class="payment_methods__list__toplevel">
          <a href="paybylink/?sdkVersion=<?=getenv('SDK_VERSION')?>">Pay by Link</a>
        </li>
        <li class="payment_methods__list__toplevel">
          <a href="adyengiving/?sdkVersion=<?=getenv('SDK_VERSION')?>">Adyen Giving</a>
        </li>
        <li class="payment_methods__list__toplevel">
          <a href="surcharging/?sdkVersion=<?=getenv('SDK_VERSION')?>">Surcharging</a>
        </li>
        <li class="payment_methods__list__toplevel">
          Components
          <ul class="payment_methods__list">
            <li class="payment_methods__list__element">
              <a href="components/card/?sdkVersion=<?=getenv('SDK_VERSION')?>">Card</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/ach/?sdkVersion=<?=getenv('SDK_VERSION')?>">ACH Direct Debit</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/afterpaytouch/?sdkVersion=<?=getenv('SDK_VERSION')?>">AfterPay Touch</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/alipay/?sdkVersion=<?=getenv('SDK_VERSION')?>">AliPay</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/bancontact/?sdkVersion=<?=getenv('SDK_VERSION')?>">Bancontact Mobile</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/boleto/?sdkVersion=<?=getenv('SDK_VERSION')?>">Boleto Bancário</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/giftcard/?sdkVersion=<?=getenv('SDK_VERSION')?>">Gift Card</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/googlepay/?sdkVersion=<?=getenv('SDK_VERSION')?>">Google Pay</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/ideal/?sdkVersion=<?=getenv('SDK_VERSION')?>">iDEAL</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/klarna/?sdkVersion=<?=getenv('SDK_VERSION')?>">Klarna</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/multibanco/?sdkVersion=<?=getenv('SDK_VERSION')?>">Multibanco</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/paypal/?sdkVersion=<?=getenv('SDK_VERSION')?>">PayPal</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/sepa/?sdkVersion=<?=getenv('SDK_VERSION')?>">SEPA Direct Debit</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/swish/?sdkVersion=<?=getenv('SDK_VERSION')?>">Swish</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/wechatpay/?sdkVersion=<?=getenv('SDK_VERSION')?>">WeChat Pay</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="components/zip/?sdkVersion=<?=getenv('SDK_VERSION')?>">Zip</a>
            </li>
          </ul>
        </li>
        <li class="payment_methods__list__toplevel">
          Demos
          <ul class="payment_methods__list">
            <li class="payment_methods__list__element">
              <a href="demos/overriding-card-style/?sdkVersion=<?=getenv('SDK_VERSION')?>">Overriding Card Component Style</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="demos/gst-amount/?sdkVersion=<?=getenv('SDK_VERSION')?>">Sending GST Amount</a>
            </li>
            <li class="payment_methods__list__element">
              <a href="demos/update-amount/?sdkVersion=<?=getenv('SDK_VERSION')?>">Update Amount</a>
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
