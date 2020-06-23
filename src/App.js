import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ApiContext from '../ApiContext'
import './App.css';

export default class App extends Component {
  static defaultProps = {
    data: {
      reports: [],
      states: [],
      zip: []
    }
  };
  render () {
    return (
      <div className="App">
        <header className="App-header">Oyez</header>
        <body>
          <ApiContext.Provider value={contextValue}>
            <nav>
              <Nav />
            </nav>
            <main className="container" role="main">
              <header className="header" role="banner">
                <h1>COVID-19 Watch</h1>
              </header>
              <div className='main_content'>
                <h3>How to Use This App</h3>
                <div className="instructions">
                  <p className="info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <p className="info">
                    Augue interdum velit euismod in pellentesque.
                  </p>
                  <p className="info">Vestibulum rhoncus est pellentesque elit ullamcorper. Id aliquet risus feugiat in.</p>
                </div>
              </div>
            </main>
          </ApiContext.Provider>
          <footer>
            <Footer />
          </footer>
        </body>
      </div>
    );
  }
}

export default App;
