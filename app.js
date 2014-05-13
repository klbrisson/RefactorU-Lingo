
var languages = [
	{name: 'English',
	code: 'eng'},
	{name: 'Spanish',
	code: 'spa'},
	{name: 'German',
	code: 'ger'},
	{name: 'French',
	code: 'fra'}
]


var express = require('express');
var bodyParser = require('body-parser');
// var translateController = require('./controllers/translateController.js');
var BeGlobal = require('node-beglobal');

//initialize the BeGlobal API
var beglobal = new BeGlobal.BeglobalAPI({
  api_token: 'FGtvXoNFMD0AV075EHTVSw%3D%3D'
});

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/translate', function(req, res) {
	res.render('Translate', {langs: languages});
})

app.get('/quiz', function(req, res) {
	res.render('Quiz');
})

app.get('/progress', function(req, res) {
	res.render('Progress');
})

app.post('/translation', function(req, res) {
	console.log(req);
	beglobal.translations.translate(
  {text: req.body.info.text, from: req.body.info.from, to: req.body.info.to},
  function(err, results) {
    if (err) {
      return console.log(err);
    }

    console.log(results);
		res.send(results.translation);

  }
);
	// res.send(req.body);
})

var server = app.listen(3364, function() {
	console.log('Express server listening on port ' + server.address().port);
});






















