const sidebar = document.querySelector('.sidebar');
const stateContainer = document.querySelector('.current-state');

// Demo - Update current component state container
function updateStateContainer(newState) {
    stateContainer.innerText = JSON.stringify(newState, null, 2);
}

// Demo - Update request container
function updateRequestContainer(name, response) {
  let formattedJson = JSON.stringify(response, null, 2);
  sidebar.insertAdjacentHTML('beforeend',
    `<div class="request-container request-container--visible">
        <div class="header">
            <h2>${name} Request</h2>
        </div>
        <pre class="request-code">${formattedJson}</pre>
    </div>
  `);
  sidebar.scrollTop = sidebar.scrollHeight;
}

// Demo - Update server response container
function updateResponseContainer(name, response) {
  let formattedJson = JSON.stringify(response, null, 2);
  sidebar.insertAdjacentHTML('beforeend',
    `<div class="response-container response-container--visible">
        <div class="header">
            <h2>${name} Response</h2>
        </div>
        <pre class="response-code">${formattedJson}</pre>
    </div>
  `);
  sidebar.scrollTop = sidebar.scrollHeight;
}

let clearRequests = function clearRequests() {
  var requestContainers = document.getElementsByClassName('request-container');
  while(requestContainers[0]) {
      requestContainers[0].parentNode.removeChild(requestContainers[0]);
  }

  var responseContainers = document.getElementsByClassName('response-container');
  while(responseContainers[0]) {
      responseContainers[0].parentNode.removeChild(responseContainers[0]);
  }

  var resultContainers = document.getElementsByClassName('result-container');
  while(resultContainers[0]) {
      resultContainers[0].parentNode.removeChild(resultContainers[0]);
  }
}

function updateResultContainer(response) {
  sidebar.insertAdjacentHTML('beforeend',
    `<div class="result-container result-container--visible">
        <div class="header">
            <h2>Result</h2>
        </div>
        <p class="result-code">${response}</p>
    </div>
  `);
  sidebar.scrollTop = sidebar.scrollHeight;
}

// Demo - Copy Source Code Examples
document.querySelectorAll('.copy-sample-code').forEach(c => {
    c.addEventListener('click', () => {
        const code = document.querySelector('.source-code');
        const range = document.createRange();
        range.selectNode(code);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        c.classList.add('copy-sample-code--active');

        setTimeout(() => {
            c.classList.remove('copy-sample-code--active');
        }, 1000);
    });
});
