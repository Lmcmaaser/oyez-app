import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Nav from './Nav/Nav';
import Blurb from './Blurb/Blurb'
import Data from './Data/Data'
import Report from './Report/Report'
import Footer from './Footer/Footer';
import ApiContext from './ApiContext'
import './App.css';

export default class App extends Component {
  static defaultProps = {
    data: {
      reports: [],
      us_states: [],
      zip_codes: []
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      reports: this.props.data.reports,
      us_states: this.props.data.us_states,
      zip_codes: this.props.data.zip_codes
    }
  }

  handleAddReport = report => {
    this.setState({
      reports: this.state.reports.concat(report)
    })
  }
  render () {
    const contextValue = {
      us_states: this.state.us_states,
      zip_codes: this.state.zip_codes,
      reports: this.state.reports,
      addReport: this.handleAddReport,
    }
    return (
      <div className="App">
        <header className="App-header" role="banner">
          <h1>Oyez</h1>
        </header>
          <ApiContext.Provider value={contextValue}>
            <nav>
              <Nav />
            </nav>
            <main className="main_content" role="main">
              <Route exact path='/' component={Blurb}/>
              <Route path='/report' component={Report} />
              <Route path='/data' component={Data} />
            </main>
          </ApiContext.Provider>
          <footer>
            <Footer />
          </footer>
      </div>
    );
  }
}
