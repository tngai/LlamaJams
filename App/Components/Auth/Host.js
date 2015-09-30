var React = require('react');

var Host = React.createClass({
  getInitialState: function() {
    return {
      showInputBar: false,
      showButton: true 
    };
  },

  showInput: function(){
    // when Host button is pushed, input bar will be shown
    this.setState({showInputBar: true});
    this.setState({showButton: false})
  },

  render: function() {
    return (
      <div>
        <h1>Host</h1>
        <div>
          {this.state.showButton ? <Button showInput={this.showInput}/> : null}
        </div>

        <div>
          {this.state.showInputBar ? <InputBar /> : null}
        </div>
      </div>
    );
  }

});


var Button = React.createClass({
  render: function(){
    return (
      <button onClick={this.props.showInput} className='host-button'>Host</button>
    );
  }
});

var InputBar = React.createClass({
  render: function(){
    return (
      <form>
        <input type='text' placeholder='First Name' />
      </form>
    );
  }
});

module.exports = Host;