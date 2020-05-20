const getConfig = async () => {
  const config = { bancontactConfig: { amount: {} } };
  config.locale = await httpGet('env', 'SHOPPER_LOCALE');
  config.environment = await httpGet('env', 'ENVIRONMENT');
  config.country = await httpGet('env', 'COUNTRY');

  config.bancontactConfig.amount.currency = await httpGet('env', 'CURRENCY');
  config.bancontactConfig.amount.value = await httpGet('env', 'VALUE');
  return config;
};

let bancontactComponent;

const loadComponent = function loadComponent() {
  getConfig().then((config) => {
    getOriginKey().then((originKey) => {
      const checkout = new AdyenCheckout({
        originKey,
        environment: config.environment,
        amount: config.bancontactConfig.amount,
        locale: config.locale,
        onAdditionalDetails: (result) => {
          console.log(result);
        },
        onError: (error) => {
          console.log(error);
        },
      });

      const bancontactData = {
        countryCode: config.country,
        amount: config.bancontactConfig.amount,
        paymentMethod: {
          type: 'bcmc_mobile_QR',
        },
      };

      /** Call the /payments endpoint to retrieve the data to start the Bancontact component
       *  We need the following parts of the response
       *  - qrCodeData (redirect.data.qrCodeData): The data the QR Code will contain
       *  - paymentData Necessary to communicate with Adyen to check the current payment status
       */
      makePayment(bancontactData).then((response) => {
        if (response.action) {
          bancontactComponent = checkout
            .createFromAction(response.action)
            .mount('#bancontact-container');
        }
      });
    });
  });
};

loadComponent();

const reloadComponent = function reloadComponent() {
  bancontactComponent.unmount('#bancontact-container');
  clearRequests();
  loadComponent();
};

const addReloadEventListener = function addReloadEventListener(element) {
  element.addEventListener('change', () => {
    reloadComponent();
  });
};

const componentToggles = document.querySelectorAll('#toggles input');
componentToggles.forEach(addReloadEventListener);
