import config from './config.json'

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
    getGDPSearch,
    getAgeSearch,
    getUndernourishedRate
}