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


app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
