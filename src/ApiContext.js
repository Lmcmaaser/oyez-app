import React from 'react';

const ApiContext = React.createContext({
  states: [],
  zip_codes: [],
  reports: [],
  addReport: () => {},
  showData: () => {}
});

export default ApiContext;
