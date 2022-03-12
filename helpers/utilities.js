/*
 *
 * Title: Utilities
 * Description: Important utility function
 * Author: S. M. Sohel Reza (ChefOnline)
 * Date: 27/13/2022
 *
 */

// module scaffolding
const utilities = {};

// parse JSON string to object
utilities.parseJSON = (jsonString) => {
  let output;

  try {
    output = JSON.parse(jsonString);
  } catch {
    output = {};
  }

  return output;
};

// export module
module.exports = utilities;
