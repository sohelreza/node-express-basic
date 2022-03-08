/*
 *
 * Title: Not Found Handler
 * Description: 404 not found handler
 * Author: S. M. Sohel Reza (ChefOnline)
 * Date: 27/02/2022
 *
 */

// module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
  callback(404, {
    message: "Your requested URL was not found",
  });
};

module.exports = handler;
