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

          /** Call the /payments endpoint to retrieve the data to start the Bancontact component
           *  We need the following parts of the response
           *  - qrCodeData (redirect.data.qrCodeData): The data the QR Code will contain
           *  - paymentData Necessary to communicate with Adyen to check the current payment status
           */
          makePayment(localeConfig, bancontactData).then((response) => {
            if (response.action) {
              bancontactComponent = checkout
                .createFromAction(response.action)
                .mount('#bancontact-container');
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
