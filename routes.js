/*
 *
 * Title: Routes
 * Description: Application Routes
 * Author: S. M. Sohel Reza (ChefOnline)
 * Date: 27/02/2022
 *
 */

// dependencies
const { sampleHandler } = require("./handlers/routeHandlers/sampleHandler");
const { userHandler } = require("./handlers/routeHandlers/userHandler");

const routes = {
  sample: sampleHandler,
  user: userHandler,
};

module.exports = routes;
