import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import YearPages from './pages/YearPages';
import CountryPages from './pages/CountryPages';
import SportsPages from './pages/SportsPages';
ReactDOM.render(
  <div>
    <Router>
      <Switch>
		<Route exact
							path="/olympics/year"
							render={() => (
								<YearPages />
							)}/>
		<Route exact
							path="/olympics/year/country"
							render={() => (
								<CountryPages />
							)}/>
		<Route exact
							path="/olympics/sports"
							render={() => (
								<SportsPages />
							)}/>
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

