const fs = require("fs");
const https = require("https");
function getInstruction() {
  const options = {
    hostname: "nc-leaks.herokuapp.com",
    path: "/api/confidential",
    method: "GET",
  };
  const request = https.request(options, (response) => {
    // declare a body variable to build the response from the packets
    let body = "";
    // use response's on method to run a callback every time a packet is received
    response.on("data", (packet) => {
      body += packet.toString();
    });
    response.on("end", () => {
      // parse the JSON string back into an object, ready to be used..
      const parsedBody = JSON.parse(body);
      console.log(parsedBody.instructions);
      fs.writeFile(
        "ncleak.md",
        parsedBody.instructions,
        "utf8",
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log("File created!");
          }
        }
      );
    });
  });
  request.end();
}
getInstruction();
