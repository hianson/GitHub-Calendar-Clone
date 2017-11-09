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
  this.setState(updateState, ()=> console.log(this.state))
}

getPracticeSessions() {
  var self = this;
  console.log('getting practice session data...')

  axios.defaults.headers.common['Authorization'] = this.state.user.authToken;
  axios.get('http://localhost:3001/practice_sessions/')
  .then(function(response) {
    var updateState = self.state

    updateState['user']['practiceSessions'] = response.data
    self.setState(updateState, ()=>console.log(self.state))
  })
  .catch(function(error) {
    console.log(error);
  });
}

tester() {
  console.log('tester')
}


renderGraphData() {
  var weeksPerYear = 52;
  var daysPerWeek = 7;
  let weeks = []

  for (let i = 0; i < weeksPerYear; i++) {
    let days = []
    for (let j = 0; j < daysPerWeek; j++) {
      days.push(<use x={`${13 - i}`} y={`${j * 12}`} xlinkHref="#day" />)
    }
    console.log(days)
    weeks.push(<g transform={`translate(${i * 13}, 0)`}>{days}</g>)
  }

return (weeks)

}

  render() {
    return (
      <div className="container">
        { this.renderSessionButtons() }



        <h2 className="graph-header"> contributions in the last year</h2>
        <div className="graph-container">
          <svg
              width="676"
              height="104"
          >
            <defs>
                <g id="day">
                    <rect width="10" height="10" fill="#ebedf0" />
                </g>
            </defs>




            <g transform="translate(16, 20)">


            { this.renderGraphData() }






              <g transform="translate(676, 0)">
                  <rect width="10" height="10" x="-39" y="0" fill="#c6e48b" data-count="1" data-date="2017-11-05"/>
                  <rect width="10" height="10" x="-39" y="12" fill="#196127" data-count="12" data-date="2017-11-06"/>
              </g>






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
