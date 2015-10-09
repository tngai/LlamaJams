var React = require('react');
var YouTube = require('../../../node_modules/react-youtube/dist/YouTube');
var Player = React.createClass({
  //the play and pause have booleans as their values to toggle display and hide
   getInitialState: function() {
    return {
      play: true,
      pause: false
    }
  },
  //when playShouldpause is invoked, the play should turn into a pause button
  //the pause should turn into a play button
   playShouldpause: function() {
    this.setState({
      play: !this.state.play,
      pause: !this.state.pause
    })
  //calls the parent songEntry with the props 'togglePlayer'
  //passes in the current state as an argument
    this.props.togglePlayer(this.state.play)
  },
  _onEnd: function(event){
    this.props.nextSong();
  },
   render: function() {
  //these are used to create style properties for the images
  //this.state.play means that the play button should show, and the pause button should hide
  var opts = {
        height: '390',
        width: '640',
          playerVars: {
            autoplay: 1
          }
      };
    if(this.state.play) {
      var displayPlay = {
        display: 'block'
      }
      var displayPause = {
        display: 'none'
      }
    }
  //else is used for when pause is currently at display, so that it could show the pause and hide the play
    else {
      var displayPlay = {
        display: 'none'
      }
      var displayPause = {
        display: 'block'
      }
    }
    return (
      <div className='player-container'>
        <div className='play-pause'>
          <YouTube
            url={'http://www.youtube.com/watch?v=' + this.props.songId}
            opts={opts}
            onEnd={this._onEnd}
          />
        </div>
      </div>
      );
    }
});
module.exports = Player;