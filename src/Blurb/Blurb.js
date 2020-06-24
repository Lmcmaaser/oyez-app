import React, { Component } from 'react';
import './Blurb.css';

export default class Blurb extends Component {
  render() {
    return (
      <div>
        <h3>How to Use This App</h3>
        <div className="instructions">
          <p className="info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p className="info">
            Augue interdum velit euismod in pellentesque.
          </p>
          <p className="info">Vestibulum rhoncus est pellentesque elit ullamcorper. Id aliquet risus feugiat in.</p>
        </div>
      </div>
    )
  }
}
