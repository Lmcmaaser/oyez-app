import React from 'react';

const ApiContext = React.createContext({
  reports: [],
  us_states: [],
  addReport: () => {},
  // showData: () => {}
});

export default ApiContext;
