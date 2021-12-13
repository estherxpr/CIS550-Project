const express = require('express');
const mysql = require('mysql');


const routes = require('./routes')
const config = require('./config.json')
const cors = require('cors');


const app = express();
app.use(cors({
    origin: '*'
}));

// Route 1
app.get('/search/covid', routes.search_covid_countries)

// Route 2
app.get('/covid', routes.olympics_covid_country)

// Route 3
app.get('/covid/countries', routes.covid_countries_avg)

// Route 4
app.get('/olympics/year', routes.country_year_performance)

// Route 5
app.get('/olympics/sports', routes.country_sport_performance)

// Route 6
app.get('/olympics/athletes', routes.country_athletes_performance)

// Route 7
app.get('/GDP/countries', routes.country_gdp_with_performance)

// Route 7
app.get('/search/GDP/countries', routes.search_country_gdp_with_performance)

// Route 8
app.get('/olympics/health/age', routes.olympics_health_age)
app.get('/search/health/age', routes.olympics_health_age)
// Route 9
app.get('/olympics/health/undernourished', routes.olympics_health_undernourished)
app.get('/search/health/undernourished', routes.olympics_health_undernourished)

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
