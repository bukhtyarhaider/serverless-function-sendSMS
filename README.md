

Serverless Function: Send SMS with Twilio [![Netlify Status](https://api.netlify.com/api/v1/badges/f5bb60d7-1ea5-49a9-af09-3025f584350a/deploy-status)](https://app.netlify.com/sites/sendsms-serverless-function/deploys)
=========================================

Overview
--------

This serverless function is designed to send SMS messages to multiple phone numbers via the Twilio API.

Dependencies
------------

The function depends on the Twilio Node.js client library:

`const twilio = require("twilio");`

Environment Variables
---------------------

The following environment variables must be set:

*   `TWILIO_ACCOUNT_SID`: Your Twilio account SID.
*   `TWILIO_AUTH_TOKEN`: Your Twilio authentication token.
*   `TWILIO_PHONE_NUMBER`: The phone number from which SMS messages will be sent.
*   `API_TOKEN`: The token to validate the incoming request.

Request Format
--------------

This function accepts POST requests with a JSON body containing the following properties:

*   `phoneNumbers`: An array of phone numbers to send the SMS to.
*   `message`: The text message to send.
*   `token`: The API token to authenticate the request.

Response Format
---------------

On successful execution, the function will return a HTTP 200 status code and a body indicating the number of phone numbers the message was sent to.

Error Handling
--------------

The function returns the following status codes and messages in the case of an error:

*   `405`: If the HTTP method is not POST.
*   `403`: If the provided API token is invalid.
*   `400`: If the message is empty or consists only of whitespace.
*   `500`: If there is an error when trying to send the SMS messages.

Support
--------------
If you encounter any problems, please open an issue or submit a pull request.
