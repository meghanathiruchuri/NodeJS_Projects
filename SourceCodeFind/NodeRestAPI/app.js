//Import all the required dependencies
const express = require('express');
const mysql = require('mysql');
const cheerio = require('cheerio');
const request = require('request');
const bodyParser = require("body-parser");
const momentTz = require('moment-timezone');

//Intialize the Node express server
const app = express();

//bodyParser returns middleware that only parses json
app.use(bodyParser.json());
//bodyParser returns middleware that only parses urlencoded bodies
app.use(bodyParser.urlencoded({extended : true}));

//Start the Express server on port 3000
app.listen('3000', () => {
    console.log('Server started on port 3000');
});

//Create MySQL Database Connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodemysql'
});

//Connect MySQL Database
db.connect((err) => {
    if(err){
        console.log('\nError while connecting to MySQL Database. Please check if the MySQL Database server is up and running...\n');
        throw err;
    }
    console.log('MySQL connected!');
});


//Set the moment Timezone to India
momentTz.tz.add("Asia/Calcutta|HMT BURT IST IST|-5R.k -6u -5u -6u|01232|-18LFR.k 1unn.k HB0 7zX0");
momentTz.tz.link("Asia/Calcutta|Asia/Kolkata");
let currentDateTimestamp = momentTz(Date.now()).format('YYYY-MM-DD HH:mm:ss');


//POST API call for /insert
app.post('/insert', (req, res) => {
    //Fetch the URL from from request body
    //console.log("req.body.url="+req.body.url);
    urlSelected = req.body.url;
    console.log("urlSelected="+urlSelected);

    if(urlSelected === ''){
        console.log("urlSelected is empty. There is some problem..");
        res.send('Oops..URL is coming as null. There is some problem..');
    }else {
        //Check if the URL is valid with regex pattern - to check if it starts with http:// or https:// 
        var pattern = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        if (pattern.test(urlSelected)) {
            //Cheerio is library to scrape the website URL provided
            request(urlSelected, (err, response, body) => {
                if (err) throw err;
                if (!err && response.statusCode == 200) {
                    //Load the entire website content
                    $ = cheerio.load(body);
                    //Code Snippets will be tagged under <pre> </pre> tags. Now search for keyword <pre> tag to fetch the code snippet in between <pre> and </pre>.
                    codeSnippet = $('pre').text();
                    if(codeSnippet === ''){
                        console.log("No code snippets found in the URL: "+urlSelected);
                        res.send('No code snippets found in the URL : '+urlSelected);
                    } else{
                        console.log("Returned code snippet:"+codeSnippet);
                        //Populate all the values to the table columns
                        let post = {url_scanned: urlSelected, code_snippet: codeSnippet, last_updated_dt: currentDateTimestamp};
                        //Now execute the INSERT sql script to insert the records to MySQL database
                        let sql = 'INSERT INTO code_capture SET ?';
                        let query = db.query(sql, post, (err, result) => {
                            if(err) throw err;
                            console.log(result);
                            res.send('Code snippets are inserted successfully to the database..');
                        });
                    }
                }
            });
        } else {
            res.send('Not a valid http or https URL. URL received is: '+urlSelected);
        }
    }
});