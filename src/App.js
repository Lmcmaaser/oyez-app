import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Nav from './Nav/Nav';
import Blurb from './Blurb/Blurb';
import ShowAll from './ShowAll/ShowAll';
import ShowState from './ShowState/ShowState';
import ShowZipCode from './ShowZipCode/ShowZipCode';
import Report from './Report/Report';
import Footer from './Footer/Footer';
import ApiContext from './ApiContext'
import './App.css';

export default class App extends Component {
  static defaultProps = {
    data: {
      reports: [],
      us_states: [],
      zipcodes: []
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      reports: this.props.data.reports,
      us_states: this.props.data.us_states,
      zipcodes: this.props.data.zipcodes
    }
  };

  handleAddReport = report => {
    this.setState({
      reports: this.state.reports.concat(report)
    })
  }

  handleAddZipCode = zipcode => {
    this.setState({
      zipcodes: this.state.zipcodes.concat(zipcode)
    })
  }

  render () {
    const contextValue = {
      us_states: this.state.us_states,
      zipcodes: this.state.zipcodes,
      reports: this.state.reports,
      addReport: this.handleAddReport,
      addZipCode: this.handleAddZipCode
    }
    return (
      <div className="App">
        <header className="App-header" role="banner">
          <h1>Oyez!</h1>
        </header>
          <ApiContext.Provider value={contextValue}>
            <nav>
              <Nav />
            </nav>
            <main className="main_content" role="main">
              <Route exact path='/' component={Blurb}/>
              <Route path='/report' component={Report} />
              <Route path='/all' component={ShowAll} />
              <Route path='/state' component={ShowState} />
              <Route path='/zipcode' component={ShowZipCode} />
            </main>
          </ApiContext.Provider>
          <footer>
            <Footer />
          </footer>
      </div>
    )
  }
};
