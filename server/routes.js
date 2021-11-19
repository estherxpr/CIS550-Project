const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');
// Author: Fu-Lin Hsu
// PennKey: hsufl97

const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();

async function search_covid_countries(req, res) {
    const country = req.query.Country ? '%' + req.query.Country + '%' : '%';
    const confirmedRateLow = req.query.ConfirmedRateLow ? req.query.ConfirmedRateLow / 100 : 0;
    const confirmedRateHigh = req.query.ConfirmedRateHigh ? req.query.ConfirmedRateHigh / 100 : 1;
    const query = `
        SELECT *
        FROM Covid_Countries
        WHERE Country LIKE '${country}' AND confirmed_rate >= ${confirmedRateLow} AND confirmed_rate <= ${confirmedRateHigh}
    `;
    connection.query(query, function (err, rows, fields) {
        if (err) {
            res.status(404).json({error: 'Selected countries not found'});
        } else {
            res.status(200).json({results: rows, msg: 'retrieving searching results successfully'});
        }
    });
}

async function olympics_covid_country(req, res) {
    const country = req.query.Country ? '%' + req.query.Country + '%' : '%';
    const query = `
		SELECT O.Country, O.Gold, O.Silver, O.Bronze, O.Total_Medal, O.Ranking, C.confirmed_rate
		FROM 2021_Olympic O JOIN Covid_Countries C ON O.Country = C.Country
		WHERE O.Country LIKE '${country}';
    `;
    connection.query(query, function (err, rows, fields) {
        if (err) {
            res.status(404).json({error: 'Country not found'});
        } else {
            res.status(200).json({results: rows, msg: 'retrieving information of the country successfully'});
        }
    });
}

async function covid_countries_avg(req, res) {
    const query = `
		(
			SELECT O.Country, C.confirmed_rate, '+' as Mark
			FROM 2021_Olympic O JOIN Covid_Countries C ON O.Country = C.Country
			WHERE C.confirmed_rate >= (SELECT AVG(confirmed_rate) FROM Covid_Countries)
		)
		UNION
		(
			SELECT O.Country, C.confirmed_rate, '-' as Mark
			FROM 2021_Olympic O JOIN Covid_Countries C ON O.Country = C.Country
			WHERE C.confirmed_rate < (SELECT AVG(confirmed_rate) FROM Covid_Countries)
		);
    `;
    connection.query(query, function (err, rows, fields) {
        if (err) {
            res.status(404).json({error: 'Resources not found'});
        } else {
            res.status(200).json({results: rows, msg: 'loading the list successfully'});
        }
    });
}

module.exports = {
    search_covid_countries,
    olympics_covid_country,
    covid_countries_avg
}
