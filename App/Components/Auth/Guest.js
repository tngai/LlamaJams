var React = require('react');

var Guest = React.createClass({

  render: function() {
    return (
      <div>
        <h1>Guest</h1>
        <input type='text' placeholder='Playlist Code' />
      </div>
    );
  }

});

module.exports = Guest;
