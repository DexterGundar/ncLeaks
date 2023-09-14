const fs = require("fs");
const https = require("https");

fs.readFile("./northcoders.json", "utf8", (err, data) => {
  if (err) console.log("error");
  else {
    const objData = JSON.parse(data);
    const limit = objData.length;
    const userInterests = [];

    let counter = [0];
    objData.forEach((person) => {
      getUrl(
        "nc-leaks.herokuapp.com",
        `/api/people/${person.username}/interests`,
        "interests.json",
        limit,
        counter,
        userInterests
      );
    });
  }
});

function getUrl(url, path, fileName, limit, counter, userInterests) {
  const options = {
    hostname: `${url}`,
    path: `${path}`,
    method: "GET",
  };
  const request = https.request(options, (response) => {
    let content = "";
    response.on("data", (packet) => {
      content += packet.toString();
    });
    response.on("end", () => {
      const passedContent = JSON.parse(content);
      userInterests.push(passedContent.person);
      counter[0]++;

      if (counter[0] === limit) {
        console.log(userInterests);
        fs.writeFile(
          `${fileName}`,
          JSON.stringify(userInterests),
          (err, result) => {
            if (err) console.log(err);
            else {
              console.log("interests.json built successfully");
            }
          }
        );
      }
    });
  });
  request.end();
}

