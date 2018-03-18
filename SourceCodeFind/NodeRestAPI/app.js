const express = require('express');
const mysql = require('mysql');
const moment = require ('moment');
const cheerio = require('cheerio');
const request = require('request');

//Start the Express server on port 3000
const app = express();
app.listen('3000', () => {
    console.log('Server started on port 3000');
});

//Create Connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodemysql'
});

//Connect MySQL Database
db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('MySQL connected!');
});


//Insert record to the table
let currentDateTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
let codeSnippet = "Default Value";
//let urlSelected = "https://stackoverflow.com/questions/47903131/need-example-code-on-spring-integration-example-for-aws-s3-as-inbound-and-apache";
//let urlSelected = "https://stackoverflow.com/questions/49351553/xuggler-humble-video-freeze-on-windows";
app.get('/insert', (req, res) => {
   // console.log("Below is the code snippet:\n"+codeSnippet);
    urlSelected = req.query.url;


    const url = urlSelected;
    //codeSnippet = getCodeSnippet(url);

    request.get(url, (err, response, body) => {
        if (err) throw err;
        $ = cheerio.load(body);
        codeSnippet = $('pre').text();
        console.log("code snippet:"+codeSnippet);
        });
        
    console.log("Returned code snippet:"+codeSnippet);

    console.log("urlSelected="+urlSelected)
    let post = {url_scanned: urlSelected, code_snippet: codeSnippet, last_updated_dt: currentDateTimestamp};
    let sql = 'INSERT INTO code_capture SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Record inserted successfully..');
    });
});

//const url = "https://stackoverflow.com/questions/47903131/need-example-code-on-spring-integration-example-for-aws-s3-as-inbound-and-apache";

function getCodeSnippet(url) {

    request.get(url, (err, response, body) => {
        if (err) throw err;
        $ = cheerio.load(body);
        codeSnippet = $('pre').text();
        console.log("code snippet:"+codeSnippet);
        });
        return codeSnippet;
}
