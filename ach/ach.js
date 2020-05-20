const getConfig = async () => {
  const config = { achConfig: { data: { billingAddress: {} }, amount: {} } };
  config.locale = await httpGet('env', 'SHOPPER_LOCALE');
  config.environment = await httpGet('env', 'ENVIRONMENT');

  config.hasHolderName = document.querySelector('#hasHolderName').checked;
  config.showPayButton = document.querySelector('#showPayButton').checked;

  config.achConfig.data.holderName = await httpGet('env', 'CARD_HOLDERNAME');
  config.achConfig.data.billingAddress.street = await httpGet('env', 'BILLING_ADDRESS_STREET');
  config.achConfig.data.billingAddress.postalCode = await httpGet('env', 'BILLING_ADDRESS_POSTALCODE');
  config.achConfig.data.billingAddress.city = await httpGet('env', 'BILLING_ADDRESS_CITY');
  config.achConfig.data.billingAddress.houseNumberOrName = await httpGet('env', 'BILLING_ADDRESS_HOUSENUMBERORNAME');
  config.achConfig.data.billingAddress.country = await httpGet('env', 'BILLING_ADDRESS_COUNTRY');
  config.achConfig.data.billingAddress.stateOrProvince = await httpGet('env', 'BILLING_ADDRESS_STATEORPROVINCE');

  config.achConfig.amount.currency = await httpGet('env', 'CURRENCY');
  config.achConfig.amount.value = await httpGet('env', 'VALUE');
  return config;
};

let achComponent;

const loadComponent = function loadComponent() {
  getConfig().then((config) => {
    getOriginKey().then((originKey) => {
      const checkout = new AdyenCheckout({
        environment: config.environment,
        originKey,
        locale: config.locale,
      });

      achComponent = checkout
        .create('ach', {
          // Optional Configuration
          hasHolderName: config.hasHolderName,

          // Optional. Customize the look and feel of the payment form
          // https://docs.adyen.com/developers/checkout/api-integration/configure-secured-fields/styling-secured-fields
          styles: {},

          // Optional. Define custom placeholders for the Ach fields
          // https://docs.adyen.com/developers/checkout/api-integration/configure-secured-fields/styling-secured-fields
          placeholders: {
            // encryptedBankAccountNumber: '9999 9999 9999 9999',
            // encryptedBankLocationId: '987654321',
          },

          showPayButton: config.showPayButton,
          data: config.achConfig.data,

          onSubmit: (state, component) => {
            if (state.isValid) {
              // ACH only works in US or PR, with payment in USD
              const additionalConfig = {
                countryCode: state.data.billingAddress.country,
                amount: config.achConfig.amount,
              };

              makePayment(achComponent.data, additionalConfig);
            }
          },

          onChange: (state, component) => {
            // state.data;
            // state.isValid;

            updateStateContainer(state);
          },
        })
        .mount('#ach-container');
    });
  });
};

loadComponent();

const reloadComponent = function reloadComponent() {
  achComponent.unmount('#ach-container');
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
