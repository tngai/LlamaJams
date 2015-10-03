var React = require('react');

var Search = React.createClass({
//div overlay needs to exist somewhere
  handleSubmit: function(e) {
    e.preventDefault();
    var inputVal = React.findDOMNode(this.refs.input).value
    this.props.checkClick(inputVal)
  },

  render: function() {
   return (
      <div className='searchbar-container'>
        <div className='searchbar'>
          <form onSubmit={this.handleSubmit}>
            <input type='text' onSumbit={this.props.checkClick} ref='input'/>
          </form>
        </div>
      </div>
    )
  }
});

module.exports = Search;