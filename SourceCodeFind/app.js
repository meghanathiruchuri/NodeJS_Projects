var cheerio = require('cheerio');
var request = require('request');

request({
    method: 'GET',
    url: 'https://stackoverflow.com/questions/47903131/need-example-code-on-spring-integration-example-for-aws-s3-as-inbound-and-apache'
    //url: 'https://news.ycombinator.com'
}, function(err, response, body) {
    if (err) return console.error(err);

    // Tell Cherrio to load the HTML

    //body = "<html><head><title>Test Title</title></head><body></body></html>"
    $ = cheerio.load(body);
    //console.log("body="+body);
    var codeSnippet = $('pre').text();
    console.log("Below is the code snippet:\n"+codeSnippet);
    //console.log(codeSnippet);
});