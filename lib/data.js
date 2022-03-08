/*
 *
 * Title: data
 * Description: data
 * Author: S. M. Sohel Reza (ChefOnline)
 * Date: 28/02/2022
 *
 */

// Dependencies
const fs = require("fs");
const path = require("path");

// module scaffolding
const lib = {};

// base directory of a data folder
lib.basedir = path.join(__dirname, "/../.data");

// write data to file
lib.create = (dir, file, data, callback) => {
  // open file for writing
  fs.open(
    lib.basedir + dir + "/" + file + ".json",
    "wx",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        // constant data to string
        const stringData = JSON.stringify(data);

        // write data to file and then close it
        fs.writeFile(fileDescriptor, stringData, (err2) => {
          if (!err2) {
            fs.close(fileDescriptor, (err3) => {
              if (!err3) {
                callback(false);
              } else {
                callback("Error closing the new file!");
              }
            });
          } else {
            callback("Error writing to new file!");
          }
        });
      } else {
        callback("Could not create new file, it may be already exists!");
      }
    }
  );
};

module.exports = lib;
