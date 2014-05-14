var express = require('express');
var bodyParser = require('body-parser');
var translateController = require('./controllers/translate.js');
var quizController = require('./controllers/quiz.js')



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

app.get('/quiz', quizController.quiz)

app.get('/quiz/:language', quizController.startQuiz)

app.get('/progress', function(req, res) {
    res.render('Progress');
})



var server = app.listen(3364, function() {
    console.log('Express server listening on port ' + server.address().port);
});