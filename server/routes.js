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

async function olympics2020_rank_avg(req, res) {
    const query = `
        SELECT AVG(Ranking) as average
        FROM 2021_Olympic;
    `;
    connection.query(query, function (err, rows, fields) {
        if (err) {
            res.status(404).json({error: 'resource not found'});
        } else {
            res.status(200).json({results: rows, msg: 'get average ranking successfully'});
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

async function country_year_performance(req, res){
    const year = req.query.Year? req.query.Year : 2016;
    const NOC = req.query.NOC ? req.query.NOC: 'USA';
    const query = `
            SELECT F.F_N AS Female,  M.M_N AS Male,  AVG(A.Age) AS Age, A.City, G.G_N AS Gold, S.S_N AS Silver, B.B_N AS Bronze
        FROM (
            SELECT COUNT(*) AS F_N FROM Athlete A WHERE A.Year = ${year} and A.sex = 'F' and A.NOC = '${NOC}' GROUP BY NOC
        ) F, 
        (
        SELECT COUNT(*) AS M_N  FROM Athlete A WHERE A.Year = ${year} and A.sex = 'M' and A.NOC = '${NOC}' GROUP BY NOC
        ) M,
        (
        SELECT COUNT(*) AS G_N FROM Athlete A WHERE A.Year = ${year} and A.Medal = 'Gold' and A.NOC = '${NOC}' GROUP BY NOC
        ) G,
        (
            SELECT COUNT(*) AS S_N FROM Athlete A WHERE A.Year = ${year} and A.Medal = 'Silver' and A.NOC = '${NOC}' GROUP BY NOC
        ) S, 
        (
        SELECT COUNT(*) AS B_N FROM Athlete A WHERE A.Year = ${year} and A.Medal = 'Bronze' and A.NOC = '${NOC}' GROUP BY NOC
        ) B,
        Athlete A
        WHERE A.Year = ${year} AND A.NOC = '${NOC}'
        GROUP BY NOC
    `;
    connection.query(query, function (err, rows, fields) {
        if (err) {
            res.status(404).json({error: 'Resources not found'});
        } else {
            res.status(200).json({results: rows, msg: 'loading the list successfully'});
        }
    });
    
}

async function country_sport_performance(req, res){
    // set the default value as Gymnastics and USA
    const sports = req.query.Sport? '%' + req.query.Sport + '%': 'Gymnastics';
    const NOC = req.query.NOC ? req.query.NOC: 'USA';
    const query = `
        SELECT F.F_N AS Female,  M.M_N AS Male,  AVG(A.Age), A.City, G.G_N AS Gold, S.S_N AS Silver, B.B_N AS Bronze
        FROM (
            SELECT COUNT(*) AS F_N FROM Athlete A WHERE A.Sport = '${sports}' and A.sex = 'F' and A.NOC = '${NOC}' GROUP BY NOC
        ) F, 
        (
        SELECT COUNT(*) AS M_N  FROM Athlete A WHERE A.Sport = '${sports}' and A.sex = 'M' and A.NOC = '${NOC}' GROUP BY NOC
        ) M,
        (
        SELECT COUNT(*) AS G_N FROM Athlete A WHERE A.Sport = '${sports}' and A.Medal = 'Gold' and A.NOC = '${NOC}' GROUP BY NOC
        ) G,
        (
            SELECT COUNT(*) AS S_N FROM Athlete A WHERE A.Sport = '${sports}' and A.Medal = 'Silver' and A.NOC = '${NOC}' GROUP BY NOC
        ) S, 
        (
        SELECT COUNT(*) AS B_N FROM Athlete A WHERE A.Sport = '${sports}' and A.Medal = 'Bronze' and A.NOC = '${NOC}' GROUP BY NOC
        ) B,
        Athlete A
        WHERE A.Sport = '${sports}' AND A.NOC = '${NOC}' 
        GROUP BY NOC
    `;
    connection.query(query, function (err, rows, fields) {
        if (err) {
            res.status(404).json({error: 'Resources not found'});
        } else {
            res.status(200).json({results: rows, msg: 'loading the list successfully'});
        }
    });
}

async function country_athletes_performance(req, res){
    const year = req.query.Year? req.query.Year : 2016;
    const NOC = req.query.NOC ? '%' + req.query.NOC + '%': 'USA';
    const query = `
            WITH G AS(
                SELECT A.name, COUNT(*) AS G_N FROM Athlete A WHERE A.Year = ${year} and A.Medal = 'Gold' and A.NOC = '${NOC}' GROUP BY A.Name
            ),
            S AS (
                SELECT A.name, COUNT(*) AS S_N FROM Athlete A WHERE A.Year = ${year} and A.Medal = 'Silver' and A.NOC = '${NOC}'  GROUP BY A.Name
                ),
            B AS (
                SELECT A.name, COUNT(*) AS B_N FROM Athlete A WHERE A.Year = ${year} and A.Medal = 'Bronze' and A.NOC = '${NOC}'  GROUP BY A.Name
            )
            SELECT A.Name, A.Height, A.Weight, A.Age, A.Team, A.NOC, G.G_N AS Gold, S.S_N AS Silver, B.B_N AS Bronze
            FROM Athlete A left join G ON A.name = G.name left join S on A.name = S.name left join B on A.name = B.name
            WHERE A.NOC = '${NOC}'  AND A.Year = ${year}
            GROUP BY A.Name
            ORDER BY G.G_N DESC, S.S_N DESC, B.B_N DESC;
    `;
    connection.query(query, function (err, rows, fields) {
        if (err) {
            res.status(404).json({error: 'Resources not found'});
        } else {
            res.status(200).json({results: rows, msg: 'loading the list successfully'});
        }
    });
}

async function country_gdp_with_performance(req, res) {
    const country = req.query.Country ? '%' + req.query.Country + '%' : '%';
    const year = req.query.Year ? req.query.Year : 2016
    const query = `
        WITH M AS (
            SELECT A.NOC AS NOC,C.country AS Country A.Year AS Year, COUNT(*) AS medals_numbers
            FROM Athlete A JOIN Country C ON A.NOC = C.code
            GROUP BY A.NOC, A.Year
        )
		SELECT M.Country,M.metals_numbers,G.GDP 
		FROM M, GDP AS G 
		WHERE M.Country LIKE '${country}' AND M.Year = ${year};
    `;
    connection.query(query, function (err, rows, fields) {
        if (err) {
            res.status(404).json({error: 'Country not found'});
        } else {
            res.status(200).json({results: rows, msg: 'retrieving information of the country successfully'});
        }
    });
}

async function olympics_health_age(req, res) {
    const sports = req.query.Sport? '%' + req.query.Sport + '%': '%';
    const country = req.query.Country ? '%' + req.query.Country + '%' : '%';
    const year = req.query.Year ? req.query.Year : 2016
    const query = `
        WITH AGE AS (
            SELECT A.NOC, A.year, AVG(A.age) AS avg_age, MIN(A.age) AS min_age, MAX(A.age) AS max_age,COUNT(*) AS medal_numbers FROM Athlete A WHERE A.Sport = '${sports}' A.Year = ${year} GROUP BY A.NOC,A.Year
        ) ,
		SELECT C.Country AS country, AGE.avg_age AS avg_age , AGE.min_age AS min_age, AGE.max_age AS mAX_age,AGE.medal_numbers AS total_medals
		FROM AGE JOIN Countries C ON AGE.NOC = C.code
		WHERE C.Country LIKE '${country}';
    `;
    connection.query(query, function (err, rows, fields) {
        if (err) {
            res.status(404).json({error: 'Country not found'});
        } else {
            res.status(200).json({results: rows, msg: 'retrieving information of the country successfully'});
        }
    });
}

async function olympics_health_undernourished(req, res) {
    const country = req.query.Country ? '%' + req.query.Country + '%' : '%';
    const year = req.query.Year ? req.query.Year : 2016
    const query = `
		WITH M AS (
            SELECT A.NOC AS NOC,C.country AS Country A.Year AS Year, COUNT(*) AS medals_numbers
            FROM Athlete A
            GROUP BY A.NOC, A.Year
        )
		SELECT H.country,M.metals_numbers AS total_medals,H.Undernourished_Rate AS Undernourished_Rate
		FROM M JOIN Health H ON M.NOC = H.country_code AND H.Year = M.Year
		WHERE H.Country LIKE '${country}' AND H.Year = ${year};
    `;
    connection.query(query, function (err, rows, fields) {
        if (err) {
            res.status(404).json({error: 'Country not found'});
        } else {
            res.status(200).json({results: rows, msg: 'retrieving information of the country successfully'});
        }
    });
}

module.exports = {
    search_covid_countries,
    olympics_covid_country,
    covid_countries_avg,
    olympics2020_rank_avg,
    country_year_performance,
    country_sport_performance,
    country_athletes_performance,
    country_gdp_with_performance,
    olympics_health_age,
    olympics_health_undernourished
}