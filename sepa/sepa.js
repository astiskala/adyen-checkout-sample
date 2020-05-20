const checkout = new AdyenCheckout({
  environment: 'test',
  onChange: (state, component) => {
    updateStateContainer(state);
  },
});

const sepa = checkout
  .create('sepadirectdebit', {
    showPayButton: true,
    countryCode: 'NL', // Optional. Sets the default country of the IBAN Placeholder
    placeholders: {
      // Optional. Overwriting the default placeholders
      // ownerName: '',
      // ibanNumber: ''
    },

    onSubmit: (state, component) => {
      makePayment(state.data);
    },
  })
  .mount('#sepa-container');
