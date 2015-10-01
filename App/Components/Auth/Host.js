var React = require('react');
var Router = require('react-router');

var HostButton = require('./host/hostbutton');
var InputBar = require('./host/inputbar');

var Host = React.createClass({
  getInitialState: function() {
    return {
      showInputBar: false,
      showButton: true
    };
  },

  showInput: function(){
    // retrieve token from local storage
    var jwt = window.localStorage.getItem('token');
    // when Host button is pushed, input bar will be shown

    //if token exists, take user to playlist
    if (jwt) {
      //take to playlist
      console.log('We have TOKEN');
    } else {
      this.setState({showInputBar: true});
      this.setState({showButton: false});
    }
  },

  render: function() {
    return (
      <div>
        <h1>Host</h1>
        <div>
          {this.state.showButton ? <HostButton showInput={this.showInput}/> : null}
        </div>

        <div>
          {this.state.showInputBar ? <InputBar /> : null}
        </div>
      </div>
    );
  }

});




module.exports = Host;








