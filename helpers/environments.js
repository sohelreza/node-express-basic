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
  secretKey: "stagingSecretKey",
  maxChecks: 5,
  twilio: {
    fromPhone: "+15005550001",
    accountSid: "AC075473c51d7b868b053ac93bd5159ac9",
    authToken: "2347cd41bbdc95ccf2df5d4f43541778",
  },
};

environments.production = {
  port: 5000,
  envName: "production",
  secretKey: "productionSecretKey",
  maxChecks: 5,
  twilio: {
    fromPhone: "+15005550001",
    accountSid: "AC075473c51d7b868b053ac93bd5159ac9",
    authToken: "2347cd41bbdc95ccf2df5d4f43541778",
  },
};

// determine which environment was passed
const currentEnvironment =
  typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

// export corresponding environment object
const environmentToExport =
  typeof environments[currentEnvironment] === "object"
    ? environments[currentEnvironment]
    : environments.staging;

// export module
module.exports = environmentToExport;
