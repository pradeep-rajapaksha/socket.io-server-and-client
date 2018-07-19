
var express = require('express'), app = module.exports.app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server); // pass a http.Server instance
var http = require('http').Server(app);

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
})); 

app.get('/', function(req, res, next){ 
	res.sendFile(__dirname + '/index.html');
});

app.post("/send", function(req, res, next) {
	let channel = req.headers.channel;
	io.sockets.emit(channel, req.body);
	res.send({});
});

// start server 
	// node server.js 

// php curl request 
	// curl --request POST 'http://localhost:3000/send' --header channel:NOTIFICATION_SECRET_KEY --data 'notification=notificationexample&channel=SOME_CHANNEL'  

