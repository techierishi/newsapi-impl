var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var cookieParser  = require('cookie-parser');
app.use(cookieParser());

var cors = require('cors');
app.use(cors());

require('./server/app.js')(app);

var port = 4000;

app.listen(port);