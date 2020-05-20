const getConfig = async () => {
  const config = { paypalConfig: { amount: {} } };
  config.locale = await httpGet('env', 'SHOPPER_LOCALE');
  config.environment = await httpGet('env', 'ENVIRONMENT');

  config.includeDeliveryAddress = document.querySelector('#includeDeliveryAddress').checked;

  config.paypalConfig.environment = await httpGet('env', 'ENVIRONMENT');
  config.paypalConfig.merchantId = await httpGet('env', 'PAYPAL_MERCHANT_ID');
  config.paypalConfig.countryCode = await httpGet('env', 'COUNTRY');
  config.paypalConfig.amount.currency = await httpGet('env', 'CURRENCY');
  config.paypalConfig.amount.value = await httpGet('env', 'VALUE');
  config.paypalConfig.intent = await httpGet('env', 'PAYPAL_INTENT');
  return config;
};

let paypalComponent;

const loadComponent = function loadComponent() {
  getConfig().then((config) => {
    getOriginKey().then((originKey) => {
      const checkout = new AdyenCheckout({
        environment: config.environment,
        originKey,
        locale: config.locale,
      });

      paypalComponent = checkout
        .create('paypal', {
          ...config.paypalConfig,
          onSelect: (activeComponent) => {
            updateStateContainer(activeComponent.data);
          },
          onChange: (state) => {
            updateStateContainer(state);
          },
          onSubmit: (state, component) => {
            makePayment(state.data, {}, config.includeDeliveryAddress)
              .then((response) => {
                if (response.action) {
                  component.handleAction(response.action);
                } else if (response.resultCode) {
                  updateResultContainer(response.resultCode);
                } else if (response.message) {
                  updateResultContainer(response.message);
                }
              })
              .catch((error) => {
                throw Error(error);
              });
          },
          onAdditionalDetails: (state, component) => {
            submitAdditionalDetails(state.data).then((result) => {
              updateResultContainer(result.resultCode);
              paypalComponent.unmount('#paypal-container');
            });
          },
          onCancel: (data, component) => {
            component.setStatus('ready');
          },
          onError: (error, component) => {
            component.setStatus('ready');
          },
        })
        .mount('#paypal-container');
    });
  });
};

loadComponent();

const reloadComponent = function reloadComponent() {
  paypalComponent.unmount('#paypal-container');
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
