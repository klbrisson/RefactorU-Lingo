var languagesModel = require('../models/languages.js');
var translateController = require('./translate.js');
var Quiz = require('../models/quiz.js');

module.exports = {
    quiz: function(req, res) {
        languagesModel.languages.find({}, function(err, languages) {
            if (err) {
                console.log(err);
                res.send(500, 'There was an error finding languages.');
                return;
            }
            res.render('Quiz', {
                takeQuiz: false,
                langs: languages
            });
        })
    },
    startQuiz: function(req, res) {
        var selectedLang = req.params.language;
        var selectedLangCode = req.query.langCode;
        console.log('REQ.QUERY IS:',req.query);

        console.log('starting quiz creation')
        Quiz.createQuiz(function(newQuiz) {
            console.log(selectedLangCode);
            res.render('Quiz', {
                takeQuiz: true,
                selectedLang: selectedLang,
                selectedLangCode: selectedLangCode,
                quizID: newQuiz._id
            });
        });
    },
    quizWord: function(req, res) {
        console.log(req.query);
        res.send('something')
        // TODO:
        // find the quiz by id
        // Quiz.findById()
        // get the next word in quiz
        // translate word
        // send new word, quiz id, index
    }
}