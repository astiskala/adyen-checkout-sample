const getConfig = async () => {
  const config = { };

  config.native3ds2 = document.querySelector('#native3ds2').checked;
  config.environment = await httpGet('env', 'ENVIRONMENT');
  config.clientKey = await httpGet('env', 'CHECKOUT_CLIENTKEY');

  return config;
};

let googlepayComponent;

const loadComponent = function loadComponent() {
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
          });

          googlepayComponent = checkout
            .create('googlepay', {
              amount: localeConfig.amount,
              showPayButton: true,

              onSubmit: (state, component) => {
                makePayment(localeConfig, state.data).then((response) => {
                  if (response.resultCode) {
                    updateResultContainer(response.resultCode);
                    if (response.action) {
                      googlepayComponent.handleAction(response.action);
                    } else if (googlepayComponent !== undefined) {
                      googlepayComponent.unmount('#googlepay-container');
                    } else if (response.message) {
                      updateResultContainer(response.message);
                      if (googlepayComponent !== undefined) {
                        googlepayComponent.unmount('#googlepay-container');
                      }
                    }
                  } 
                });
              },
              onAdditionalDetails: (state, component) => {
                console.log('onAdditionalDetails');
              },
            })
            .mount('#googlepay-container');
        })()
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
