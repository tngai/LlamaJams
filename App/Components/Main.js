var React = require('react');
var Auth = require('./Auth/Auth');


// instead of auth it will have <routes />
var Main = React.createClass({
  render: function() {
    return (
      <div>
        <Auth />
      </div>
    )
  }
});

React.render(<Main />, document.getElementById('app'));