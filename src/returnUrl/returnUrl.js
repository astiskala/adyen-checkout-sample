let handlePostback = function handlePostback(data) {
  updateResponseContainer('Postback', data);
  if (data.startsWith("MD=")) {
     updateResultContainer('3DS2 Successful');
  } else {
    submitAdditionalDetails(data)
      .then(result => {
         updateResultContainer(result.resultCode);
      });
  }
};
