var express = require('express');
var bodyParser = require('body-parser');
var translateController = require('./controllers/translate.js');
var quizController = require('./controllers/quiz.js');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/lingo');



var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/translate', translateController.renderTranslatePage)

app.post('/translate', translateController.translation)

// OLD CODE
// app.get('/quiz', quizController.quiz)

// NEW CODE
app.get('/selectquiz', quizController.quiz)


app.get('/quiz/:language', quizController.startQuiz)


app.get('/progress', function(req, res) {
    res.render('Progress');
})

app.get('/quizword', quizController.quizWord);


var server = app.listen(3000, function() {
    console.log('Express server listening on port ' + server.address().port);
});