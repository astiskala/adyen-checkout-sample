const checkoutContainer = document.querySelector('.payment-method');
const sidebar = document.querySelector('.sidebar');
const stateContainer = document.querySelector('.current-state');

function updateStateContainer(newState) {
  console.log('State', newState);
  stateContainer.innerText = JSON.stringify(newState, null, 2);
}

function updateRequestContainer(name, response) {
  const formattedJson = JSON.stringify(response, null, 2);
  console.log(`${name} Request`, response);
  sidebar.insertAdjacentHTML(
    'beforeend',
    `<div class="request-container request-container--visible">
        <div class="header">
            <h2>${name} Request</h2>
        </div>
        <pre class="request-code">${formattedJson}</pre>
    </div>
  `,
  );

  sidebar.scrollTop = sidebar.scrollHeight;
}

function updateResponseContainer(name, response) {
  const formattedJson = JSON.stringify(response, null, 2);
  console.log(`${name} Response`, response);
  sidebar.insertAdjacentHTML(
    'beforeend',
    `<div class="response-container response-container--visible">
        <div class="header">
            <h2>${name} Response</h2>
        </div>
        <pre class="response-code">${formattedJson}</pre>
    </div>
  `,
  );

  sidebar.scrollTop = sidebar.scrollHeight;
}

const clearRequests = function clearRequests() {
  const requestContainers = document.getElementsByClassName('request-container');
  while (requestContainers[0]) {
    requestContainers[0].parentNode.removeChild(requestContainers[0]);
  }

  const responseContainers = document.getElementsByClassName('response-container');
  while (responseContainers[0]) {
    responseContainers[0].parentNode.removeChild(responseContainers[0]);
  }

  const resultContainers = document.getElementsByClassName('result-code');
  while (resultContainers[0]) {
    resultContainers[0].parentNode.removeChild(resultContainers[0]);
  }
};

function updateResultContainer(response) {
  console.log('Result', response);
  checkoutContainer.insertAdjacentHTML(
    'afterbegin',
    `<div class="result-code">${response}</div>`,
  );

  sidebar.scrollTop = sidebar.scrollHeight;
}

const httpGet = async (endpoint, data) => {
  const response = await fetch(`/server/api/${endpoint}.php?${data}`);
  const text = await response.text();
  return text;
};

const httpPost = (endpoint, data) => fetch(`/server/api/${endpoint}.php`, {
  method: 'POST',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
}).then((response) => response.json());

const getCostEstimateDefaultConfig = async () => {
  const config = {};
  config.merchantAccount = await httpGet('env', 'MERCHANT_ACCOUNT');
  return config;
};

const disableDefaultConfig = async () => {
  const config = {};
  config.merchantAccount = await httpGet('env', 'MERCHANT_ACCOUNT');
  return config;
};

const getPaymentMethodsDefaultConfig = async () => {
  const config = {};
  config.merchantAccount = await httpGet('env', 'MERCHANT_ACCOUNT');
  config.shopperReference = await httpGet('env', 'SHOPPER_REFERENCE');
  config.channel = 'Web';
  return config;
};

const getPaymentsDefaultConfig = async () => {
  const config = {
    channel: 'Web',
    applicationInfo: {
      externalPlatform: {
        name: 'adyen-checkout-sample',
        version: 'N/A',
        integrator: 'https://github.com/astiskala/adyen-checkout-sample',
      },
    },
    shopperName: {},
    billingAddress: {},
    deliveryAddress: {},
    paymentMethod: {},
    lineItems: [],
  };

  config.merchantAccount = await httpGet('env', 'MERCHANT_ACCOUNT');
  config.reference = await httpGet('env', 'REFERENCE');
  config.shopperReference = await httpGet('env', 'SHOPPER_REFERENCE');

  const ipResponse = await fetch('https://api.ipify.org');
  config.shopperIP = await ipResponse.text();

  config.origin = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
  config.returnUrl = `${config.origin}/returnUrl`;

  config.shopperEmail = await httpGet('env', 'SHOPPER_EMAIL');
  config.telephoneNumber = await httpGet('env', 'TELEPHONE_NUMBER');
  config.dateOfBirth = await httpGet('env', 'DATE_OF_BIRTH');

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

  return config;
};

const disable = (disableObject) => disableDefaultConfig()
  .then((disableDefaultConfig) => {
    var disableRequest = {
      ...disableDefaultConfig,
      ...disableObject
    };

    updateRequestContainer('/disable', disableRequest);

    return httpPost('disable', disableRequest)
      .then((response) => {
        updateResponseContainer('/disable', response);
        return response;
      });
  });

const getCostEstimate = (costEstimate) => getCostEstimateDefaultConfig()
  .then((costEstimateDefaultConfig) => {
    const costEstimateRequest = {
      ...costEstimateDefaultConfig,
      ...costEstimate,
    };

    updateRequestContainer('/getCostEstimate', costEstimateRequest);

    return httpPost('getCostEstimate', costEstimateRequest)
      .then((response) => {
        updateResponseContainer('/getCostEstimate', response);
        return response;
      });
  });

const getPaymentMethods = (localeConfig) => getPaymentMethodsDefaultConfig()
  .then((paymentMethodsDefaultConfig) => {
    const paymentMethodsRequest = {
      ...paymentMethodsDefaultConfig,
      ...localeConfig,
    };

    updateRequestContainer('/paymentMethods', paymentMethodsRequest);

    return httpPost('paymentMethods', paymentMethodsRequest)
      .then((response) => {
        if (response.error) {
          console.error('No paymentMethods available');
        }

        updateResponseContainer('/paymentMethods', response);
        return response;
      });
  });

const makePayment = (localeConfig,
  rawPaymentMethod,
  config = {},
  includeDeliveryAddress = true,
  native3ds2 = false) => getPaymentsDefaultConfig()
  .then((paymentsDefaultConfig) => {
    const paymentsConfig = {
      ...paymentsDefaultConfig,
      ...localeConfig,
      ...config,
    };

    paymentsConfig.lineItems = [
      {
        id: '001',
        description: 'Product',
        amountExcludingTax: paymentsConfig.amount.value,
        amountIncludingTax: paymentsConfig.amount.value,
        taxAmount: 0,
        taxPercentage: 0,
        quantity: 1,
        taxCategory: 'Zero',
      },
    ];

    const paymentMethod = rawPaymentMethod;
    if (paymentMethod.paymentMethod.type === 'zip') {
      paymentMethod.paymentMethod.clickAndCollect = paymentsConfig.paymentMethod.clickAndCollect;
    }

    const paymentRequest = {
      ...paymentsConfig,
      ...paymentMethod,
    };

    if (includeDeliveryAddress === false) {
      paymentRequest.shopperName = null;
      paymentRequest.deliveryAddress = null;
    }

    paymentRequest.additionalData = {};
    paymentRequest.additionalData = {
      'riskdata.basket.item1.itemID': '001',
      'riskdata.basket.item1.productTitle': 'Product',
      'riskdata.basket.item1.currency': 'AUD',
      'riskdata.basket.item1.amountPerItem': paymentsConfig.amount.value,
      'riskdata.basket.item1.quantity': 1
    };

    if (native3ds2 === true) {
      paymentRequest.additionalData.allow3DS2 = true;
    }

    const threeDSAuthenticationOnlyField = document.querySelector('#threeDSAuthenticationOnly');
    if (threeDSAuthenticationOnlyField) {
      const threeDSAuthenticationOnly = threeDSAuthenticationOnlyField.checked;
      if (threeDSAuthenticationOnly) {
        paymentRequest.threeDSAuthenticationOnly = threeDSAuthenticationOnly;
      }
    }

    const captureDelayHoursField = document.querySelector('#captureDelayHours');
    if (captureDelayHoursField) {
      const captureDelayHours = captureDelayHoursField.value;
      if (captureDelayHours) {
        paymentRequest.captureDelayHours = parseInt(captureDelayHours, 10);
      }
    }

    const enableOneClickField = document.querySelector('#enableOneClick');
    if (enableOneClickField) {
      const enableOneClick = enableOneClickField.checked;
      if (enableOneClick) {
        paymentRequest.enableOneClick = enableOneClick;
      }
    }

    const storeField = document.querySelector('#store');
    if (storeField) {
      const store = storeField.value;
      if (store) {
        paymentRequest.store = store;
      }
    }

    if (paymentRequest.clientStateDataIndicator) {
      delete paymentRequest.clientStateDataIndicator;
    }

    updateRequestContainer('/payments', paymentRequest);

    return httpPost('payments', paymentRequest)
      .then((response) => {
        if (response.error) {
          console.error('Payment initiation failed');
        }

        updateResponseContainer('/payments', response);
        return response;
      });
  });

const defaultLocaleConfig = async () => {
  if (!document.querySelector('#locale').value) {
    document.querySelector('#locale').value = await httpGet('env', 'SHOPPER_LOCALE');
  }

  if (!document.querySelector('#countryCode').value) {
    document.querySelector('#countryCode').value = await httpGet('env', 'COUNTRY');
  }

  if (!document.querySelector('#currency').value) {
    document.querySelector('#currency').value = await httpGet('env', 'CURRENCY');
  }

  if (!document.querySelector('#value').value) {
    document.querySelector('#value').value = await httpGet('env', 'VALUE');
  }
};

const collectLocaleConfig = function collectLocaleConfig() {
  const localeConfig = { amount: {} };
  localeConfig.shopperLocale = document.querySelector('#locale').value;
  localeConfig.countryCode = document.querySelector('#countryCode').value;
  localeConfig.amount.currency = document.querySelector('#currency').value;
  localeConfig.amount.value = parseInt(document.querySelector('#value').value, 10);
  return localeConfig;
};

const submitAdditionalDetails = (additionalDetailsRequest, config = {}) => {
  updateRequestContainer('/payments/details', additionalDetailsRequest);

  return httpPost('paymentDetails', additionalDetailsRequest)
    .then((response) => {
      if (response.error) {
        console.error('Payment details submission failed');
      }

      updateResponseContainer('/payments/details', response);
      return response;
    });
};

const subscribeToWebhooks = async () => {
  const webhookRelayKey = await httpGet('env', 'WEBHOOKRELAY_KEY');
  if (webhookRelayKey !== '') {
    const client = new WebSocket('wss://my.webhookrelay.com/v1/socket');
    const webhookRelaySecret = await httpGet('env', 'WEBHOOKRELAY_SERCRET');
    const webhookRelayBucket = await httpGet('env', 'WEBHOOKRELAY_BUCKET');

    client.onopen = () => {
      console.log('WebSocket Client Connected');
      client.send(
        JSON.stringify({
          action: 'auth',
          key: webhookRelayKey,
          secret: webhookRelaySecret,
        }),
      );
    };

    client.onmessage = (message) => {
      console.log(message);
      const jsonData = JSON.parse(message.data);
      if (jsonData.status === 'authenticated') {
        console.log('Authenticated, subscribing to bucket...');
        client.send(
          JSON.stringify({
            action: 'subscribe',
            buckets: ['demo'],
          }),
        );
      }

      if (jsonData.type === 'webhook') {
        console.log('Got webhook...');
        console.log(jsonData.body);
        updateResponseContainer(
          'Webhook Notification',
          JSON.parse(jsonData.body),
        );
      }
    };
  } else {
    const refreshWebookMessages = function refreshWebookMessages() {
        console.log('Polling for new webhook response...');
        fetch('/server/webhook/poll.php', { headers: { 'Content-Type': 'application/json; charset=utf-8' }})
          .then(response => response.text())
          .then(response => {
            if (response) {
              console.log('Got webhook...');
              console.log(response);
              updateResponseContainer(
                'Webhook Notification',
                JSON.parse(response)
              );
            }
          })
          .catch(err => {
              console.log('Error retrieving webhook', err)
          });

        setTimeout(refreshWebookMessages, 3000);
    }

    setTimeout(refreshWebookMessages, 3000);
  }
};

subscribeToWebhooks();

const reloadButton = document.querySelector('#toggles #reload');
if (reloadButton) {
  reloadButton.addEventListener('click', () => {
    reload();
  });
}
