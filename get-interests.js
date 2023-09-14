const fs = require("fs");
//import { readFile } from "node:fs";
const https = require("https");
let least = [];
fs.readFile("./northcoders.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    least = JSON.parse(data);
  }
  console.log(least);
});
function getInterests() {
  const options = {
    hostname: "nc-leaks.herokuapp.com",
    path: "/api/people/:username/interests",
    method: "GET",
  };
  const request = 
  //const usernames = least.map((person) => {
  // person[username];
  //});
}

getInterests();
