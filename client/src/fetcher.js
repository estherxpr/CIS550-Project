import config from './config.json'

const getAllMatches = async (page, pagesize, league) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/matches/${league}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getAllPlayers = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/players?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getMatch = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/match?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getPlayer = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/player?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getMatchSearch = async (home, away, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/matches?Home=${home}&Away=${away}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getPlayerSearch = async (name, nationality, club, rating_high, rating_low, pot_high, pot_low, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/players?Name=${name}&Nationality=${nationality}&Club=${club}&RatingLow=${rating_low}&RatingHigh=${rating_high}&PotentialHigh=${pot_high}&PotentialLow=${pot_low}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
   //console.log(res.json())
    console.log('here')
    return res.json()
}
// const getGDP = async (country,year) => {
//     var res = await fetch(`http://${config.server_host}:${config.server_port}/GDP/countries`, {
//         method: 'GET',
//     })
//     return res.json()
// }

const getGDPSearch = async (country,year) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/GDP/countries?Country=${country}&Year=${year}`, {
        method: 'GET',
    })
    return res.json()
}

const getAgeSearch = async (country,year) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/health/age?Country=${country}&Year=${year}`, {
        method: 'GET',
    })
    return res.json()
}


// const getAge = async (country,year) => {
//     var res = await fetch(`http://${config.server_host}:${config.server_port}/olympics/health/age`, {
//         method: 'GET',
//     })
//     return res.json()
// }

const getUndernourishedRate = async (country,year) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/health/undernourished?Country=${country}&Year=${year}`, {
        method: 'GET',
    })
    return res.json()
}


export {
    getAllMatches,
    getAllPlayers,
    getMatch,
    getPlayer,
    getMatchSearch,
    getPlayerSearch,
    getGDPSearch,
    getAgeSearch,
    getUndernourishedRate
}