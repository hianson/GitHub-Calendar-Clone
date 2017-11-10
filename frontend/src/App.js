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
      practiceSessions: []
      }
    };
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
        Login
      </button>
    </div>)
  }
}

login() {
  var self = this;
  // authenticate via backend and receive JWT token
  // make GET request for PSessions using token
  axios.post('http://localhost:3001/authenticate', {
    email: 'anson@anson',
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
  updateState['user']['practiceSessions'] = []
  this.setState(updateState)
}

getPracticeSessions() {
  var self = this;

  axios.defaults.headers.common['Authorization'] = this.state.user.authToken;
  axios.get('http://localhost:3001/practice_sessions/')
  .then(function(response) {
    var updateState = self.state

    updateState['user']['practiceSessions'] = response.data
    self.setState(updateState)
  })
  .catch(function(error) {
    console.log(error);
  });
}

renderGraphData() {
  var weeksPerYear = 52;
  var daysPerWeek = 7;
  var startCell = new Date()
  var daysLeftToRender = startCell.getDay() + 1

  startCell.setYear(startCell.getFullYear() - 1)
  startCell.setDate(startCell.getDate() - startCell.getDay())

  let weeks = []
  for (let i = 0; i < weeksPerYear; i++) {
    let days = []
    for (let j = 0; j < daysPerWeek; j++) {
      var displayDate = startCell.getFullYear() + "-" + (startCell.getMonth() + 1) + "-" + startCell.getDate();
      days.push(<use x={`${13 - i}`} y={`${j * 12}`} xlinkHref="#day" data-count="0" data-date={`${displayDate}`}/>)
      startCell.setDate(startCell.getDate() + 1)
    }
    weeks.push(<g transform={`translate(${i * 13}, 0)`}>{days}</g>)
  }

  let daysRemaining = []
  for (let i = 0; i < daysLeftToRender; i++) {
    displayDate = startCell.getFullYear() + "-" + (startCell.getMonth() + 1) + "-" + startCell.getDate();
    daysRemaining.push(<use x="-39" y={`${i * 12}`} xlinkHref="#day" data-count="0" data-date={`${displayDate}`}/>)
    startCell.setDate(startCell.getDate() + 1)
  }
  weeks.push(<g transform="translate(676, 0)">{daysRemaining}</g>)
  // console.log(weeks[0].props.children[0].props['data-date'])
  if (this.state.user.practiceSessions[0]) {
    console.log('printing practiceSessions:', this.state.user.practiceSessions[0])
  }
return (weeks)
// console.log(weeks)
// const updateState = this.state
// updateState['user']['practiceSessions'] = weeks
// this.setState(updateState)
}

  render() {
    return (
      <div className="container">
        { this.renderSessionButtons() }
        <h2 className="graph-header">{this.state.user.practiceSessions.count} contributions in the last year</h2>
        <div className="graph-container">
          <svg width="676" height="104">
            <defs>
                <g id="day">
                    <rect width="10" height="10" fill="#ebedf0" />
                </g>
            </defs>
            <g transform="translate(16, 20)">

            { this.renderGraphData() }

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
        </div>




      </div>
    );
  }
}

export default App;
