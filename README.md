# Adyen Checkout samples

This project been designed to highlight the capabilities of the Adyen Checkout
SDK and to help developers familiarise themselves with various payment flows. It
contains the following features:

- Ability to view the request and response of all synchronous API calls in your
  browser and in the console
- Ability to view Webhook notification responses
- Support for Pay by Link, Drop-in and Components
- UI-based toggles for various configuration options
- Native 3DS2 support
- Support for many alternative payment methods
- Adyen Giving example

> ⚠️ **This sample project is for demonstration purposes only. It is
> purposefully insecure and as such, this code should not be used for any
> production implementations.**

## Requirements

### PHP

You will need PHP installed on your local machine with the cURL and OpenSSL
extensions enabled.

## Configuration

To run this project, **create** a `.env` file on your project's root folder
following the example on `.env.default`.

```
# Either "test" or "live"
ENVIRONMENT=test

# For "live" environment only - see https://docs.adyen.com/development-resources/live-endpoints
PREFIX=

# For "live" environment only, either blank, "au" or "us"
DC=

# See https://docs.adyen.com/user-management/how-to-get-the-api-key
CHECKOUT_APIKEY=

CHECKOUT_CLIENTKEY=

# See https://docs.adyen.com/user-management/company-and-merchant-accounts
MERCHANT_ACCOUNT=

# See https://docs.adyen.com/checkout/donate/
CHARITY_ACCOUNT=

# See "Setting up Webhook Relay" in README.md
WEBHOOKRELAY_KEY=
WEBHOOKRELAY_SERCRET=
WEBHOOKRELAY_BUCKET=

PAYPAL_MERCHANT_ID=MY_PAYPAL_MERCHANT_ID
PAYPAL_INTENT=capture

GOOGLE_PAY_MERCHANT_ID=

SDK_VERSION=3.9.5
CHECKOUT_API_VERSION=53

COUNTRY=AU
CURRENCY=AUD
VALUE=1000
SHOPPER_LOCALE=en-US
REFERENCE=TEST-{guid}
SHOPPER_REFERENCE=JohnSmith

CARD_HOLDERNAME=John Smith
SHOPPERNAME_FIRSTNAME=John
SHOPPERNAME_LASTNAME=Smith
SHOPPER_EMAIL=shopper@email.com
TELEPHONE_NUMBER=+61404040404
BILLING_ADDRESS_CITY=Sydney
BILLING_ADDRESS_COUNTRY=AU
BILLING_ADDRESS_HOUSENUMBERORNAME=123
BILLING_ADDRESS_POSTALCODE=2000
BILLING_ADDRESS_STATEORPROVINCE=NSW
BILLING_ADDRESS_STREET=Happy Street
DELIVERY_ADDRESS_CITY=Sydney
DELIVERY_ADDRESS_COUNTRY=AU
DELIVERY_ADDRESS_HOUSENUMBERORNAME=123
DELIVERY_ADDRESS_POSTALCODE=2000
DELIVERY_ADDRESS_STATEORPROVINCE=NSW
DELIVERY_ADDRESS_STREET=Happy Street
DATE_OF_BIRTH=2000-01-01

ZIP_CLICKANDCOLLECT=false

PAYBYLINK_DESCRIPTION=Your payment
```

You can use {guid} to have a random GUID inserted in any variable.

These variables can be found in Adyen Customer Area. For more information, visit
[Get started with Adyen guide](https://docs.adyen.com/payments-essentials/get-started-with-adyen).

### Setting up Webhook Relay

Webhook Relay will alllow you to see the result of webhook notifications in
real time as payments are made.

1. Sign up for a free account at https://webhookrelay.com/
2. Create a new bucket
3. Edit the Endpoint Settings for the default public endpoint and set the
   "Static response body" to always return [accepted]
4. Create a new access token
5. Set the bucket name, access key and secret in your .env file

## Usage

### MacOS / Linux

Navigate to the root of the project and run the `start.sh` script:

```sh
$ cd adyen-checkout-sample
$ ./start.sh
```

A PHP server will start on `http://localhost:3000`.

### Windows

Navigate to the root of the project and run the `Start.ps1` script:

```powershell
PS> cd adyen-checkout-sample
PS> .\Start.ps1
```

A PHP server will start on `http://localhost:3000`.

### Deploying this example to Heroku

Alternatively, you can install this example by using this shortcut to deploy to Heroku:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/astiskala/adyen-checkout-sample)

## Documentation

For the complete integration guide, refer to https://docs.adyen.com/checkout/.

## Other sample projects

Find other sample projects in our [example projects repositories](https://github.com/adyen-examples).

## License

This repository is open source and available under the MIT license. For more
information, see the LICENSE file.
