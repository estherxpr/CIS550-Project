import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import CovidCountryPage from './pages/CovidCountryPage';
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact path="/page/covidcountry" render={() => ( <CovidCountryPage />)}/>
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

