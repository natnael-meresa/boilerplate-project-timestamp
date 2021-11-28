// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date', function (req, res) {
	let date =req.params.date
	try{
		if(date.indexOf('-') !== -1){
			if(!isNaN( new Date(date).getTime())){
				res.send({
					"unix":Math.floor(new Date(date)),
					"utc": new Date(date).toUTCString()
				})
			}else {
				res.send({ error : "Invalid Date" })
			}		
		}else {
			if(!isNaN( new Date(Number(date)).getTime())){
				res.send({
					"unix": Number(date),
					"utc": new Date(Number(date)).toUTCString()
				})
			}else{
				res.send({ error : "Invalid Date" })
			}
			
		}
	}catch(err){
		
	}

})
app.get('/api', function (req,res) {
	res.send({
		"unix": Date.now(),
		'utc': new Date().toUTCString()
	})
})


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


let PORT = process.env.PORT || 5000
// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
