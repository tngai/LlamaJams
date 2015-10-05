var React = require('react');
var SongEntry = require('./SongEntry');

var Playlist = React.createClass({

  logout: function() {
    localStorage.clear();
    location.reload();
  },

  getInitialState: function() {
    return {
      backgroundColor: '#34344d'
    }
  },

  componentWillMount: function() {
    $('body').css('background-color', this.state.backgroundColor);
  },

  render: function() {
    return (
      <div className='music-page'>
        <div className='playlistcode-container'>
          <span className='guestcode-span'>
            GuestCode: {this.props.playlistCode}
          </span>
          <button onClick={this.logout} className='logout-button'>
            LEAVE PLAYLIST
          </button>
        </div>
        <div className='bigger-container'>
          <SongEntry {...this.props}/>
        </div>
      </div>
    );
  }
});

module.exports = Playlist;
