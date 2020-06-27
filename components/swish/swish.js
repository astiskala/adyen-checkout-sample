const getConfig = async () => {
  const config = { };
  config.environment = await httpGet('env', 'ENVIRONMENT');
  return config;
};

let swish;

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

          const swishData = {
            paymentMethod: {
              type: 'swish',
            },
            countryCode: localeConfig.countryCode,
          };

          makePayment(localeConfig, swishData).then((response) => {
            if (response.action) {
              swish = checkout.createFromAction(response.action).mount('#swish-container');
            } else if (response.resultCode) {
              updateResultContainer(response.resultCode);
              if (swish !== undefined) {
                swish.unmount('#swish-container');
              }
            } else if (response.message) {
              updateResultContainer(response.message);
              if (swish !== undefined) {
                swish.unmount('#swish-container');
              }
            }
          });
        });
      });
    });
  });
};

loadComponent();

const reload = function reload() {
  if (swish !== undefined) {
    swish.unmount('#swish-container');
  }

  clearRequests();
  loadComponent();
};
