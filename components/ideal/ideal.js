const getConfig = async () => {
  const config = { };
  config.environment = await httpGet('env', 'ENVIRONMENT');
  config.clientKey = await httpGet('env', 'CHECKOUT_CLIENTKEY');
  return config;
};

let ideal;

const loadComponent = function loadComponent() {
  defaultLocaleConfig().then(() => {
    const localeConfig = collectLocaleConfig();
    getConfig().then((config) => {
      getOriginKey().then((originKey) => {
        getPaymentMethods(localeConfig).then((paymentMethodsResponse) => {
          const checkout = new AdyenCheckout({
            environment: config.environment,
            originKey: originKey,
            clientKey: config.clientKey,
            paymentMethodsResponse: paymentMethodsResponse,
            locale: localeConfig.locale,
            amount: localeConfig.amount,
            showPayButton: true,

            onSubmit: (state, component) => {
              makePayment(localeConfig, state.data).then((response) => {
                if (response.action) {
                  ideal.handleAction(response.action);
                } else if (response.resultCode) {
                  updateResultContainer(response.resultCode);
                  if (ideal !== undefined) {
                    ideal.unmount('#ideal-container');
                  }
                } else if (response.message) {
                  updateResultContainer(response.message);
                  if (ideal !== undefined) {
                    ideal.unmount('#ideal-container');
                  }
                }
              });
            },
            onChange: (state, component) => {
              updateStateContainer(state);
            },
          });

          ideal = checkout.create('ideal').mount('#ideal-container');
        });
      });
    });
  });
};

loadComponent();

const reload = function reload() {
  if (ideal !== undefined) {
    ideal.unmount('#ideal-container');
  }

  clearRequests();
  loadComponent();
};
