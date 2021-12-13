import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import PlayersPage from './pages/PlayersPage';
import GdpPage from './pages/gdpPage';
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import MatchesPage from './pages/MatchesPage';
import AgePage from "./pages/AgePage";
import UndernouirshedPage from "./pages/UndernouirshedPage";
import UndernourishedPage from "./pages/UndernouirshedPage";

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
							path="/players"
							render={() => (
								<PlayersPage />
							)}/>
        <Route exact
							path="/matches"
							render={() => (
								<MatchesPage />
							)}/>
		  <Route exact
				 path="/GDP/countries"
				 render={() => (
					 <GdpPage />
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

