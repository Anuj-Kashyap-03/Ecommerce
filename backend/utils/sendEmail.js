const { CourierClient } = require("@trycourier/courier");

const sendEmail = async (options) => {
  const courier = CourierClient({ authorizationToken: process.env.AUTH_TOKEN });
  // console.log(options.subject, " : ", options.message);
  const { requestId } = await courier.send({
    message: {
      to: {
        email: `${options.email}`,
      },
      content: {
        title: `${options.subject}`,
        body: `${options.message}`,
      },
      routing: {
        method: "single",
        channels: ["email"],
      },
    },
  });
  // console.log(requestId);
};

module.exports = sendEmail;
