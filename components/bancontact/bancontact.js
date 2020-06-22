const getConfig = async () => {
  const config = { };
  config.environment = await httpGet('env', 'ENVIRONMENT');
  return config;
};

let bancontactComponent;

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

          const bancontactData = {
            countryCode: localeConfig.countryCode,
            amount: localeConfig.amount,
            paymentMethod: {
              type: 'bcmc_mobile_QR',
            },
          };

          makePayment(localeConfig, bancontactData).then((response) => {
            if (response.action) {
              bancontactComponent = checkout
                .createFromAction(response.action)
                .mount('#bancontact-container');
            } else if (response.resultCode) {
              updateResultContainer(response.resultCode);
              if (bancontactComponent !== undefined) {
                bancontactComponent.unmount('#bancontact-container');
              }
            } else if (response.message) {
              updateResultContainer(response.message);
              if (bancontactComponent !== undefined) {
                bancontactComponent.unmount('#bancontact-container');
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
  if (bancontactComponent !== undefined) {
    bancontactComponent.unmount('#bancontact-container');
  }

  clearRequests();
  loadComponent();
};
