var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var cards = require('./routes/cards');

var port = process.env.PORT || 3000;

var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'dist')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/', index);
app.use('/api', cards);
// app.use(function (req, res) {
//     res.sendFile(path.join(__dirname, '/client/dist', 'index.html'));
// });

app.listen(port, () => {
    console.log('listening on port', port)
});