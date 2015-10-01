var React = require('react');
var Auth = require('./auth/auth');
var Playlist = require('./playlist/playlist');

var Main = React.createClass({
	getInitialState: function() {
	  return {
	    showAuth: true,
	    showPlaylist: false
	  };
	},

	showInput: function(){
	  // retrieve token from local storage
	  var jwt = window.localStorage.getItem('token');
	  // when Host button is pushed, input bar will be shown

	  //if token exists, take user to playlist
	  if (jwt) {
	    //take to playlist
	    this.setState({showAuth: false});
	    this.setState({showPlaylist: true});
	  } else {
	    console.log('We have TOKEN');
	  }
	},

	componentWillMount: function() {
		this.showInput();
	},

  render: function() {
    return (
      <div>
        <div>
          {this.state.showAuth ? <Auth /> : null}
        </div>

        <div>
          {this.state.showPlaylist ? <Playlist /> : null}
        </div>
      </div>
    )
  }
});

React.render(<Main />, document.getElementById('app'));




