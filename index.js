const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const forecastservice = require('./service/forecast');

const app = express();
const port = process.env.PORT;

var whitelist = ['http://localhost', 'localhost']
var corsOptions = function (req, callback) {
    var corsOptions;
    console.log(req.hostname);
    if (whitelist.indexOf(req.header('Origin')) !== -1 || whitelist.indexOf(req.headers.localhost) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }

app.all('*', cors(corsOptions));

app.use(cors());
app.use('/api', [forecastservice]);
app.use(express.static('./public'));
app.listen(port, () => console.log('Server running on port ' + port));

