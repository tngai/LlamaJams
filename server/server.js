var express = require('express');
var app = express();
var route = require('./route.js')


route(app, express);


app.listen(5000, function() {
	console.log('Listening to 5000...');
})

//redirect users to playlist.html
//replace /success with playlist.html
//push songs into firebase/playlistCode/playlist



