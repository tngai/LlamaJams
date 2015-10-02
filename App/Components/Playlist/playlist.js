var React = require('react');

var Playlist = React.createClass({

	render: function() {
		return (
			<div>Playlist Here : {this.props.playlistCode}</div>
		);
	}
});

module.exports = Playlist;
