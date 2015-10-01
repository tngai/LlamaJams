var React = require('react');
var Auth = require('./auth/auth');
var Playlist = require('./playlist/playlist');
var helpers = require('../utils/helpers');

var Main = React.createClass({
	getInitialState: function() {
	  return {
	    showAuth: true,
	    showPlaylist: false,
	    playlistCode: ''
	  };
	},

	showInput: function(){
	  // retrieve token from local storage
	  var jwt = window.localStorage.getItem('token');
	  console.log("inside showInput:", this.state.playlistCode);
	  // if token exists, take user to playlist
	  if (jwt) {
  		// change trigger state
  		this.setState({showAuth: false});
  		this.setState({showPlaylist: true});
	    // save context in variable
	    var self = this;

	    // authenticate token
	    helpers.authHost(jwt)
	    	.then(function(data) {
	    		console.log('AUTH SUCCESSFUL ON RETURN:', data);
	    		self.setState({playlistCode: data.auth.playlistCode});
	    	})
	    	.catch(function(err) {
	    		console.log(err);
	    	})

	  } else {
	    console.log('NO TOKEN FOUND');
	    // if no token but playlist code exists, take user to playlist
	    if (this.state.playlistCode.length > 0) {
	    	console.log('inside else statement of showinput:', this.state.playlistCode);
	    	this.setState({showAuth: false});
	    	this.setState({showPlaylist: true});
	    }
	  }
	},

	updateCode: function(newCode) {
		console.log('before stateChange:', newCode);
		// change playlist code and re-render main component
		this.setState({playlistCode: newCode}, this.showInput);
		console.log('in updateCode:', this.state.playlistCode);
	},

	componentWillMount: function() {
		this.showInput();
	},

  render: function() {
    return (
      <div>
        <div>
          {this.state.showAuth  ? <Auth updateCode={this.updateCode}/> : null}
        </div>

        <div>
          {this.state.showPlaylist ? <Playlist playlistCode={this.state.playlistCode}/> : null}
        </div>

      	<h1>{this.state.playlistCode}</h1>

      </div>
    )
  }
	

});

React.render(<Main />, document.getElementById('app'));




