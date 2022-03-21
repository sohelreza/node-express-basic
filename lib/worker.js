/*
 *
 * Title: Workers Library
 * Description: Worker related functions
 * Author: S. M. Sohel Reza (ChefOnline)
 * Date: 20/03/2022
 *
 */

// Dependencies
const url = require("url");
const data = require("./data");
const http = require("http");
const https = require("https");
const { parseJSON } = require("../helpers/utilities");

// worker object - module scaffolding
const worker = {};

// lookup all the checks
worker.gatherAllChecks = () => {
  // get all the checks
  data.list("checks", (err1, checks) => {
    if (!err1 && checks && checks.length > 0) {
      checks.forEach((check) => {
        // read the checkData
        data.read("checks", check, (err2, originalCheckData) => {
          if (!err2 & originalCheckData) {
            // pass the data to the check validator
            worker.validateCheckData(parseJSON(originalCheckData));
          } else {
          }
        });
      });
    } else {
      console.log("Error : Could not find any checks to process");
    }
  });
};

// validate individual check data
worker.validateCheckData = (originalCheckData) => {
  const originalData = originalCheckData;

  if (originalCheckData && originalCheckData.id) {
    originalData.state =
      typeof originalCheckData.state === "string" &&
      ["up", "down"].indexOf(originalCheckData.state) > -1
        ? originalCheckData.state
        : "down";

    originalData.lastChecked =
      typeof originalCheckData.lastChecked === "number" &&
      originalCheckData.lastChecked > 0
        ? originalCheckData.lastChecked
        : false;

    // pass to the next process
    worker.performCheck(originalData);
  } else {
  }
};

// perform check
worker.performCheck = (originalCheckData) => {
  // prepare the initial check outcome
  let checkOutCome = {
    error: false,
    responseCode: false,
  };

  // mark the outcome has not been sent yet
  let outcomeSent = false;

  // parse the hostname & full url from the original data
  const parsedUrl = url.parse(
    `${originalCheckData.protocol}://${originalCheckData.url}`,
    true
  );
  const hostName = parsedUrl.hostname;
  const { path } = parsedUrl;

  // construct the request
  const requestDetails = {
    protocol: `${originalCheckData.protocol}:`,
    hostname: hostName,
    method: originalCheckData.method.toUpperCase(),
    path,
    timeout: originalCheckData.timeoutSeconds * 1000,
  };

  const protocolToUse = originalCheckData.protocol === "http" ? http : https;

  let req = protocolToUse.request(requestDetails, (res) => {
    // grab the status of the response
    const status = res.statusCode;

    // update the check outcome and pass to the next process
  });

  req.on("error", (e) => {});

  req.on("timeout", (e) => {});

  // req send
  req.end();
};

// timer to execute the worker process once per minute
worker.loop = () => {
  setInterval(() => {
    worker.gatherAllChecks();
  }, 1000 * 60);
};

// start the workers
worker.init = () => {
  // execute all the checks
  worker.gatherAllChecks();

  // call the loop so that checks continue
  worker.loop();
};

// export the module
module.exports = worker;
