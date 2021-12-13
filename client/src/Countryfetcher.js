import config from './config.json'

const getAllCountriesOfYear = async (year) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/olympics/year?Year=${year}`, {
        method: 'GET',
    })
    return res.json()
}

const getCountryOfYear = async (year, NOC) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/olympics/year/country?Year=${year}&NOC=${NOC}`, {
        method: 'GET',
    })
    return res.json()
}

const getSportsPerformance = async (sports, NOC) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/olympics/sports?Sport=${sports}&NOC=${NOC}`, {
        method: 'GET',
    })
    return res.json()
}

export {
    getAllCountriesOfYear,
    getCountryOfYear,
    getSportsPerformance,
}