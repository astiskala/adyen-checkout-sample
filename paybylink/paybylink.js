const getPaymentLinkConfig = async () => {
  const config = {
    amount: {},
    shopperName: {},
    billingAddress: {},
    deliveryAddress: {},
    lineItems: [],
  };

  config.merchantAccount = await httpGet('env', 'MERCHANT_ACCOUNT');
  config.reference = await httpGet('env', 'REFERENCE');
  config.shopperReference = await httpGet('env', 'SHOPPER_REFERENCE');
  config.countryCode = await httpGet('env', 'COUNTRY');
  config.returnUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/returnUrl`;
  config.shopperEmail = await httpGet('env', 'SHOPPER_EMAIL');
  config.description = await httpGet('env', 'PAYBYLINK_DESCRIPTION');
  config.reusable = document.querySelector('#reusable').checked;
  config.storePaymentMethod = document.querySelector('#storePaymentMethod').checked;

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

  config.lineItems = [
    {
      id: '1',
      description: 'Test Item 1',
      amountExcludingTax: config.amount.value,
      amountIncludingTax: config.amount.value,
      taxAmount: 0,
      taxPercentage: 0,
      quantity: 1,
      taxCategory: 'High',
    },
  ];

  return config;
};

const createPaymentLink = function createPaymentLink() {
  getOriginKey().then((originKey) => {
    getPaymentLinkConfig().then((paymentLinkConfig) => {
      updateRequestContainer('/paymentLinks', paymentLinkConfig);

      return httpPost('paymentLinks', paymentLinkConfig)
        .then((response) => {
          if (response.error) {
            console.error('Unable to create payment link');
          }

          updateResponseContainer('/paymentLinks', response);

          const paybylinkContainer = document.querySelector('#paybylink-container');
          paybylinkContainer.innerHTML = `<a href="${response.url}" target="_blank">${response.url}</a>`;

          return response;
        });
    });
  });
};

createPaymentLink();

const recreatePaymentLink = function recreatePaymentLink() {
  clearRequests();
  createPaymentLink();
};

const addReloadEventListener = function addReloadEventListener(element) {
  element.addEventListener('change', () => {
    recreatePaymentLink();
  });
};

const toggles = document.querySelectorAll('#toggles input');
toggles.forEach(addReloadEventListener);
