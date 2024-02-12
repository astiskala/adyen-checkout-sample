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

  if (details.sessionId && details.sessionResult) {
    submitSessionResult(details.sessionId, details.sessionResult).then((result) => {
      if (result.status) {
        updateResultContainer(result.status);
      } else {
        updateResultContainer(result);
      }
    });
  } else {
    submitAdditionalDetails(paymentDetails).then((result) => {
      if (result.resultCode) {
        updateResultContainer(result.resultCode);
      } else if (result.message) {
        updateResultContainer(result.message);
      }
    });
  }
};
