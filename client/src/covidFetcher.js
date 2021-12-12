const domain = 'http://localhost:8080';

const getCovidCountrySearch = async(Country, ConfirmedRateLow, ConfirmedRateHigh) => {
    const res = await fetch(`${domain}/search/covid?Country=${Country}&ConfirmedRateLow=${ConfirmedRateLow}&ConfirmedRateHigh=${ConfirmedRateHigh}`, {
        method: 'GET',
    });
    return res.json();
};

const getCountryRankAvg = async() => {
    const res = await fetch(`${domain}/covid/olympics/rank/avg`, {
        method: 'GET',
    });
    return res.json();
};

const getCountryPerform = async(Country) => {
    const res = await fetch(`${domain}/covid?Country=${Country}`, {
        method: 'GET',
    });
    return res.json();
};

export {
    getCovidCountrySearch,
    getCountryRankAvg,
    getCountryPerform,
};
