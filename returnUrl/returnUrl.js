const queryStringToObject = (queryString) => {
  const obj = {};
  if (queryString) {
    queryString.split('&').map((item) => {
      const [k, v] = item.split('=');
      if (v) {
        obj[k] = decodeURIComponent(v);
      }
    });
  }

  return obj;
};

const handlePostback = function handlePostback(paymentData, postData) {
  updateResponseContainer('Postback', postData);

  const details = queryStringToObject(postData);
  var paymentDetails = { details };
  if (paymentData !== "") {
    paymentDetails = { paymentData, details };
  }

  submitAdditionalDetails(paymentDetails).then((result) => {
    if (result.resultCode) {
      updateResultContainer(result.resultCode);
    } else if (result.message) {
      updateResultContainer(result.message);
    }
  });
};
