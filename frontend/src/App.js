import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    days: {

    }
    };
  }

  render() {
    return (
      <div className="container">
        <h2 className="graph-header">contributions in the last year</h2>
        <div className="graph-container">
          <svg
              width="676"
              height="104"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <defs>
                <g id="day">
                    <rect width="10" height="10" fill="#ebedf0" />
                </g>
            </defs>
            <g transform="translate(16, 20)">
              <g transform="translate(0, 0)">
                <use x="13" y="0" xlinkHref="#day" />
                <use x="13" y="12" xlinkHref="#day" />
                <use x="13" y="24" xlinkHref="#day" />
                <use x="13" y="36" xlinkHref="#day" />
                <use x="13" y="48" xlinkHref="#day" />
                <use x="13" y="60" xlinkHref="#day" />
                <use x="13" y="72" xlinkHref="#day" />
              </g>
              <g transform="translate(13, 0)">
              </g>
              <g transform="translate(26, 0)">
              </g>
              <g transform="translate(39, 0)">
              </g>
              <g transform="translate(52, 0)">
              </g>
              <g transform="translate(65, 0)">
              </g>
              <g transform="translate(78, 0)">
              </g>
              <g transform="translate(91, 0)">
              </g>
              <g transform="translate(104, 0)">
              </g>
              <g transform="translate(117, 0)">
              </g>
              <g transform="translate(130, 0)">
              </g>
              <g transform="translate(143, 0)">
              </g>
              <g transform="translate(156, 0)">
              </g>
              <g transform="translate(169, 0)">
              </g>
              <g transform="translate(182, 0)">
              </g>
              <g transform="translate(195, 0)">
              </g>
              <g transform="translate(208, 0)">
              </g>
              <g transform="translate(221, 0)">
              </g>
              <g transform="translate(234, 0)">
              </g>
              <g transform="translate(247, 0)">
              </g>
              <g transform="translate(260, 0)">
              </g>
              <g transform="translate(273, 0)">
              </g>
              <g transform="translate(286, 0)">
              </g>
              <g transform="translate(299, 0)">
              </g>
              <g transform="translate(312, 0)">
              </g>
              <g transform="translate(325, 0)">
              </g>
              <g transform="translate(338, 0)">
              </g>
              <g transform="translate(351, 0)">
              </g>
              <g transform="translate(364, 0)">
              </g>
              <g transform="translate(377, 0)">
              </g>
              <g transform="translate(390, 0)">
              </g>
              <g transform="translate(403, 0)">
              </g>
              <g transform="translate(416, 0)">
              </g>
              <g transform="translate(429, 0)">
              </g>
              <g transform="translate(442, 0)">
              </g>
              <g transform="translate(455, 0)">
              </g>
              <g transform="translate(468, 0)">
              </g>
              <g transform="translate(481, 0)">
              </g>
              <g transform="translate(494, 0)">
              </g>
              <g transform="translate(507, 0)">
              </g>
              <g transform="translate(520, 0)">
              </g>
              <g transform="translate(533, 0)">
              </g>
              <g transform="translate(546, 0)">
              </g>
              <g transform="translate(559, 0)">
              </g>
              <g transform="translate(572, 0)">
              </g>
              <g transform="translate(585, 0)">
              </g>
              <g transform="translate(598, 0)">
              </g>
              <g transform="translate(611, 0)">
              </g>
              <g transform="translate(624, 0)">
              </g>
              <g transform="translate(637, 0)">
              </g>
              <g transform="translate(650, 0)">
              </g>
              <g transform="translate(663, 0)">
              </g>
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





          <div className="graph-footer">

            <div className="legend-container">
              Less
              <ul className="legend">
                <li style={{backgroundColor: '#eee'}}></li>
                <li style={{backgroundColor: '#c6e48b'}}></li>
                <li style={{backgroundColor: '#7bc96f'}}></li>
                <li style={{backgroundColor: '#239a3b'}}></li>
                <li style={{backgroundColor: '#196127'}}></li>
              </ul>
              More
            </div>



          </div>




        </div>














      </div>
    );
  }
}

export default App;
