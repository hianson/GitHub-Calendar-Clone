import React, { Component } from 'react';
import '../css/GraphLegend.css';

class GraphLegend extends Component {

  render() {
    return (
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
    );
  }
}

export default GraphLegend;
