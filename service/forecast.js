const express = require('express');
const router = express.Router();
const request = require('request-promise');

router.get('/forecastdata', (req, res) => {
    const days = req.query.days || 1;
    const url = `https://api.weatherapi.com/v1/forecast.json?key=3738897fde7047f0a1822737203011&q=20171&days=${days}`;
    return request(url).then((shopResponse) => {
        try {
            let response = JSON.parse(shopResponse);
            let formatedForeCastData = response.forecast.forecastday[0].hour.map( (item) => {
                return {
                    time: item.time,
                    temp_f: item.temp_f
                }
            } );
            const formattedResponse = {
                current: {
                    temp_f: response.current.temp_f
                },
                forecast: formatedForeCastData
            };
            res.status(200).end( JSON.stringify(formattedResponse));
        } catch (error) {
                console.log(error);
        }
    })
    .catch((error) => {
        res.status(500).send(error);
    });
});

module.exports = router;