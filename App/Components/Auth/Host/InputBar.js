var React = require('react');
var helpers = require('../../../utils/helpers');

var InputBar = React.createClass({
  createData: function(e) {
    e.preventDefault();
    // store host's first name in variable
    var firstname = this.refs.firstname.getDOMNode().value;

    helpers.createPlaylist(firstname);
    // empty input bar
    this.refs.firstname.getDOMNode().value = '';
  },

  render: function(){
    return (
      <form onSubmit={this.createData}>
        <input type='text' placeholder='First Name' ref='firstname'/>
      </form>
    );
  }
});

module.exports = InputBar;