const getConfig = async () => {
  const config = { boletobancarioConfig: { data: { billingAddress: {} } } };
  config.environment = await httpGet('env', 'ENVIRONMENT');
  config.clientKey = await httpGet('env', 'CHECKOUT_CLIENTKEY');

  config.showPayButton = document.querySelector('#showPayButton').checked;

  config.boletobancarioConfig.personalDetailsRequired = document.querySelector('#personalDetailsRequired').checked;
  config.boletobancarioConfig.billingAddressRequired = document.querySelector('#billingAddressRequired').checked;
  config.boletobancarioConfig.showEmailAddress = document.querySelector('#showEmailAddress').checked;

  config.boletobancarioConfig.data.firstName = await httpGet('env', 'SHOPPERNAME_FIRSTNAME');
  config.boletobancarioConfig.data.lastName = await httpGet('env', 'SHOPPERNAME_LASTNAME');
  config.boletobancarioConfig.data.billingAddress.street = await httpGet('env', 'BILLING_ADDRESS_STREET');
  config.boletobancarioConfig.data.billingAddress.postalCode = await httpGet('env', 'BILLING_ADDRESS_POSTALCODE');
  config.boletobancarioConfig.data.billingAddress.city = await httpGet('env', 'BILLING_ADDRESS_CITY');
  config.boletobancarioConfig.data.billingAddress.houseNumberOrName = await httpGet('env', 'BILLING_ADDRESS_HOUSENUMBERORNAME');
  config.boletobancarioConfig.data.billingAddress.country = await httpGet('env', 'BILLING_ADDRESS_COUNTRY');
  config.boletobancarioConfig.data.billingAddress.stateOrProvince = await httpGet('env', 'BILLING_ADDRESS_STATEORPROVINCE');
  config.boletobancarioConfig.data.shopperEmail = await httpGet('env', 'SHOPPER_EMAIL');
  return config;
};

let boletoComponent;
let boletoVoucher;

const loadComponent = function loadComponent() {
  defaultLocaleConfig().then(() => {
    const localeConfig = collectLocaleConfig();
    getConfig().then((config) => {
      getPaymentMethods(localeConfig).then((paymentMethodsResponse) => {
        const checkout = new AdyenCheckout({
          environment: config.environment,
          clientKey: config.clientKey,
          paymentMethodsResponse: paymentMethodsResponse,
          locale: localeConfig.locale,
          amount: localeConfig.amount,
          showPayButton: config.showPayButton,
          onSubmit: (state, component) => {
            makePayment(localeConfig, state.data).then((paymentResponse) => {
              if (response.action) {
                boletoVoucher = checkout
                  .createFromAction(paymentResponse.action)
                  .mount('#boletobancario-result-container');
              } else if (response.resultCode) {
                updateResultContainer(response.resultCode);
                if (boletoComponent !== undefined) {
                  boletoComponent.unmount('#boletobancario-container');
                }
              } else if (response.message) {
                updateResultContainer(response.message);
                if (boletoComponent !== undefined) {
                  boletoComponent.unmount('#boletobancario-container');
                }
              }
            });
          },
          onChange: (state, component) => {
            updateStateContainer(state);
          },
        });

        boletoComponent = checkout
          .create('boletobancario', {
            personalDetailsRequired: config.boletobancarioConfig.personalDetailsRequired,
            billingAddressRequired: config.boletobancarioConfig.billingAddressRequired,
            showEmailAddress: config.boletobancarioConfig.showEmailAddress,
            data: config.boletobancarioConfig.data,
          })
          .mount('#boletobancario-container');
      });
    });
  });
};

loadComponent();

const reload = function reload() {
  if (boletoComponent !== undefined) {
    boletoComponent.unmount('#boletobancario-container');
  }

  if (boletoVoucher !== undefined) {
    boletoVoucher.unmount('#boletobancario-result-container');
  }

  clearRequests();
  loadComponent();
};
