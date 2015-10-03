var React = require('react');
var SongEntry = require('./SongEntry');

var Playlist = React.createClass({

	render: function() {
		return (
			<div className='bigger-container'>
      <SongEntry {...this.props}/>
      {this.props.playlistCode}
      </div>
		);
	}
});

module.exports = Playlist;
