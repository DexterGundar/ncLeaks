const fs = require('fs');
const https = require('https');
function getPeople(){
    const options = {
        hostname: 'nc-leaks.herokuapp.com',
        path: '/api/people',
        method: 'GET',
    }
    const request = https.request(options, (response) => {
        console.log(`response status:`, response.statusCode);
        // declare a body variable to build the response from the packets
        let body = '';
        // use response's on method to run a callback every time a packet is received
        response.on('data', (packet) => {
          body += packet.toString();
        });
        response.on('end', () => {
            // parse the JSON string back into an object, ready to be used..
            const parsedBody = JSON.parse(body);
            //console.log(JSON.stringify(parsedBody))
            const workAtNc = parsedBody.people.filter((person)=>person.job.workplace === 'northcoders')
            
            fs.writeFile('northcoders.json', JSON.stringify(workAtNc), 'utf8', (err,data) => {
                if (err){ 
                  console.log(err);
                } else {
                  console.log('File created!');
                }
              });
          });
      });
      request.end();
}
getPeople()