var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;

var App = React.createClass({
  render: function() {
    return (
      <div>
        <nav className="navbar navbar-default" role="navigation">
          <div className="container">
              <div className="navbar-header">
                 <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                   <span className="sr-only">Toggle navigation</span>
                   <span className="icon-bar"></span>
                   <span className="icon-bar"></span>
                   <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="/">IoT Dashboard</a>
              </div>
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                  <li><Link to="home">Home</Link></li>
                  <li><Link to="page">Sign in</Link></li>
                  <li><Link to="about">About</Link></li>
                </ul>
              </div>
            </div>
        </nav>

        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
});

var person = {
  name: "Mike",
  age: 87,
  loves: "women",
  experise: "Maker"
};


var Home = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Home</h1>
        <p>Put your home page here</p>
      </div>
    );
  }
});

var Page = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Page1</h1>
        <p>Demo another page here</p>
      </div>
    );
  }
});

var About = React.createClass({
  render: function() {
    return (
      <div>
        <h1>About</h1>
        <p>Name: {person.name}</p>
        <p>Age: {person.age}</p>
        <p>loves: {person.loves}</p>
        <p>experise: {person.experise}</p>
      </div>
    );
  }
});


// Run the routes
var routes = (
      <Router>
        <Route name="app" path="/" component={App}>
          <Route name="page" path="/page" component={Page} />
          <Route name="page2" path="/about" component={About} />
          <Route path="*" component={Home}/>
        </Route>
      </Router>
);

ReactDOM.render(routes, document.body)