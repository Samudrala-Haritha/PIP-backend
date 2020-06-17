'use strict';
const fs = require('fs');
const https = require('https');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

function requestGetApiTest(req, res) {
  

  let inputString = '';
  let currentLine = 0;

  // process.stdin.on('data', function(inputStdin) {
  //   console.log(' inputStdin ', inputStdin);
  //     inputString += inputStdin;
  // });

  // process.stdin.on('end', function() {
  //     inputString = inputString.split('\n');
  //     console.log('inout string ', inputString);
  main();
  // });
}


function getMovieList(year) {
  try {
    var respArr = [];
    // write your code here
    // API endpoint: https://jsonmock.hackerrank.com/api/movies?Year=2015
    var options = {
      "hostname": "jsonmock.hackerrank.com",
      method: "GET",
      "path": [
        "api",
        "movies"
      ],
      headers: { 'Content-Type': 'application/json' }
    }

    //  var req = await https.request(options, function(res) {
    //     var chunks = [];
    //     res.on('data', function(chunk) {
    //         chunks.push(chunk);
    //         return chunks;
    //     })
    //     res.on("end", function() {
    //         var body = Buffer.concat(chunks);
    //         console.log(body.toString());
    //     })
    // })
    // req.end();

    https.get('https://jsonmock.hackerrank.com/api/movies?Year=2015', (resp) => {
      let respond = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        respond += chunk;
        respond = JSON.parse(respond);
        respond.data.forEach((item) => {
          var respObj = {};
          respObj.title = item.Title;
          respObj.year = item.Year;
          respObj.imdbID = item.imdbID;
          respArr.push(respObj);
        });

      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        // console.log("respArr :", respArr);
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
    console.log("respArr :", respArr);
    return respArr;
  } catch (error) {
    console.log(error);
  }

}
function readLine() {
    return inputString[currentLine++];
}

async function main() {
  // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const year = '2015';//readLine().trim();

  const results = await getMovieList(year);
    
  if (results.length > 0) {
      for (const result of results) {
        console.log(`${result}\n`);
       // ws.write(`${result}\n`);
      }
  } else {
    console.log('No Results Found');
      // ws.write('No Results Found');
  }

 // ws.end();
}

module.exports = requestGetApiTest;