/*
 * Script to fetch data from http://wetter.mb.fh-jena.de/station/datenbank/php_giese/online.php
 */


var http = require('http');
var cheerio = require('cheerio');

var options = {
    hostname: 'wetter.mb.fh-jena.de',
    port: 80,
    path: '/station/datenbank/php_giese/online.php',
    method: 'GET'
};

var data = "";

var req = http.request(options,function(res){
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        data = data + chunk;
    });

    res.on('end',function(){
        var $ = cheerio.load(data);
        var temp = Number($('strong',$($('td',$($('tr',$($('table')[5]))[1]))[2])).text().split(' ')[0]);
        console.log(temp);
    });
    
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

req.end();
