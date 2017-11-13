const fs = require("fs");

// Asynchronous read
fs.readFile('./json/file.json', function (err, data) {
  if (err) {
    return console.error(err);
  }
  console.log("Asynchronous read: " + data.toString());
});
