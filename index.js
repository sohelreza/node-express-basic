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

// testing file system
// @TODO: should be deleted later
data.create(
  "test",
  "newFile",
  { name: "Bangladesh", language: "Bangla" },
  (err) => {
    console.log(`error was`, err);
  }
);

// app object - module scaffolding
const app = {};

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
