var CONST_ES6_BUILD_PATH = './build/';

var _  = require('lodash');
var React = require('react');
var LineChart = require("react-chartjs").Line;
var ReactRouter = require("react-router");
var ReactDOM = require("react-dom");
// var io = require("sails.io");

function rand(min, max, num) {
  var rtn = [];
  while (rtn.length < num) {
    rtn.push((Math.random() * (max - min)) + min);
  }
  return rtn;
}




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



    // var newTempData = {
    //     "value": 35 ,
    //     "smell":"face",
    // };

    // io.socket.post('/humidity', newTempData ,function serverResponded (humidity, JWR) {
    //   console.log("data");
    //   if(JWR.statusCode == 200){
    //     console.log("post worked");
    //     console.log(humidity);
    //   }
    // });



var chartOptions = {

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

};;




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
      humidityList: [],
      chartData : {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: rand(32, 100, 7)
                }
            ]
          }
    };
  },
  componentDidMount: function(){
    var component = this;
    io.socket.get('/humidities', function serverResponded (humidity, JWR) {
      if(JWR.statusCode == 200){
        console.log("Succssess");
        humidity;
        console.log(humidity);
        if (component.isMounted()) {
        	var labels = [];
        	var values = [];
        	for(var i=0; i<humidity.length; i++){
        		labels.push(humidity[i].createdAt);
        		values.push(humidity[i].value);
        	}
        var newChartData = {
        			labels: labels,
		            datasets: [
		                {
		                    label: "Temperature Data",
		                    fillColor: "rgba(220,220,220,0.2)",
		                    strokeColor: "rgba(220,220,220,1)",
		                    pointColor: "rgba(220,220,220,1)",
		                    pointStrokeColor: "#fff",
		                    pointHighlightFill: "#fff",
		                    pointHighlightStroke: "rgba(220,220,220,1)",
		                    data: values
		                }
		            ]
          };
          component.setState({
            humidityList: humidity,
            chartData: newChartData
          });
        }
      }
    }).bind(component);
  },

  render: function() {
  	if(this.state.humidityList.length)
	    return (
	      <div>
	        <h1>Humidity Data</h1>
	        <div className='chartWrapper'>
	       		<LineChart data={this.state.chartData} options={chartOptions}  width="1400" height="500"/>
	        </div>
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
	else
		return (<p>Loading</p>);
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



