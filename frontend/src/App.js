import React, { Component } from 'react';
import GraphLegend from './components/GraphLegend.js';
import './css/App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    user: {
      authToken: null,
      practiceSessions: null
    },
    graphCells: null,
    hoveringCell: false,
    tooltipTop: 0,
    tooltipLeft: 0,
    tooltipDate: ''
    };
    this.handleMouseHover = this.handleMouseHover.bind(this);
  }

renderSessionButtons() {
  if (this.state.user.authToken) {
    return(
    <div className="boton-container">
      <button className="boton" onClick={() => this.logout()}>
        Logout
      </button>
    </div>)
  } else {
    return(
    <div className="boton-container">
      <button className="boton" onClick={() => this.login()}>
        Login as Guest
      </button>
    </div>)
  }
}

login() {
  var self = this;
  // authenticate via backend and receive JWT token
  // make GET request for PSessions using token
  axios.post('http://localhost:3001/authenticate', {
    email: 'guest@guest',
    password: 'password'
  })
  .then(function(response) {
    var updateState = self.state

    updateState['user']['authToken'] = response.data.auth_token
    self.setState(updateState, ()=> self.getPracticeSessions())
  })
  .catch(function(error) {
    console.log(error);
  });
}

logout() {
  var updateState = this.state

  updateState['user']['authToken'] = null
  updateState['user']['practiceSessions'] = null
  this.setState(updateState)
  this.setGraphDataState()
}

getPracticeSessions() {
  var self = this;

  axios.defaults.headers.common['Authorization'] = this.state.user.authToken;
  axios.get('http://localhost:3001/practice_sessions/')
  .then(function(response) {
    var updateState = self.state

    updateState['user']['practiceSessions'] = response.data
    self.setState(updateState, ()=> self.setGraphDataState())
  })
  .catch(function(error) {
    console.log(error);
  });
}

componentWillMount() {
  this.setGraphDataState()
}

setGraphDataState() {
  var weeksPerYear = 53;
  var daysPerWeek = 7;
  var startCell = new Date();
  var leftoverRender = startCell.getDay() + 1
  var practiceSessions = this.state.user.practiceSessions;
  startCell.setYear(startCell.getFullYear() - 1)
  startCell.setDate(startCell.getDate() - startCell.getDay())

  let weeks = []
  for (let i = 0; i < weeksPerYear; i++) {
    let days = []

    if (i === 52) {
      daysPerWeek = leftoverRender
    }
    for (let j = 0; j < daysPerWeek; j++) {
      var displayDate = startCell.getFullYear() + "-" + (startCell.getMonth() + 1) + "-" + startCell.getDate();
      var displayFill = "#ebedf0"
      var dataCount = 0

      if (practiceSessions) {
        for (var k = 0; k < practiceSessions.length; k++) {
          var startTime = new Date(practiceSessions[k].start_time)
          var convertedTime = startTime.getFullYear() + "-" + (startTime.getMonth() + 1) + "-" + startTime.getDate();

          if (convertedTime === displayDate) {
            dataCount += 1
          }
        }
      }

      if (dataCount > 0 && dataCount <= 1) {
        displayFill = "#c6e48b"
      } else if (dataCount > 1 && dataCount <= 2) {
        displayFill = "#7bc96f"
      } else if (dataCount > 2 && dataCount <= 3) {
        displayFill = "#239a3b"
      } else if (dataCount > 4) {
        displayFill = "#196127"
      }

      days.push(<use
        className="day"
        x={`${13 - i}`}
        y={`${j * 12}`}
        xlinkHref="#day"
        key={`${displayDate}`}
        fill={`${displayFill}`}
        data-count={`${dataCount}`}
        data-date={`${displayDate}`}
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
        />
      )
      startCell.setDate(startCell.getDate() + 1)
    }
    weeks.push(<g transform={`translate(${i * 13}, 0)`} key={`${i}`}>{days}</g>)
  }
this.setState({ graphCells: weeks })
}

handleMouseHover(e) {
  var updateState = this.state
  var tooltipDate = new Date(e.target.attributes['data-date'].value).toLocaleString("en-us", { month: "short", day:"numeric", year:"numeric" })
  updateState['tooltipTop'] = e.target.attributes.x.value
  updateState['tooltipLeft'] = e.target.attributes.y.value
  updateState['tooltipDate'] = tooltipDate
  updateState['hoveringCell'] = !this.state.hoveringCell
  this.setState(updateState)
}

renderGraphHeader() {
  if (this.state.user.practiceSessions) {
    if (this.state.user.practiceSessions.length === 1) {
      return(<h2 className="graph-header">1 contribution in the last year</h2>)
    }
    return(<h2 className="graph-header">{this.state.user.practiceSessions.length} contributions in the last year</h2>)
  }
  return(<h2 className="graph-header">No contributions in the last year</h2>)
}

  render() {


    const svgtip = {
      display: this.state.hoveringCell ? 'block' : 'none',
      left: `${(-this.state.tooltipTop * 12) + 114.5}px`,
      top: `${this.state.tooltipLeft - 17}px`
    }




    return (
      <div className="container">
        { this.renderSessionButtons() }
        { this.renderGraphHeader() }

        <div className="graph-container">
          <svg width="676" height="104">
            <defs>
                <g id="day">
                    <rect width="10" height="10" />
                </g>
            </defs>
            <g transform="translate(16, 20)">

            {this.state.graphCells.map((cellData, index) => {
              return(cellData)
            })}

              <text x="13" y="-10" className="graph-text">Nov</text>
              <text x="61" y="-10" className="graph-text">Dec</text>
              <text x="109" y="-10" className="graph-text">Jan</text>
              <text x="169" y="-10" className="graph-text">Feb</text>
              <text x="217" y="-10" className="graph-text">Mar</text>
              <text x="265" y="-10" className="graph-text">Apr</text>
              <text x="325" y="-10" className="graph-text">May</text>
              <text x="373" y="-10" className="graph-text">Jun</text>
              <text x="421" y="-10" className="graph-text">Jul</text>
              <text x="481" y="-10" className="graph-text">Aug</text>
              <text x="529" y="-10" className="graph-text">Sep</text>
              <text x="577" y="-10" className="graph-text">Oct</text>


              <text className="graph-text" dx="-14" dy="8" style={{ display:"none" }}>Sun</text>
              <text className="graph-text" dx="-14" dy="20">Mon</text>
              <text className="graph-text" dx="-14" dy="32" style={{ display:"none" }}>Tue</text>
              <text className="graph-text" dx="-14" dy="44">Wed</text>
              <text className="graph-text" dx="-14" dy="57" style={{ display:"none" }}>Thu</text>
              <text className="graph-text" dx="-14" dy="69">Fri</text>
              <text className="graph-text" dx="-14" dy="81" style={{ display:"none" }}>Sat</text>

            </g>
          </svg>
          <GraphLegend />
          <div style={svgtip} className="svgtip">
              <strong>No contributions</strong> on {this.state.tooltipDate}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
