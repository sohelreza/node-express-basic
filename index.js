/*
 *
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to monitor up or down time of user defined links
 * Author: S. M. Sohel Reza (ChefOnline)
 * Date: 21/02/2022
 *
 */

// Dependencies
const http = require("http");
const { StringDecoder } = require("string_decoder");
const { handleReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environments");
const data = require("./lib/data");
const { sendTwilioSms } = require("./helpers/notifications");

// app object - module scaffolding
const app = {};

// testing twilio sms
// @TODO: should be deleted later
sendTwilioSms("01771323554", "Test message", (err) => {
  console.log(`This is the error : `, err);
});

// configuration
app.config = {};

// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environment.port, () => {
    console.log(`listening to port ${environment.port}`);
  });
};

// handle Request Response
app.handleReqRes = handleReqRes;

// start the server
app.createServer();
