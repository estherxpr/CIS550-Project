# CIS550-Project

Motivation:  All of our members are interested in sports, and Tokyo Olympics had been held a few months ago, so we would like to combine the features of the Olympics and the most popular topic recently, which is Covid-19, to gain some insight from them.

List of features: 
display the performance of countries in the Olympics, including total medals, sex distribution, average age, and the athlete’s list that can be filtered by different sports. 
Olympics before Covid, we will show the relationship between countries’ GDP and their performance. 
Show the relationship between the number of people who are undernourished and countries’ athlete’s ages. 
For the 2021 Tokyo Olympics, our website will display the correlation between the 2020 covid and countries’ performance.
List of features that we might implement:
“Country vs Country” feature: take in two countries and a sport as input, output which country will have a higher chance to win. 
List of pages of the application:
Countries performance: show the performance of each country
Countries and GDP: show countries GDP and their performance
Show the relationship of the number of undernourished people and athlete’s age
Show the relationship between the percentage of people diagnosed with Covid in the country and their performance
Databases:  
	
Athlete(id,name,age,sex, height,weight, Team, NOC,Year,City,Sport,Event,Medal)
Countries(code, country, population)
GDP(country_code, Year2000,Year2004,Year2008,Year2012.Year2016)
COVID(country, total_cases_till_today, positive_rate)
Health(country, undernourished_population, Year2000,Year2004,Year2008,Year2012.Year2016)

CREATE TABLE Countries
(
    code                    varchar(3),
    country                 varchar(25),
    population              float,
    PRIMARY KEY (code)
);
CREATE TABLE Athlete
(
    ID                        	int,
    Name                  	varchar(50),
    Sex		          	varchar(1),
    Age                     	float,    
    Height                 	float,
    Weight                 float,
    Team	      	varchar(50)
    NOC                   	varchar(3),
    Year                    	int,
    City			varchar(25),
               Sport                   	varchar(25),
               Event		varchar(100),
    Medal                   varchar(8),
    PRIMARY KEY (ID),
    FOREIGN KEY(NOC) REFERENCES Countries(code)
);
CREATE TABLE GDP
(
    `Country Name` 		 varchar(25)
    `country_code`                   varchar(20),
    Year2000                         float,
    Year2004                          float,
    Year2008                          float,
    Year2012                          float,
    Year2016                          float,
    PRIMARY KEY(country_code)
);

CREATE TABLE COVID(
    country                           varchar(25),
    total_cases_till_today      int,
    positive_rate                    float
    PRIMARY KEY(country));

CREATE TABLE Health(
    country                           varchar(25),
    undernourished_population float,
    Year2000                          float,
    Year2004                          float,
    Year2008                          float,
    Year2012                          float,
    Year2016                          float,
    PRIMARY KEY(country)
)
Cleaning and pre-processing the data:
Drop countries that did not participate in Olympics from the datasets other than Olympics related datasets
Select years matching the Olympics years for the datasets other than Olympics related datasets
Drop countries that contain too many null values in our features
List of technologies:
VIew: React, HTML, CSS
Model: Express, RESTful
Controller: MySQL, AWS(RDS), NodeJS
Others: ER diagram
Each member’s responsibility: Each member will be responsible for one web page application.
Fu-Lin Hsu: the web page for correlation between the 2020 covid and countries’ performance
Szu-Chia Li: the webpage that displays the performance of countries in the Olympics
Jiaxin Wang: the webpage that shows the relationship between the number of people who are undernourished and countries’ athlete’s ages. 
Esther Xu: the webpage that shows the relationship between countries’ GDP and their performance for the Olympics before Covid.
