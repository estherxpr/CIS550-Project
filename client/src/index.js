import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import GdpPage from './pages/gdpPage';
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
        <Route exact
			   path="/"
			   render={() => (
			   	<HomePage />
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

