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
        console.log('REQ.QUERY IS:', req.query);

        console.log('starting quiz creation')
        Quiz.createQuiz(function(newQuiz) {
            console.log(selectedLangCode);
            var qID = newQuiz._id;
            console.log('quiz_id before jade-', qID)
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
        var index = +req.query.questionIndex;
        var to = req.query.to;
        var from = req.query.from;
        var quizID = req.query.quizID;

        // find current quiz
        Quiz.quiz.findById(quizID)
            .populate('words', null, 'word')
            .exec(function(err, theQuiz) {
                // find next word
                var theNextWord = theQuiz.words[index].word;

                // translate then send word
                translateController.translateWord(theNextWord, to, from, function(results) {
                    translationObj = {
                        translatedWord: results.translation,
                        quizID: quizID,
                        nextIndex: index + 1,
                        langCode: to
                    }
                    res.send(translationObj);
                })

            })
        // TODO:
        // find the quiz by id
        // Quiz.findById()
        // get the next word in quiz
        // translate word
        // send new word, quiz id, index
    }
}