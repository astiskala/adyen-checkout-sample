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

        (async function(){
          const checkout = await AdyenCheckout({
            environment: config.environment,
            clientKey: config.clientKey,
            paymentMethodsResponse: paymentMethodsResponse,
            paymentMethodsConfiguration: paymentMethodsConfiguration,
            locale: localeConfig.locale,
          });

          dropin = checkout
            .create('dropin', {
              amount: localeConfig.amount,
              onError: (state, component) => {
                console.log('onError', state);
              },
            })
            .mount('#dropin-container');
        })()
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
