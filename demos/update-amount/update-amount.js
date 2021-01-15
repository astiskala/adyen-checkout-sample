const getConfig = async () => {
  const config = {
    cardConfig: { data: { billingAddress: {} } },
    applepayConfig: { },
    paypalConfig: { environment: 'test', amount: {} },
    paymentMethod: {},
  };

  config.environment = await httpGet('env', 'ENVIRONMENT');
  config.clientKey = await httpGet('env', 'CHECKOUT_CLIENTKEY');

  return config;
};

let dropin;

const loadDropIn = function loadDropIn() {
  defaultLocaleConfig().then(() => {
    const localeConfig = collectLocaleConfig();
    getConfig().then((config) => {
      getPaymentMethods(localeConfig).then((paymentMethodsResponse) => {
        const checkout = new AdyenCheckout({
          environment: config.environment,
          clientKey: config.clientKey,
          paymentMethodsResponse: paymentMethodsResponse,
          locale: localeConfig.locale,
        });

        const paymentMethodsConfiguration = {
          applepay: config.applepayConfig,
          paypal: config.paypalConfig,
          card: config.cardConfig,
        };

        paymentMethodsConfiguration.applepay.amount = localeConfig.amount.value;
        paymentMethodsConfiguration.applepay.currencyCode = localeConfig.amount.currency;
        paymentMethodsConfiguration.applepay.countryCode = localeConfig.countryCode;

        paymentMethodsConfiguration.paypal.countryCode = localeConfig.countryCode;
        paymentMethodsConfiguration.paypal.amount = localeConfig.amount;

        dropin = checkout
          .create('dropin', {
            paymentMethodsConfiguration,
            amount: localeConfig.amount,
            onError: (state, component) => {
              console.log('onError', state);
            },
          })
          .mount('#dropin-container');
      });
    });
  });
};

loadDropIn();

const updateAmount = function updateAmount() {
  var newAmount = document.querySelector('#newAmount').value;
  var configuration = dropin.props;
  configuration.amount.value = newAmount;
  configuration.paymentMethodsConfiguration.applepay.amount = newAmount;
  configuration.paymentMethodsConfiguration.paypal.amount = newAmount;
  dropin.update(configuration);
};
