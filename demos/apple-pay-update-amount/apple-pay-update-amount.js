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

const loadApplePayComponent = function loadApplePayComponent() {
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
            onPaymentMethodSelected: (resolve, reject, event) => {
              const paymentMethodNetwork = event.paymentMethod.network;
              const paymentMethodType = event.paymentMethod.type;
          
              // Logging or using the extracted details
              console.log('Selected scheme: ', paymentMethodNetwork);
              console.log('Selected funding source: ', paymentMethodType);

              let oldMinorUnitsAmount = localeConfig.amount;
              let newAmount = oldMinorUnitsAmount;
              switch (paymentMethodNetwork) {
                case "amex":
                  newAmount = oldMinorUnitsAmount * 1.05;
                  break;
                case "eftpos":
                  newAmount = oldMinorUnitsAmount * 1.01;
                  break;
                case "masterCard":
                  if (paymentMethodType === "credit") {
                    newAmount = oldMinorUnitsAmount * 1.03;
                  } else {
                    newAmount = oldMinorUnitsAmount * 1.01;
                  }

                  break;
                case "visa":
                  if (paymentMethodType === "credit") {
                    newAmount = oldMinorUnitsAmount * 1.03;
                  } else {
                    newAmount = oldMinorUnitsAmount * 1.01;
                  }

                  break;
              }

              amount = newAmount / 100

              applePayContainer.innerText = 'Selected scheme: ' + paymentMethodNetwork + ', Selected funding source: ' + paymentMethodType + ', New amount: ' + amount;

              const ApplePayPaymentMethodUpdate = {
                newTotal: {
                  amount,
                  label: "Total with Surcharge",
                  type: "final"
                }
              }
          
              resolve(ApplePayPaymentMethodUpdate)
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

loadApplePayComponent();