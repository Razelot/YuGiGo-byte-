var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var cards = require('./api/cards');

var port = process.env.PORT || 3000;

var app = express();

// Body parser
app.use(bodyParser.json());

// Set Static Folder
app.use('/',express.static(path.join(__dirname, 'dist')));

// Api route
app.use('/api', cards);

// Cath all route
app.use(function (req, res, next) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
})

app.listen(port, () => {
    console.log('listening on port', port)
});