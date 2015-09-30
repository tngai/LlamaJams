var React = require('react');
var Host = require('./Host');
var Guest = require('./Guest');


var Auth = React.createClass({
  render: function() {
    return (
      <div>
        <Host />
        <Guest />
      </div>
    );
  }
});


module.exports = Auth;