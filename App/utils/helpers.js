var Firebase = require('firebase');
var FirebaseTokenGenerator = require("firebase-token-generator");

//create reference to database
var ref = new Firebase("https://llamajamsauth.firebaseio.com/")

//use database secret for token generator
var tokenGenerator = new FirebaseTokenGenerator("VgF8MXKNUfEnzygDAERDZdiLPUS86W4AGBHmEYM8");


module.exports = {

	//OLD HOST
	authHost: function(req, res) {
		//store TOKEN in variable
		var token = req.headers['x-access-token'];
		console.log('SUBMITTED HOST TOKEN:', token);

		//AUTHENTICATE WITH TOKEN
		ref.authWithCustomToken(token, function(error, authData) {
			if (error) {
				console.log("AUTH FAILED", error);
			} else {
				console.log('AUTH SUCCESSFUL', authData);
				//find playlist from DB with same TOKEN
				ref.orderByChild('token').equalTo(token).on('value', function(data) {
					var snapshot = data.val();
					for (var playlist in snapshot) {
						console.log('PLAYLIST FOUND:', snapshot[playlist]);
						//send back PLAYLIST object
						res.json(snapshot[playlist]);
					}
				});
			}
		});
	},

	//NEW HOST
	createPlaylist: function(firstName) {
		//create PLAYLIST CODE
		var playlistCode = firstName + Math.floor(Math.random()*100);
		//create TOKEN
		var token = tokenGenerator.createToken({"uid": "asfass23j4io32e23in", "playlistCode": playlistCode, "isOwner": true});
		console.log('HOST TOKEN CREATED:', token);

		//authenticate with new TOKEN to take user to PLAYLIST page
		ref.authWithCustomToken(token, function(error, authData) {
			if (error) {
				console.log("AUTH FAILED", error);
			} else {
				console.log("AUTH SUCCESSFUL", authData);
				//refactor and push object to DB
				var refactored = {
					token: authData.token,
					playlist: 'playlist',
					playlistCode: playlistCode
				}
				var playlistRef = new Firebase("https://llamajamsauth.firebaseio.com/" + playlistCode);
				playlistRef.set(refactored);
				
				window.localStorage.setItem('token', token);
				console.log("PLAYLIST CODE CREATED:", playlistCode);
			}
		});
		return playlistCode;
	},

	//GUEST
	authGuest: function(req, res) {
		//store PLAYLIST CODE in variable
		var playlistCode = req.body.playlistCode;
		console.log('SUBMITTED PLAYLIST CODE:', playlistCode);

		//authenticate annonymously
		ref.authAnonymously(function(error, authData) {
			if (error) {
				console.log("AUTH FAILED:", error);
			} else {
				//find playlist from DB with same PLAYLIST CODE
				ref.orderByChild('playlistCode').equalTo(playlistCode).on('value', function(data) {
					var snapshot = data.val();
					for (var playlist in snapshot) {
						console.log('PLAYLIST FOUND:', snapshot[playlist]);
						//send back PLAYLIST object
						res.json({token:authData.token, playlist: snapshot[playlist]});
					}
				})
			}
		});
	}
}


