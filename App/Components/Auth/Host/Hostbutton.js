var React = require('react');

var HostButton = React.createClass({
  render: function(){
    return (
      <button onClick={this.props.showInput} className='host-button'>Host</button>
    );
  }
});

module.exports = HostButton;