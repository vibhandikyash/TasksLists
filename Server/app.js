var config = require('./config');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
// var mongoose = require('mongoose');
var mongoClient = require('mongodb').MongoClient();
var routes = require('./router.js')
var cors =require('cors');

var app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/Client/dist')));
app.set('views', path.join(__dirname, '/Client/dist'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use('/api', routes);

app.get('*', function (req, res) {
    res.send('NO Page found!');
    // res.render('index.html');
});

// mongoClient.connect(config.dbstring, (err, db) => console.log('Connection Success'));

// mongoose.connect(config.dbstring, function (err) {
//     if (!err) {
//         console.log('Connection Success');
//     }
// });

module.exports = app;