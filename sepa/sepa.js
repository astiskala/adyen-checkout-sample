const getConfig = async () => {
  const config = { };
  config.environment = await httpGet('env', 'ENVIRONMENT');
  return config;
};

let sepa;

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
            onChange: (state, component) => {
              updateStateContainer(state);
            },
          });

          sepa = checkout
            .create('sepadirectdebit', {
              showPayButton: true,
              countryCode: localeConfig.countryCode,
              placeholders: {
                // Optional. Overwriting the default placeholders
                // ownerName: '',
                // ibanNumber: ''
              },

              onSubmit: (state, component) => {
                makePayment(state.data);
              },
            })
            .mount('#sepa-container');
          });
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
