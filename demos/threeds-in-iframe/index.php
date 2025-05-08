<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Adyen Checkout samples - Iframe Form Post</title>
    <link rel="stylesheet" href="../../assets/style.css"> <style>
        .main {
            width: 100%;
        }
        /* Styles from previous version, ensure they are within .checkout-container or apply as needed */
        .checkout-container form div { /* More specific selector if needed */
            margin-bottom: 15px;
        }
        .checkout-container label { /* More specific selector if needed */
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        .checkout-container input[type="text"],
        .checkout-container input[type="url"] { /* More specific selector if needed */
            width: calc(100% - 22px); /* Account for padding/border */
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        .checkout-container button { /* More specific selector if needed */
            padding: 10px 15px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 5px;
        }
        .checkout-container button:hover { /* More specific selector if needed */
            background-color: #0056b3;
        }
        .checkout-container iframe { /* More specific selector if needed */
            margin-top: 20px;
            border: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <div class="container container--full-width">
        <div class="main"> <a href="../../">Back</a>
            <div class="checkout-container"> <h1>3DS in iframe</h1>
                <form id="dataForm" method="POST" target="targetIframeName">
                    <div>
                        <label for="urlInput">URL for POST:</label>
                        <input type="url" id="urlInput" placeholder="https://target.example.com/submit" required>
                    </div>
                    <hr>
                    <p>The following fields will be POSTed to the URL above, and the response shown in the iframe:</p>
                    <div>
                        <label for="mdInput">MD:</label>
                        <input type="text" id="mdInput" name="MD" placeholder="Enter MD value">
                    </div>
                    <div>
                        <label for="paReqInput">PaReq:</label>
                        <input type="text" id="paReqInput" name="PaReq" placeholder="Enter PaReq value">
                    </div>
                    <button type="submit">POST Data to URL and Load in Iframe</button>
                </form>

                <iframe id="targetIframe" name="targetIframeName" src="about:blank" width="500px" height="600px">
                    Your browser does not support iframes.
                </iframe>
            </div>
        </div>
    </div>

    <script>
        document.getElementById('dataForm').addEventListener('submit', function(event) {
            const form = event.target; // The form element
            const urlValue = document.getElementById('urlInput').value;

            if (urlValue) {
                try {
                    // Validate the URL (throws an error if invalid)
                    new URL(urlValue);
                    // Set the form's action attribute dynamically
                    form.action = urlValue;
                    console.log('Form action dynamically set to: ' + urlValue + '. Submitting form to target iframe.');
                    // Allow the native form submission to proceed with the new action.
                    // The response will be targeted to the iframe.
                } catch (e) {
                    event.preventDefault(); // Prevent submission if URL is invalid
                    alert('Please enter a valid URL.');
                    console.error('Invalid URL, submission prevented:', urlValue, e);
                }
            } else {
                event.preventDefault(); // Prevent submission if URL is empty (though 'required' attribute should catch this)
                alert('Please enter a URL for the form submission.');
                console.error('URL is empty, submission prevented.');
            }
        });
    </script>
</body>
</html>