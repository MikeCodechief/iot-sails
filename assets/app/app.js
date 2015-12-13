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
              <Link to="home"><a className="navbar-brand" href="/">IoT Dashboard</a></Link>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="humidity"><span className="glyphicon glyphicon-user"></span> Humidity</Link></li>
                <li><Link to="temperature"><span className="glyphicon glyphicon-log-in"></span> Temperature</Link></li>
                
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

// var person = {
//   name: "Mike",
//   age: 87,
//   loves: "women",
//   experise: "Maker"
// };



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

var Humidity = React.createClass({
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
		                    label: "Humidity Data",
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
	              return <table key={result.id}>
	                        <tr>
	                          <th>{result.value}</th>
	                          <th>{result.createdAt}</th>
	                        </tr>
	                      </table>;
	            })}           
	        </ul>
	      </div>
	    );
	else
		return (<p>Loading</p>);
  }
});


var Temperature = React.createClass({
  getInitialState: function(){
    return {
      TemperatureList: [],
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
    io.socket.get('/temperatures', function serverResponded (temperature, JWR) {
      if(JWR.statusCode == 200){
        console.log("Succssess");
        temperature;
        console.log(temperature);
        if (component.isMounted()) {
          var labels = [];
          var values = [];
          for(var i=0; i<temperature.length; i++){
            labels.push(temperature[i].createdAt);
            values.push(temperature[i].value);
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
            temperatureList: temperature,
            chartData: newChartData
          });
        }
      }
    }).bind(component);
  },

  render: function() {
    if(this.state.temperatureList.length)
      return (
        <div>
          <h1>Temperature Data</h1>
          <div className='chartWrapper'>
            <LineChart data={this.state.chartData} options={chartOptions}  width="1400" height="500"/>
          </div>
          <ul>
              {this.state.temperatureList.map(function(result) {
                return <tbody key={result.id}>
                          <tr>
                            <td>{result.value}</td>
                            <td>{result.createdAt}</td>
                          </tr>
                        </tbody>;
              })}           
          </ul>
        </div>
      );
  else
    return (<p>Loading</p>);
  }
});

var Home = React.createClass({
  render: function() {
    return (
          <div className="container">
      <div className="row text-center">
        <div className="col-sm-4">
          <h1 className="text-center">
            <a className="header-default">
              <img id="visualize-icon">Visualize</img>
            </a>
          </h1>
          <div>make data from number to graphic</div>
        </div>
      
        <div className="col-sm-4">
          <h1 className="text-center">
            <a className="header-default">
            <img id="manage-icon">Manage</img>
            </a>
          </h1>
          <div>muliti-panel gets data in front of you</div>
        </div>

        <div className="col-sm-4">
          <h1 className="text-center">
            <a className="header-default">
              <img id="connect-icon">Connect</img>
            </a>
          </h1>
          <div>monitor multiple devices all at once</div>
        </div>

      </div>
    </div>
    );
  }
});

// Run the routes
var routes = (
      <Router>
        <Route name="app" path="/" component={App}>
          <Route name="humidity" path="/humidity" component={Humidity} />
          <Route name="temperature" path="/temperature" component={Temperature} />
          <Route name="home" path="/" component={Home}/>
        </Route>
      </Router>
);

ReactDOM.render(routes, document.getElementById('content'))



