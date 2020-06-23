const getConfig = async () => {
  const config = {
    googlePayConfig: {
      configuration: { merchantName: 'THIS IS AN EXAMPLE' },
    },
  };

  config.environment = await httpGet('env', 'ENVIRONMENT');

  const adyenEnvironment = await httpGet('env', 'ENVIRONMENT');
  if (adyenEnvironment === 'test') {
    config.googlePayConfig.environment = 'TEST';
  } else if (adyenEnvironment === 'live') {
    config.googlePayConfig.environment = 'PRODUCTION';
  }

  config.googlePayConfig.configuration.gatewayMerchantId = await httpGet(
    'env',
    'MERCHANT_ACCOUNT',
  );

  return config;
};

let googlepayComponent;

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

          const googlePayConfig = config.googlePayConfig;
          googlePayConfig.amount = localeConfig.amount;

          googlepayComponent = checkout
            .create('paywithgoogle', {
              amount: localeConfig.amount,
              showPayButton: true,
              ...googlePayConfig,

              onSubmit: (state, component) => {
                makePayment(localeConfig, state.data).then((response) => {
                  if (response.resultCode) {
                    updateResultContainer(response.resultCode);
                    if (googlepayComponent !== undefined) {
                      googlepayComponent.unmount('#googlepay-container');
                    }
                  } else if (response.message) {
                    updateResultContainer(response.message);
                    if (googlepayComponent !== undefined) {
                      googlepayComponent.unmount('#googlepay-container');
                    }
                  }
                });
              },
              onChange: (state, component) => {
                updateStateContainer(state);
              }
            })
            // Normally, you should check if Google Pay is available before mounting it.
            // Here we are mounting it directly for demo purposes.
            // Please refer to the documentation for more information on Google Pay's availability.
            .mount('#googlepay-container');
        });
      });
    });
  });
};

loadComponent();

const reload = function reload() {
  if (googlepayComponent !== undefined) {
    googlepayComponent.unmount('#googlepay-container');
  }

  clearRequests();
  loadComponent();
};
