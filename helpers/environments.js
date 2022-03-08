/*
 *
 * Title: Environments
 * Description: Handle all environment related things
 * Author: S. M. Sohel Reza (ChefOnline)
 * Date: 27/02/2022
 *
 */

// module scaffolding
const environments = {};

environments.staging = {
  port: 3000,
  envName: "staging",
};

environments.production = {
  port: 5000,
  envName: "production",
};

// determine which environment was passed
const currentEnvironment =
  typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";
console.log("check env", typeof environments[currentEnvironment]);

// export corresponding environment object
const environmentToExport =
  typeof environments[currentEnvironment] === "object"
    ? environments[currentEnvironment]
    : environments.staging;

// export module
module.exports = environmentToExport;
