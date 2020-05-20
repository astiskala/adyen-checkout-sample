const getConfig = async () => {
  const config = {
    googlePayConfig: {
      configuration: { merchantName: 'Adyen Test' },
      amount: {},
    },
  };
  config.locale = await httpGet('env', 'SHOPPER_LOCALE');
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
  config.googlePayConfig.amount.currency = await httpGet('env', 'CURRENCY');
  config.googlePayConfig.amount.value = await httpGet('env', 'VALUE');
  return config;
};

let googlepayComponent;

const loadComponent = function loadComponent() {
  getConfig().then((config) => {
    const checkout = new AdyenCheckout({
      environment: config.environment,
      locale: config.locale,
    });

    googlepayComponent = checkout
      .create('paywithgoogle', {
        showPayButton: true,
        ...config.googlePayConfig,

        onSubmit: (state, component) => {
          // Submit Payment
          makePayment(state.data);
          updateStateContainer(state);
        },
        onError: (error) => {
          console.error(error);
        },
      })
      // Normally, you should check if Google Pay is available before mounting it.
      // Here we are mounting it directly for demo purposes.
      // Please refer to the documentation for more information on Google Pay's availability.
      .mount('#googlepay-container');
  });
};

loadComponent();
