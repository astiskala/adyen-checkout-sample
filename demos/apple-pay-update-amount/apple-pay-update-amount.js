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

        (async function(){
          const checkout = await AdyenCheckout({
            environment: config.environment,
            clientKey: config.clientKey,
            paymentMethodsResponse: paymentMethodsResponse,
            locale: localeConfig.locale,
            amount: localeConfig.amount,
          });

          const applePayConfiguration = {
            onPaymentMethodSelected: (resolve, reject, event) => {
              console.log('Event: ', event);

              const paymentMethodNetwork = event.paymentMethod.network;
              const paymentMethodType = event.paymentMethod.type;
          
              console.log('Selected scheme: ', paymentMethodNetwork);
              console.log('Selected funding source: ', paymentMethodType);

              let oldMinorUnitsAmount = localeConfig.amount.value;
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
                default:
                  if (paymentMethodType === "credit") {
                    newAmount = oldMinorUnitsAmount * 1.03;
                  } else {
                    newAmount = oldMinorUnitsAmount * 1.01;
                  }

                  break;
              }

              amount = newAmount / 100
              console.log('New total: ', amount);

              const update = {
                newTotal: {
                  label: "Total with Surcharge",
                  amount: amount,
                  type: "final"
                }
              }
          
              resolve(update);
            }
          };

          applePayComponent = checkout.create('applepay', applePayConfiguration);
          applePayComponent
            .isAvailable()
            .then(() => {
                applePayComponent.mount("#applepay-container");
            })
            .catch(e => {
              document.querySelector('#applepay-container').innerText = "Apple Pay is not supported on this device/browser";
            })
        })()
      });
    });
  });
};

loadApplePayComponent();