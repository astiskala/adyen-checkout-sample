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
