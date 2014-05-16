var languagesModel = require('../models/languages.js');
var Word = require('../models/word.js');
var translateController = require('./translate.js');
var Quiz = require('../models/quiz.js');

module.exports = {
    selectQuiz: function(req, res) {
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





        // OLD CODE
        // var selectedLang = req.params.language;
        // var selectedLangCode = req.query.langCode;
        // console.log('REQ.QUERY IS:', req.query);

        // console.log('starting quiz creation')
        // Quiz.createQuiz(function(newQuiz) {
        //     var qID = newQuiz._id;
        //     // console.log('quiz_id before jade-', qID)
        //     res.render('Quiz', {
        //         takeQuiz: true,
        //         selectedLang: selectedLang,
        //         selectedLangCode: selectedLangCode,
        //         quizID: newQuiz._id
        //     });
        // });
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
    },

    createQuiz: function(cb) {
        Word.find({}, function(err, words) {
            // gets 
            var selectedLangFull = req.params.language;
            var selectedLangCode = req.query.langCode;

            // creates a new quiz
            var newQuiz = new Quiz({
                words: words,
                questionLangCode: selectedLangCode,
                answerLangCode: 'eng',
                questionLangFull: selectedLangFull,
                answerLangFull: 'English',
                questionIndex: 0,
                takeQuiz: true
            })

            // saves the new quiz to db
            newQuiz.save(function(err, newQuiz) {
                // Do we need to do "Quiz.findOne(newQuiz)"? Can we just do newQuiz.populate....?
                Quiz.findOne(newQuiz)
                .populate('words', null, 'word')
                .exec(function(err, quiz) {
                    // renders the Quiz page passing the newQuiz
                    res.render('Quiz', newQuiz);
                })
            })
        });
        
    }
}