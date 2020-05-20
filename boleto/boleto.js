const getConfig = async () => {
  const config = { boletobancarioConfig: { data: { billingAddress: {} }, amount: {} } };
  config.locale = await httpGet('env', 'SHOPPER_LOCALE');
  config.environment = await httpGet('env', 'ENVIRONMENT');

  config.showPayButton = document.querySelector('#showPayButton').checked;

  config.boletobancarioConfig.personalDetailsRequired = document.querySelector('#personalDetailsRequired').checked;
  config.boletobancarioConfig.billingAddressRequired = document.querySelector('#billingAddressRequired').checked;
  config.boletobancarioConfig.showEmailAddress = document.querySelector('#showEmailAddress').checked;

  config.boletobancarioConfig.data.firstName = await httpGet('env', 'SHOPPERNAME_FIRSTNAME');
  config.boletobancarioConfig.data.lastName = await httpGet('env', 'SHOPPERNAME_LASTNAME');
  config.boletobancarioConfig.data.billingAddress.street = await httpGet('env', 'BILLING_ADDRESS_STREET');
  config.boletobancarioConfig.data.billingAddress.postalCode = await httpGet('env', 'BILLING_ADDRESS_POSTALCODE');
  config.boletobancarioConfig.data.billingAddress.city = await httpGet('env', 'BILLING_ADDRESS_CITY');
  config.boletobancarioConfig.data.billingAddress.houseNumberOrName = await httpGet('env', 'BILLING_ADDRESS_HOUSENUMBERORNAME');
  config.boletobancarioConfig.data.billingAddress.country = await httpGet('env', 'BILLING_ADDRESS_COUNTRY');
  config.boletobancarioConfig.data.billingAddress.stateOrProvince = await httpGet('env', 'BILLING_ADDRESS_STATEORPROVINCE');
  config.boletobancarioConfig.data.shopperEmail = await httpGet('env', 'SHOPPER_EMAIL');

  config.boletobancarioConfig.amount.currency = await httpGet('env', 'CURRENCY');
  config.boletobancarioConfig.amount.value = await httpGet('env', 'VALUE');
  return config;
};

let boletoComponent;
let boletoVoucher;

const loadComponent = function loadComponent() {
  getConfig().then((config) => {
    getOriginKey().then((originKey) => {
      const checkout = new AdyenCheckout({
        environment: config.environment,
        locale: config.locale,
        showPayButton: config.showPayButton,
        onSubmit: (state, component) => {
          makePayment(state.data).then((paymentResponse) => {
            boletoVoucher = checkout
              .createFromAction(paymentResponse.action)
              .mount('#boletobancario-result-container');
          });
        },
        onChange: (state, component) => {
          updateStateContainer(state);
        },
      });

      boletoComponent = checkout
        .create('boletobancario', {
          personalDetailsRequired: config.boletobancarioConfig.personalDetailsRequired,
          billingAddressRequired: config.boletobancarioConfig.billingAddressRequired,
          showEmailAddress: config.boletobancarioConfig.showEmailAddress,
          data: config.boletobancarioConfig.data,
        })
        .mount('#boletobancario-container');
    });
  });
};

loadComponent();

const reloadComponent = function reloadComponent() {
  boletoComponent.unmount('#boletobancario-container');
  if (boletoVoucher !== undefined) {
    boletoVoucher.unmount('#boletobancario-result-container');
  }

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
