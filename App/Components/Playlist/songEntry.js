var React = require('react');
var Search = require('./Search');
var Song = require('./Song');
var Player = require('./Player');
var Firebase = require('firebase');
var SongEntry = React.createClass({
  // This function fetches the right playlist from Firebase based on
  // your playlist code.
    loadSongsFromServer: function(receivedCode) {
    this.firebaseRef = new Firebase('https://llamajamsauth.firebaseio.com/' + receivedCode + '/playlist');
    this.firebaseRef.on('child_added', function(snapshot) {
      console.log('this is the snapshot.val.title of the database', snapshot.val().title)
      var eachSong = snapshot.val()
      var eachTitle = eachSong.title;
      // The next three lines attempt to parse the song title to store
      var separateTitleandArtist = eachTitle.indexOf('-')
      var artist = eachTitle.slice(0, separateTitleandArtist)
      var song = eachTitle.slice(separateTitleandArtist + 2, eachTitle.length)
      // Pushes each song into the items array for rendering
      this.items.push({
        artist: artist,
        song: song,
        songId: eachSong.videoId
      });
      console.log(this.items);
      console.log("CUrrent Song :", this.state.currentSongId)
      this.setState({songs: this.items})
    }.bind(this)); 
  },
  // This rerenders the playlist every time a song is removed from Firebase
  rerenderPlaylist: function() {
    this.firebaseRef.on('child_removed', function(snapshot) {
      var removeSongbyUrl = snapshot.val().songUrl;
      var isFound = false;
      // Loops through the songs array and removes the deleted song
      // from firebase to control rendering for react
      for(var i = 0; i < this.state.songs.length; i++) {
        if(this.state.songs[i].songUrl === removeSongbyUrl && !isFound) {
          this.state.songs.splice(i,1)
          isFound = true;
        }
      }
      // Resets the state to accurately reflect removed items
      this.setState({
        songs: this.state.songs
      });
      this.forceUpdate();
    }.bind(this));
  },
  // Sets the initial playlist code to an empty string
  getDefaultProps: function() {
    return {
      playlistCode: ''
    }
  },
  getInitialState: function(){
    this.items = [];
    return {
      currentSongId:'',
      songs: [],
      active: false,
      input: '',
      searchResults: [],
      toggle: false,
      hasToken: false
    }
  },
  componentWillReceiveProps: function(nextProps) {
    this.state.hasToken = nextProps.hasToken;
    var receivedCode = nextProps.playlistCode;
    this.loadSongsFromServer(receivedCode);
    this.rerenderPlaylist();
  },
  handleSearchInput: function(inputSearch) {
    this.setState({
      input: inputSearch
    });
    this.toggleBox();
    this.soundCloudCall(inputSearch);
  },
  toggleBox: function() {
    this.setState({
      active: !this.state.active
    })
  },
  // This function adds songs to firebase
  pushSong: function(e) {
    var selectedVideo = e.target.childNodes[0].data;
    console.log("SELECTED SONG :", selectedVideo)
    var allResults = this.state.searchResults;
    for(var i = 0; i < allResults.length; i++) {
      if(allResults[i].title === selectedVideo) {
        this.firebaseRef.push({
          title:  allResults[i].title,
          videoId: allResults[i].videoId
        });
        if(this.state.currentSongId === ''){
          this.setState({currentSongId: allResults[i].videoId})   
        }
        if(this.state.currentSongId !=='') {
          var tempArray = this.state.songs;
          tempArray.push(allResults[i].videoId)
          this.setState({songs:tempArray});
        }
      }
    }

   this.toggleBox();
   e.preventDefault();
  },
  // Controls the play and pause functionality of the music player
  playPause: function() {
    var fbref = this.firebaseRef;
    var songs = this.state.songs;
    var player = this;
    var myOptions = {
      onload : function() {
        var duration = this.duration;
      },
      onfinish : function(){
        // Delete first song from firebase
        var children = [];
        fbref.once('value', function(snapshot){
          snapshot.forEach(function(childSnapshot){
            children.push(childSnapshot.key().toString());
          });
        });
        fbref.child(children[0]).remove();
        // Play firstSong
        SC.stream(player.state.songs[0].songUrl, myOptions, function(song) {
          song.play();
        });
      }
    }
    // If there's no current soundManager object, create one
    if(!window.soundManager){
      SC.stream(player.state.songs[0].songUrl, myOptions, function(song) {
        song.play();
      })
    }else{
      if(this.state.toggle){
        this.setState({
          toggle: false
        })
        window.soundManager.resumeAll();
      }else{
        this.setState({
          toggle: true
        })
        window.soundManager.pauseAll();
      }
    }
  },
  // Controls the searching and displaying of results from the SoundCloud API
  soundCloudCall: function(inputSearch) {
    this.forceUpdate();
    var obj = [];
    console.log('your inputSearch: ',inputSearch);
    $.get( "https://www.googleapis.com/youtube/v3/search", { part: 'snippet', q: inputSearch, maxResults:7,key:"AIzaSyCRYqe1V0e0geAFHMkyx8ecLq4j04weHmE" } )
      .then(function( data ) {
        console.log(data)
        for(var i = 0; i < data.items.length; i++) {
          if(data.items[i].id.videoId) {
          console.log("Each item: ", data.items[i])
          console.log("TITLE: ", data.items[i].snippet.title);
          console.log("VIDEO ID: ", data.items[i].id.videoId);
            obj.push({
              title: data.items[i].snippet.title,
              videoId: data.items[i].id.videoId
            })
          }
        }
        this.setState({
          searchResults: obj
      })
    }.bind(this));
  },
  nextSong: function(){
    var currentSongId = this.state.currentSongId;
    var songList = this.state.songs;
    for(var i = 0; i < songList.length; i++) {
      if(songList[i].songId === currentSongId) {
        this.setState({currentSongId: songList[i+1].songId });
      }
    }

  },
      // this.setState({ searchResults: this.state.searchResults.slice(0) })
      // this.forceUpdate();
  //   SC.get('https://www.googleapis.com/youtube/v3/search', { q: inputSearch, limit: 7 }, function(tracks) {
  //   // Display each song title and an option to add '+' to host playlist
  //     var obj = [];
  //     for(var i = 0; i < tracks.length; i++) {
  //       var eachSong = tracks[i].title;
  //       var eachUrl = tracks[i].uri;
  //       obj.push({
  //         title: eachSong,
  //         songUrl: eachUrl
  //       });
  //      }
  //     this.setState({
  //       searchResults: obj
  //     })
  //  }.bind(this));
  // },
  render: function(){
    var songStructure = this.state.songs.map(function(song, i) {
      return <Song data={song} key={i}/>
    })
    var songResults = this.state.searchResults.map(function(song, i) {
      var songUri = song.songUrl
      return <a className='song-results' href='#' ref='eachSoundcloud' value={songUri}>{song.title}<div className='plus'>+</div></a>
    })
    if(this.state.active) {
      var display = {
        display: 'block'
      }
    } else {
      var display = {
        display: 'none'
      }
    }
    return (
      <div> 
       {this.state.hasToken ? < Player togglePlayer={this.playPause} 
                                nextSong={this.nextSong}
                                songId={this.state.currentSongId} /> : null}
        <Search checkClick={this.handleSearchInput}/>
        <div className='soundcloud-results' style={display}>
          <div className='song-results' onClick={this.pushSong}>
            {songResults}
          </div>
        </div>
       {songStructure}
      </div>
    );
   },
  componentDidMount: function() {
    var jwt = window.localStorage.getItem('token');
    if (this.props.playlistCode.length > 0 && !jwt) {
      this.loadSongsFromServer(this.props.playlistCode);
      this.rerenderPlaylist();
    }
  }
});
module.exports = SongEntry;