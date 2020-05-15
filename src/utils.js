// Generic GET Helper
let httpGet = async (endpoint, data) => {
    const response = await fetch(`/${endpoint}?${data}`);
    const text = await response.text();
    return text;
};

// Generic POST Helper
const httpPost = (endpoint, data) =>
    fetch(`/${endpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json());

const getPaymentMethodsConfig = async () => {
    let config = {
        amount: {}
    };
    config.merchantAccount = await httpGet('env', 'MERCHANT_ACCOUNT');
    config.reference = await httpGet('env', 'REFERENCE');
    config.shopperReference = await httpGet('env', 'SHOPPER_REFERENCE');
    config.countryCode = await httpGet('env', 'COUNTRY');
    config.shopperLocale = await httpGet('env', 'SHOPPER_LOCALE');
    config.amount.currency = await httpGet('env', 'CURRENCY');
    config.amount.value = await httpGet('env', 'VALUE');
    return config;
};

const getPaymentsDefaultConfig = async() => {
    let config = {
        channel: 'Web',
        applicationInfo: { externalPlatform: { name: 'adyen-components-js-sample-code', version: 'N/A', integrator: 'https://github.com/Adyen' } },
        amount: {},
        shopperName: {},
        billingAddress: {},
        deliveryAddress: {},
        paymentMethod: {},
        lineItems: []
    };

    config.merchantAccount = await httpGet('env', 'MERCHANT_ACCOUNT');
    config.reference = await httpGet('env', 'REFERENCE');
    config.shopperReference = await httpGet('env', 'SHOPPER_REFERENCE');
    config.countryCode = await httpGet('env', 'COUNTRY');
    config.returnUrl = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/returnUrl';
    config.shopperEmail = await httpGet('env', 'SHOPPER_EMAIL');
    config.telephoneNumber = await httpGet('env', 'TELEPHONE_NUMBER');
    config.dateOfBirth = await httpGet('env', 'DATE_OF_BIRTH');

    config.amount.currency = await httpGet('env', 'CURRENCY');
    config.amount.value = await httpGet('env', 'VALUE');

    config.shopperName.firstName = await httpGet('env', 'SHOPPERNAME_FIRSTNAME');
    config.shopperName.lastName = await httpGet('env', 'SHOPPERNAME_LASTNAME');

    config.billingAddress.city = await httpGet('env', 'BILLING_ADDRESS_CITY');
    config.billingAddress.country = await httpGet('env', 'BILLING_ADDRESS_COUNTRY');
    config.billingAddress.houseNumberOrName = await httpGet('env', 'BILLING_ADDRESS_HOUSENUMBERORNAME');
    config.billingAddress.postalCode = await httpGet('env', 'BILLING_ADDRESS_POSTALCODE');
    config.billingAddress.stateOrProvince = await httpGet('env', 'BILLING_ADDRESS_STATEORPROVINCE');
    config.billingAddress.street = await httpGet('env', 'BILLING_ADDRESS_STREET');

    config.deliveryAddress.city = await httpGet('env', 'DELIVERY_ADDRESS_CITY');
    config.deliveryAddress.country = await httpGet('env', 'DELIVERY_ADDRESS_COUNTRY');
    config.deliveryAddress.houseNumberOrName = await httpGet('env', 'DELIVERY_ADDRESS_HOUSENUMBERORNAME');
    config.deliveryAddress.postalCode = await httpGet('env', 'DELIVERY_ADDRESS_POSTALCODE');
    config.deliveryAddress.stateOrProvince = await httpGet('env', 'DELIVERY_ADDRESS_STATEORPROVINCE');
    config.deliveryAddress.street = await httpGet('env', 'DELIVERY_ADDRESS_STREET');

    config.paymentMethod.clickAndCollect = await httpGet('env', 'ZIP_CLICKANDCOLLECT');

    config.lineItems = [{
        id: '1',
        description: 'Test Item 1',
        amountExcludingTax: config.amount.value,
        amountIncludingTax: config.amount.value,
        taxAmount: 0,
        taxPercentage: 0,
        quantity: 1,
        taxCategory: 'High'
    }];

    return config;
};

// Get all available payment methods from the local server
const getPaymentMethods = () => {
    return getPaymentMethodsConfig().then(paymentMethodsConfig => {
      updateRequestContainer("/paymentMethods", paymentMethodsConfig);

      return httpPost('paymentMethods', paymentMethodsConfig)
          .then(response => {
              if (response.error) throw 'No paymentMethods available';
              updateResponseContainer("/paymentMethods", response);
              return response;
          })
          .catch(console.error);
    });
};

// Posts a new payment into the local server
const makePayment = (paymentMethod, config = {}, includeDeliveryAddress = true) => {
  return getPaymentsDefaultConfig().then(paymentsDefaultConfig => {
    const paymentsConfig = {
        ...paymentsDefaultConfig,
        ...config
    };

    if (paymentMethod.paymentMethod.type === "zip") {
      paymentMethod.paymentMethod.clickAndCollect = paymentsConfig.paymentMethod.clickAndCollect;
    }

    const paymentRequest = {
        ...paymentsConfig,
        ...paymentMethod
    };

    if (includeDeliveryAddress === false) {
      paymentRequest.shopperName = null;
      paymentRequest.deliveryAddress = null;
    }

    updateRequestContainer("/payments", paymentRequest);

    return httpPost('payments', paymentRequest)
        .then(response => {
            if (response.error) throw 'Payment initiation failed';
            updateResponseContainer("/payments", response);
            return response;
        })
        .catch(console.error);
    });
};

// Posts additional details into the local server
const submitAdditionalDetails = (stateData, config = {}) => {
    updateRequestContainer("/payments/details", stateData);

    return httpPost('paymentDetails', stateData)
        .then(response => {
            if (response.error) throw 'Payment details submission failed';
            updateResponseContainer("/payments/details", response);
            return response;
        })
        .catch(console.error);
};

// Fetches an originKey from the local server
const getOriginKey = () =>
    httpPost('originKeys')
    .then(response => {
        if (response.error || !response.originKeys) throw 'No originKey available';

        return response.originKeys[Object.keys(response.originKeys)[0]];
    })
    .catch(console.error);

const subscribeToWebhooks = async() => {
  const webhookRelayKey = await httpGet('env', 'WEBHOOKRELAY_KEY');

  if (webhookRelayKey !== "") {
    const client = new WebSocket('wss://my.webhookrelay.com/v1/socket');
    const webhookRelaySecret = await httpGet('env', 'WEBHOOKRELAY_SERCRET');
    const webhookRelayBucket = await httpGet('env', 'WEBHOOKRELAY_BUCKET');

    client.onopen = () => {
      console.log('WebSocket Client Connected');
      client.send(JSON.stringify({
          "action": "auth",
          "key": webhookRelayKey,
          "secret": webhookRelaySecret
      }));
    };

    client.onmessage = (message) => {
      console.log(message);
      const jsonData = JSON.parse(message.data);
      if(jsonData.status === "authenticated") {
        console.log('Authenticated, subscribing to bucket...');
        client.send(JSON.stringify({
            "action":"subscribe",
            "buckets": [ "demo" ]
        }));
    }

    if(jsonData.type === "webhook") {
        console.log('Got webhook...');
        console.log(jsonData.body);
        updateResponseContainer("Webhook Notification", JSON.parse(jsonData.body));
      }
    };
  }
};

subscribeToWebhooks();
