import React from 'react';

const ApiContext = React.createContext({
  states: [],
  zip_codes: [],
  reports: [],
  addReport: () => {}
});

export default ApiContext;
