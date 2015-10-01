var React = require('react');
var Router = require('react-router');

var HostButton = require('./hostbutton');
var InputBar = require('./inputbar');

var Host = React.createClass({
  getInitialState: function() {
    return {
      showButton: true,
      showInputBar: false
    };
  },

  showInput: function(){
    // retrieve token from local storage
    var jwt = window.localStorage.getItem('token');

    //if token exists, take user to playlist
    if (jwt) {
      //take to playlist
      console.log('We have TOKEN');
    } else {
      this.setState({showButton: false});
      this.setState({showInputBar: true});
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
          {this.state.showInputBar ? <InputBar {...this.props}/> : null}
        </div>
      </div>
    );
  }

});




module.exports = Host;








