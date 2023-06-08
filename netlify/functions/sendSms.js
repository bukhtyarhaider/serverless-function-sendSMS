const twilio = require("twilio");

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "Method Not Allowed",
    };
  }

  const { phoneNumbers, message, token } = JSON.parse(event.body);

  // Check if the token is valid
  if (token !== process.env.API_TOKEN) {
    return {
      statusCode: 403,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "Invalid token",
    };
  }

  // Check if message is empty
  if (!message || message.trim() === "") {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "Empty message",
    };
  }

  // Loop through phoneNumbers and send SMS
  const promises = phoneNumbers.map((phoneNumber) =>
    client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    })
  );

  try {
    const messages = await Promise.all(promises);
    messages.forEach((message) => console.log(message.sid));
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: `Message sent to ${phoneNumbers.length} numbers`,
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "Failed to send SMS",
    };
  }
};
