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
    config.amount.currency = await httpGet('env', 'CURRENCY');
    config.amount.value = await httpGet('env', 'VALUE');
    return config;
};

const getPaymentsDefaultConfig = async() => {
    let config = {
        channel: 'Web',
        amount: {},
        lineItems: []
    };
    config.merchantAccount = await httpGet('env', 'MERCHANT_ACCOUNT');
    config.reference = await httpGet('env', 'REFERENCE');
    config.shopperReference = await httpGet('env', 'SHOPPER_REFERENCE');
    config.countryCode = await httpGet('env', 'COUNTRY');
    config.amount.currency = await httpGet('env', 'CURRENCY');
    config.amount.value = await httpGet('env', 'VALUE');
    config.returnUrl = window.location.href;
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
const makePayment = (paymentMethod, config = {}) => {
  return getPaymentsDefaultConfig().then(paymentsDefaultConfig => {
    const paymentsConfig = {
        ...paymentsDefaultConfig,
        ...config
    };
    const paymentRequest = {
        ...paymentsConfig,
        ...paymentMethod
    };

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

// Fetches an originKey from the local server
const getOriginKey = () =>
    httpPost('originKeys')
    .then(response => {
        if (response.error || !response.originKeys) throw 'No originKey available';

        return response.originKeys[Object.keys(response.originKeys)[0]];
    })
    .catch(console.error);
