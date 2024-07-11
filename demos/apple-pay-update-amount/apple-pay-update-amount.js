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

let applePayComponent;

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

        (async function(){
          const checkout = await AdyenCheckout({
            environment: config.environment,
            clientKey: config.clientKey,
            paymentMethodsResponse: paymentMethodsResponse,
            paymentMethodsConfiguration: paymentMethodsConfiguration,
            locale: localeConfig.locale,
            amount: localeConfig.amount,
          });

          const applePayConfiguration = {
            onPaymentMethodSelected: (event) => {
              const paymentMethodNetwork = event.paymentMethod.network;
              const paymentMethodType = event.paymentMethod.type;
          
              // Logging or using the extracted details
              console.log('Selected scheme: ', paymentMethodNetwork);
              console.log('Selected funding source: ', paymentMethodType);

              applePayContainer.innerText = 'Selected scheme: ' + paymentMethodNetwork + ', Selected funding source: ' + paymentMethodType;
            }
          };

          applePayComponent = checkout.create('applepay', applePayConfiguration);
          applePayComponent
            .isAvailable()
            .then(() => {
                applePayComponent.mount("#applepay-container");
            })
            .catch(e => {
              const applePayContainer = document.querySelector('#applepay-container');
              applePayContainer.innerText = "Apple Pay is not supported on this device/browser";
            })
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
