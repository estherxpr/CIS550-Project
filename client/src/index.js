import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import GdpPage from './pages/gdpPage';
import CovidCountryPage from './pages/CovidCountryPage';
import YearPages from './pages/YearPages';
import CountryPages from './pages/CountryPages';
import SportsPages from './pages/SportsPages';
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import AgePage from "./pages/AgePage";
import UndernourishedPage from "./pages/UndernouirshedPage";
import HealthPage from "./pages/HealthPage";

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact path="/page/covidcountry" render={() => ( <CovidCountryPage />)}/>
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
        <Route exact
               path="/olympics/GDP"
               render={() => (
                   <GdpPage />
               )}/>
        <Route exact
               path="/olympics/health"
               render={() => (
                   <HealthPage />
               )}/>
        <Route exact
               path="/olympics/health/age"
               render={() => (
                   <AgePage />
               )}/>
        <Route exact
               path="/olympics/health/undernourished"
               render={() => (
                   <UndernourishedPage />
               )}/>
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

