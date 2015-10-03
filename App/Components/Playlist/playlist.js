var React = require('react');
var SongEntry = require('./songEntry');

var Playlist = React.createClass({

  render: function() {
    return (
      <div className='bigger-container'>
      <SongEntry {...this.props}/>
      </div>
    );
  }
});

module.exports = Playlist;
