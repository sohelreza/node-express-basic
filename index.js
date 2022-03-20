/*
 *
 * Title: Project Initial File
 * Description: Initial file to start the node server and workers
 * Author: S. M. Sohel Reza (ChefOnline)
 * Date: 20/03/2022
 *
 */

// Dependencies
const server = require("./lib/server");
const workers = require("./lib/worker");

// app object - module scaffolding
const app = {};

app.init = () => {
  // start the server
  server.init();

  // start the workers
  workers.init();
};

app.init();

// export the app
module.exports = app;
