import React from 'react';

const ApiContext = React.createContext({
  reports: [],
  us_states: [],
  zipcodes: [],
  addReport: () => {},
  addZipCode: () => {}
});

export default ApiContext;
