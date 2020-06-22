const getConfig = async () => {
  const config = { };
  config.environment = await httpGet('env', 'ENVIRONMENT');
  return config;
};

let multibanco;

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

            onSubmit: (state, component) => {
              makePayment(localeConfig, state.data).then((response) => {
                if (response.action) {
                  multibanco = checkout
                    .createFromAction(response.action)
                    .mount('#multibanco-container');
                } else if (response.resultCode) {
                  updateResultContainer(response.resultCode);
                  if (multibanco !== undefined) {
                    multibanco.unmount('#multibanco-container');
                  }
                } else if (response.message) {
                  updateResultContainer(response.message);
                  if (multibanco !== undefined) {
                    multibanco.unmount('#multibanco-container');
                  }
                }
              });
            },
            paymentMethodsResponse,
          });

          multibanco = checkout.create('multibanco').mount('#multibanco-container');
        });
      });
    });
  });
};

loadComponent();

const reload = function reload() {
  if (multibanco !== undefined) {
    multibanco.unmount('#multibanco-container');
  }

  clearRequests();
  loadComponent();
};
