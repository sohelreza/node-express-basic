/*
 *
 * Title: Server Library
 * Description: Server related functions
 * Author: S. M. Sohel Reza (ChefOnline)
 * Date: 20/03/2022
 *
 */

// Dependencies
const http = require("http");
const { handleReqRes } = require("../helpers/handleReqRes");
const environment = require("../helpers/environments");

// server object - module scaffolding
const server = {};

// configuration
server.config = {};

// create server
server.createServer = () => {
  const createServerVariable = http.createServer(server.handleReqRes);
  createServerVariable.listen(environment.port, () => {
    console.log(`listening to port ${environment.port}`);
  });
};

// handle Request Response
server.handleReqRes = handleReqRes;

// start the server
server.init = () => {
  server.createServer();
};

// export the module
module.exports = server;
