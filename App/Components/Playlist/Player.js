var React = require('react');

var Player = React.createClass({
  render: function() {
    return (
      <div className='player-container'>
        <div className='close-container'>
          <img src='assets/img/button-x.png' width='15' height='15'/>
        </div>
        <div className='play-pause'>
          <div className='button-play'>
            <img src='assets/img/button-play.png' width='50' height='50' ref='play' onClick={this.playShouldpause} style={displayPlay}/>
          </div>
          <div className='button-pause' >
            <img src='assets/img/button-pause.png' width='50' height='50' ref='pause' onClick={this.playShouldpause} style={displayPause}/>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Player;