var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;

var App = React.createClass({
  render: function() {
    return (
      <div>
        <nav className="navbar navbar-custom navbar-fixed-top" role="navigation">
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
                <li><Link to="page"><span className="glyphicon glyphicon-user"></span> Page</Link></li>
                <li><Link to="about"><span className="glyphicon glyphicon-log-in"></span> About</Link></li>
                
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



    // `io` is available as a global.
    // `io.socket` will connect automatically, but at this point in the DOM, it is not ready yet
    // (think of $(document).ready() from jQuery)
    // 
    // Fortunately, this library provides an abstraction to avoid this issue.
    // Requests you make before `io` is ready will be queued and replayed automatically when the socket connects.
    // To disable this behavior or configure other things, you can set properties on `io.sails`.
    // You have one cycle of the event loop to set `io.sails.autoConnect` to false before the auto-connection
    // behavior starts.
    var newTempData = {
        "value": 35 ,
        "smell":"face",
    };

    io.socket.post('/humidity', newTempData ,function serverResponded (humidity, JWR) {
      console.log("data");
      if(JWR.statusCode == 200){
        console.log("post worked");
        console.log(humidity);
      }
    });




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
  getInitialState: function(){
    return {
      humidityList: []
    };
  },
  componentDidMount: function(){
    var component = this;
    io.socket.get('/humidity', function serverResponded (humidity, JWR) {
      if(JWR.statusCode == 200){
        console.log("Succssess");
        humidity;
        console.log(humidity);
        if (component.isMounted()) {
          component.setState({
            humidityList: humidity
          });
        }
      }
    }).bind(component);
  },

  render: function() {
    return (
      <div>
        <h1>Page1</h1>
        <ul>
            {this.state.humidityList.map(function(result) {
              return <li key={result.id}>
                        <ul>
                          <li>{result.value}</li>
                          <li>{result.createdAt}</li>
                        </ul>
                      </li>;
            })}           
        </ul>
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
          <Route name="about" path="/about" component={About} />
          <Route path="*" component={Home}/>
        </Route>
      </Router>
);

ReactDOM.render(routes, document.getElementById('content'))