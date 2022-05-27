import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ReactGA from 'react-ga';
const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;

ReactGA.initialize(TRACKING_ID);

ReactDOM.render(
    <App />, document.getElementById('root')
);

