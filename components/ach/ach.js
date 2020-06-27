const getConfig = async () => {
  const config = { achConfig: { data: { billingAddress: {} } } };
  config.environment = await httpGet('env', 'ENVIRONMENT');

  config.hasHolderName = document.querySelector('#hasHolderName').checked;
  config.showPayButton = document.querySelector('#showPayButton').checked;

  config.achConfig.data.holderName = await httpGet('env', 'CARD_HOLDERNAME');
  config.achConfig.data.billingAddress.street = await httpGet('env', 'BILLING_ADDRESS_STREET');
  config.achConfig.data.billingAddress.postalCode = await httpGet('env', 'BILLING_ADDRESS_POSTALCODE');
  config.achConfig.data.billingAddress.city = await httpGet('env', 'BILLING_ADDRESS_CITY');
  config.achConfig.data.billingAddress.houseNumberOrName = await httpGet('env', 'BILLING_ADDRESS_HOUSENUMBERORNAME');
  config.achConfig.data.billingAddress.country = await httpGet('env', 'BILLING_ADDRESS_COUNTRY');
  config.achConfig.data.billingAddress.stateOrProvince = await httpGet('env', 'BILLING_ADDRESS_STATEORPROVINCE');

  return config;
};

let achComponent;

const loadComponent = function loadComponent() {
  defaultLocaleConfig().then(() => {
    const localeConfig = collectLocaleConfig();
    getConfig().then((config) => {
      getOriginKey().then((originKey) => {
        getPaymentMethods(localeConfig).then((paymentMethodsResponse) => {
          const checkout = new AdyenCheckout({
            environment: config.environment,
            originKey,
            paymentMethodsResponse,
            locale: localeConfig.locale,
          });

          achComponent = checkout
            .create('ach', {
              hasHolderName: config.hasHolderName,
              amount: localeConfig.amount,
              showPayButton: config.showPayButton,
              data: config.achConfig.data,

              onSubmit: (state, component) => {
                if (state.isValid) {
                  // ACH only works in US or PR, with payment in USD
                  const additionalConfig = {
                    countryCode: state.data.billingAddress.country,
                    amount: localeConfig.amount,
                  };

                  makePayment(localeConfig, achComponent.data, additionalConfig)
                    .then((response) => {
                      if (response.resultCode) {
                        updateResultContainer(response.resultCode);
                        if (achComponent !== undefined) {
                          achComponent.unmount('#ach-container');
                        }
                      } else if (response.message) {
                        updateResultContainer(response.message);
                        if (achComponent !== undefined) {
                          achComponent.unmount('#ach-container');
                        }
                      }
                    });
                }
              },

              onChange: (state, component) => {
                updateStateContainer(state);
              },
            })
            .mount('#ach-container');
        });
      });
    });
  });
};

loadComponent();

const reload = function reload() {
  if (achComponent !== undefined) {
    achComponent.unmount('#ach-container');
  }

  clearRequests();
  loadComponent();
};
