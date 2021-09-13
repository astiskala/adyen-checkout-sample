const getConfig = async () => {
  const config = {
    cardConfig: { data: { billingAddress: {} } },
    applepayConfig: { },
    paypalConfig: { environment: 'test', amount: {} },
    paymentMethod: {},
  };

  config.environment = await httpGet('env', 'ENVIRONMENT');
  config.clientKey = await httpGet('env', 'CHECKOUT_CLIENTKEY');
  config.merchantAccount = await httpGet('env', 'MERCHANT_ACCOUNT');
  config.charityAccount = await httpGet('env', 'CHARITY_ACCOUNT');

  config.native3ds2 = document.querySelector('#native3ds2').checked;

  config.openFirstPaymentMethod = document.querySelector('#openFirstPaymentMethod').checked;
  config.openFirstStoredPaymentMethod = document.querySelector('#openFirstStoredPaymentMethod').checked;
  config.showStoredPaymentMethods = document.querySelector('#showStoredPaymentMethods').checked;
  config.showPaymentMethods = document.querySelector('#showPaymentMethods').checked;
  config.showPayButton = document.querySelector('#showPayButton').checked;

  config.cardConfig.enableStoreDetails = document.querySelector('#enableStoreDetails').checked;
  config.cardConfig.hasHolderName = document.querySelector('#hasHolderName').checked;
  config.cardConfig.holderNameRequired = document.querySelector('#holderNameRequired').checked;
  config.cardConfig.hideCVC = document.querySelector('#hideCVC').checked;
  config.cardConfig.showBrandIcon = document.querySelector('#showBrandIcon').checked;
  config.cardConfig.billingAddressRequired = document.querySelector('#billingAddressRequired').checked;
  config.cardConfig.data.holderName = await httpGet('env', 'CARD_HOLDERNAME');
  config.cardConfig.data.billingAddress.city = await httpGet('env', 'BILLING_ADDRESS_CITY');

  config.cardConfig.data.billingAddress.country = await httpGet('env', 'BILLING_ADDRESS_COUNTRY');
  config.cardConfig.data.billingAddress.houseNumberOrName = await httpGet('env', 'BILLING_ADDRESS_HOUSENUMBERORNAME');
  config.cardConfig.data.billingAddress.postalCode = await httpGet('env', 'BILLING_ADDRESS_POSTALCODE');
  config.cardConfig.data.billingAddress.stateOrProvince = await httpGet('env', 'BILLING_ADDRESS_STATEORPROVINCE');
  config.cardConfig.data.billingAddress.street = await httpGet('env', 'BILLING_ADDRESS_STREET');

  config.shopperReference = await httpGet('env', 'SHOPPER_REFERENCE');

  return config;
};

function updateDonationContainer(response) {
  console.log('Result', response);
  const donationContainer = document.querySelector('#donation-container');
  donationContainer.insertAdjacentHTML(
    'afterbegin',
    `<div class="result-code">${response}</div>`,
  );

  sidebar.scrollTop = sidebar.scrollHeight;
}

const makeDonation = function makeDonation(donation) {
  updateRequestContainer('/donations', donation);
  return httpPost('donations', donation)
    .then((response) => {
      if (response.error) {
        console.error('Donation failed');
      }

      updateResponseContainer('/donations', response);
      return response;
    });
};

let dropin;
let donation;

const getDonationConfig = function getDonationConfig(localeConfig, config, merchantReference, pspReference, donationToken, cvc) {
  const donationConfig = {
    amounts: {
      currency: localeConfig.amount.currency,
      values: [300, 500, 1000],
    },
    description: 'The Charitable Foundation is...',
    name: 'The Charitable Foundation',
    url: 'https://example.org',
    showCancelButton: true,
    onDonate: (donateState) => {
      if (donateState.isValid) {
        const donationRequest = {
          amount: donateState.data.amount,
          reference: merchantReference,
          paymentMethod: { type: "scheme" },
          donationToken: donationToken,
          donationOriginalPspReference: pspReference,
          donationAccount: config.charityAccount,
          returnUrl: "http://localhost:3000/adyengiving/",
          merchantAccount: config.merchantAccount,
          shopperInteraction: "Ecommerce"
        };

        donation.setStatus('loading');
        makeDonation(donationRequest).then((donateResponse) => {
          donation.setStatus('ready');
          if (donateResponse.response === '[donation-received]') {
            donation.setStatus('success');
          } else {
            updateDonationContainer(donateResponse.response);
          }
        });
      }
    },
    onCancel: () => {
      if (donation !== undefined) {
        donation.unmount('#donation-container');
      }
    },
  };

  return donationConfig;
};

const loadDropIn = function loadDropIn() {
  defaultLocaleConfig().then(() => {
    const localeConfig = collectLocaleConfig();
    getConfig().then((config) => {
      getPaymentMethods(localeConfig).then((paymentMethodsResponse) => {
        const checkout = new AdyenCheckout({
          environment: config.environment,
          clientKey: config.clientKey,
          paymentMethodsResponse: paymentMethodsResponse,
          locale: localeConfig.locale,
          onSubmit: (state, component) => {
            dropin.setStatus('loading');
            makePayment(localeConfig, state.data, {}, true, config.native3ds2)
              .then((response) => {
                dropin.setStatus('ready');
                if (response.action) {
                  dropin.handleAction(response.action);
                } else if (response.resultCode) {
                  dropin.setStatus('success', { message: response.resultCode });
                  if (response.resultCode === 'Authorised') {
                    const donationConfig = getDonationConfig(localeConfig, config, response.merchantReference, response.pspReference, response.donationToken, state.data.paymentMethod.encryptedSecurityCode);
                    donation = checkout.create('donation', donationConfig).mount('#donation-container');
                  }
                } else if (response.message) {
                  dropin.setStatus('success', { message: response.message });
                }
              })
              .catch((error) => {
                dropin.setStatus('ready');
                dropin.setStatus('error');
                console.log('onError', error);
              });
          },
          onAdditionalDetails: (state, component) => {
            dropin.setStatus('loading');
            submitAdditionalDetails(state.data).then((response) => {
              dropin.setStatus('ready');
              if (response.action) {
                dropin.handleAction(response.action);
              } else if (response.resultCode) {
                dropin.setStatus('success', { message: response.resultCode });
                if (response.resultCode === 'Authorised') {
                  const donationConfig = getDonationConfig(localeConfig, config, response.merchantReference, response.pspReference);
                  donation = checkout.create('donation', donationConfig).mount('#donation-container');
                }
              } else if (response.message) {
                dropin.setStatus('success', { message: response.message });
              }
            });
          },
          onError: (state, component) => {
            console.log('onError', state);
          },
          onChange: (state) => {
            console.log('onChange', state);
            updateStateContainer(state);
          },
        });

        const paymentMethodsConfiguration = {
          applepay: config.applepayConfig,
          paypal: config.paypalConfig,
          card: config.cardConfig,
        };

        paymentMethodsConfiguration.applepay.amount = localeConfig.amount.value;
        paymentMethodsConfiguration.applepay.currencyCode = localeConfig.amount.currency;
        paymentMethodsConfiguration.applepay.countryCode = localeConfig.countryCode;

        paymentMethodsConfiguration.applepay.onSubmit = (state, component) => {
          dropin.setStatus('loading');
          makePayment(localeConfig, state.data, {}, true, config.native3ds2)
            .then((response) => {
              dropin.setStatus('ready');
              if (response.action) {
                dropin.handleAction(response.action);
              } else if (response.resultCode) {
                dropin.setStatus('success', { message: response.resultCode });
              } else if (response.message) {
                dropin.setStatus('success', { message: response.message });
              }
            })
            .catch((error) => {
              dropin.setStatus('ready');
              dropin.setStatus('error');
              console.log('onError', error);
            });
        };

        paymentMethodsConfiguration.paypal.countryCode = localeConfig.countryCode;
        paymentMethodsConfiguration.paypal.amount = localeConfig.amount;

        paymentMethodsConfiguration.paypal.onCancel = (data, component) => {
          component.setStatus('ready');
        };

        paymentMethodsConfiguration.card.onBinValue = (state) => {
          console.log('onBinValue', state);
        };

        paymentMethodsConfiguration.card.onBrand = (state) => {
          console.log('onBrand', state);
        };

        dropin = checkout
          .create('dropin', {
            paymentMethodsConfiguration,
            openFirstPaymentMethod: config.openFirstPaymentMethod,
            openFirstStoredPaymentMethod: config.openFirstStoredPaymentMethod,
            showStoredPaymentMethods: config.showStoredPaymentMethods,
            showPaymentMethods: config.showPaymentMethods,
            amount: localeConfig.amount,
            showPayButton: config.showPayButton,
            onSelect: (activeComponent) => {
              console.log('onSelect', activeComponent);
              updateStateContainer(activeComponent.data);
            },
          })
          .mount('#dropin-container');
      });
    });
  });
};

loadDropIn();

const reload = function reload() {
  if (dropin !== undefined) {
    dropin.unmount('#dropin-container');
  }

  if (donation !== undefined) {
    donation.unmount('#donation-container');
  }

  clearRequests();
  loadDropIn();
};
