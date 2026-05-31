USE world;

-- ─────────────────────────────────────────────
-- 1. What query would you run to get all the countries that speak Slovene? 
-- Your query should return the name of the country, language, and language percentage.
-- Your query should arrange the result by language percentage in descending order. (1)
-- ─────────────────────────────────────────────

SELECT countries.name, languages.language, languages.percentage
FROM countries
JOIN languages ON countries.id = languages.country_id
WHERE languages.language = 'Slovene'
ORDER BY languages.percentage DESC;

-- ─────────────────────────────────────────────
-- 2. What query would you run to display each country's total number of cities? 
-- Your query should return the name of the country and the total number of cities. 
-- Your query should arrange the result by the number of cities in descending order. (3)
-- ─────────────────────────────────────────────

SELECT countries.name, count(cities.id) AS total_cities
FROM countries
JOIN cities ON countries.id = cities.country_id
GROUP BY countries.name
ORDER BY count(cities.id) DESC;


-- ─────────────────────────────────────────────
-- 3. What query would you run to get all the cities
-- in Mexico with a population greater than 500,000? 
-- Your query should arrange the results by population in descending order. (1)
-- ─────────────────────────────────────────────

SELECT cities.name, cities.population
FROM cities
JOIN countries ON cities.country_id = countries.id
WHERE countries.name = 'Mexico' AND cities.population > 500000
ORDER BY cities.population DESC;


-- ─────────────────────────────────────────────
-- 4. What query would you run to get all languages in each country 
-- with a percentage greater than 89%? 
-- Your query should arrange the result by percentage in descending order. (1)
-- ─────────────────────────────────────────────

SELECT countries.name , languages.language , languages.percentage 
FROM countries
JOIN languages ON countries.id = languages.country_id
WHERE languages.percentage > 89
ORDER BY languages.percentage  DESC ;

 
-- ─────────────────────────────────────────────
-- 5. What query would you run to get all the countries 
-- with a Surface Area below 501 and a Population 
-- greater than 100,000? (2)
-- ─────────────────────────────────────────────

SELECT name , surface_area, population
FROM countries
WHERE surface_area < 501 AND population > 100000;


-- ─────────────────────────────────────────────
-- 6. What query would you run to get countries with 
-- only a Constitutional Monarchy with a capital greater 
-- than 200 and a life expectancy greater than 75 years? (1)
-- ─────────────────────────────────────────────

SELECT name , capital , life_expectancy
FROM countries
WHERE government_form = "Constitutional Monarchy"
AND  countries.capital > 200 AND life_expectancy > 75 ;


-- ─────────────────────────────────────────────
-- 7. What query would you run to get all the cities of
--  Argentina inside the Buenos Aires district and have 
-- a population greater than 500,000? 
-- The query should return the Country Name, City Name,
-- District, and Population. (2)
-- ─────────────────────────────────────────────

SELECT
countries.name AS country_name, cities.name AS city_name, cities.district, cities.population
FROM cities
JOIN countries ON cities.country_id = countries.id
WHERE countries.name = 'Argentina'
AND cities.district = 'Buenos Aires' AND cities.population > 500000;

-- ─────────────────────────────────────────────
-- 8. What query would you run to summarize the number 
-- of countries in each region? The query should display
-- the region's name and the number of countries. 
-- Also, the query should arrange the result by the number
-- of countries in descending order. (2)
-- ─────────────────────────────────────────────

SELECT region, COUNT(*) AS num_countries
FROM countries
GROUP BY region
ORDER BY num_countries DESC;
