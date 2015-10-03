var React = require('react');

var Song = React.createClass({
  render: function() {
    return (
      <div className='container-playlist'>

        <div className='close-container'>
          <img src ='./assets/img/button-x.png' width='15' height='15'/>
        </div>

        <div className='song-view'>
          {this.props.data.song}
        </div>

        <div className='artist-view'>
          {this.props.data.artist}
        </div>

      </div>
    )
  }
})

module.exports = Song;