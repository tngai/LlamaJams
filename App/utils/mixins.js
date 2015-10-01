var Mixin = {
	getInitialState: function() {
	  return {
	    showInputBar: false,
	    showButton: true
	  };
	},

	toggleView: function(view1, view2) {
		// retrieve token from local storage
		var jwt = window.localStorage.getItem('token');
		// when Host button is pushed, input bar will be shown

		//if token exists, take user to playlist
		if (jwt) {
		  //take to playlist
		  console.log('We have TOKEN');
		} else {
		  this.setState({view1: true});
		  this.setState({showButton: false});
		}
	}
}
