# Adyen Components sample code

![Adyen Components Sample Code](screenshot.png)

> ⚠️ **This repository is for demo purposes only**

## Requirements

To run this project, **create** a `.env` file on your project's root folder following the example on `.env.default`.

```
# Either "test" or "live"
ENVIRONMENT=test

# For "live" environment only - see https://docs.adyen.com/development-resources/live-endpoints
PREFIX=

# For "live" environment only, either blank, "au" or "us"
DC=

# See https://docs.adyen.com/user-management/how-to-get-the-api-key
CHECKOUT_APIKEY=

MERCHANT_ACCOUNT=

WEBHOOKRELAY_KEY=
WEBHOOKRELAY_SERCRET=
WEBHOOKRELAY_BUCKET=

PAYPAL_MERCHANT_ID=MY_PAYPAL_MERCHANT_ID
PAYPAL_INTENT=capture

SDK_VERSION=3.8.0
CHECKOUT_API_VERSION=53

COUNTRY=AU
CURRENCY=AUD
VALUE=1000
SHOPPER_LOCALE=en-US
REFERENCE=TEST-123
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
```

These variables can be found in Adyen Customer Area. For more information, visit our [Get started with Adyen guide](https://docs.adyen.com/payments-essentials/get-started-with-adyen).

## Installation

### Running the PHP Server

Navigate to the root of the project and run the `start.sh` script:

```
$ cd adyen-components-js-sample-code
$ ./start.sh
```

A PHP server will start on `http://localhost:3000`.

### Setting up Webhook Relay

1. Sign up for a free account at https://webhookrelay.com/
2. Create a new bucket
3. Edit the Endpoint Settings for the default public endpoint and set the "Static response body" to always return [accepted]
4. Create a new access token
5. Set the bucket name, access key and secret in your .env file

### Deploying this example to Heroku

Alternatively, you can install this example by using this shortcut to deploy to Heroku:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/astiskala/adyen-components-js-sample-code)

## Documentation

For the complete integration guide, refer to the [Web Components documentation](https://docs.adyen.com/checkout/components-web/).

## Other sample projects

Find other sample projects in our [example projects repositories](https://github.com/adyen-examples).

## License

This repository is open source and available under the MIT license. For more information, see the LICENSE file.
