const getConfig = async () => {
  const config = { };
  config.environment = await httpGet('env', 'ENVIRONMENT');
  config.clientKey = await httpGet('env', 'CHECKOUT_CLIENTKEY');
  return config;
};

let sepa;

const loadComponent = function loadComponent() {
  defaultLocaleConfig().then(() => {
    const localeConfig = collectLocaleConfig();
    getConfig().then((config) => {
      getPaymentMethods(localeConfig).then((paymentMethodsResponse) => {
        (async function(){
          const checkout = await AdyenCheckout({
            environment: config.environment,
            clientKey: config.clientKey,
            paymentMethodsResponse: paymentMethodsResponse,
            locale: localeConfig.locale,
            onChange: (state, component) => {
              updateStateContainer(state);
            },
          });

          sepa = checkout
            .create('sepadirectdebit', {
              amount: localeConfig.amount,
              showPayButton: true,
              countryCode: localeConfig.countryCode,
              placeholders: {
                // Optional. Overwriting the default placeholders
                // ownerName: '',
                // ibanNumber: ''
              },

              onSubmit: (state, component) => {
                makePayment(localeConfig, state.data).then((response) => {
                  if (response.action) {
                    sepa.handleAction(response.action);
                  } else if (response.resultCode) {
                    updateResultContainer(response.resultCode);
                    if (sepa !== undefined) {
                      sepa.unmount('#sepa-container');
                    }
                  } else if (response.message) {
                    updateResultContainer(response.message);
                    if (sepa !== undefined) {
                      sepa.unmount('#sepa-container');
                    }
                  }
                });
              },
            })
            .mount('#sepa-container');
        })()
      });
    });
  });
};

loadComponent();

const reload = function reload() {
  if (sepa !== undefined) {
    sepa.unmount('#sepa-container');
  }

  clearRequests();
  loadComponent();
};
