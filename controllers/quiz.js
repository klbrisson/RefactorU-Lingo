var languagesModel = require('../models/languages.js');
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
        console.log('starting quiz creation')

        Quiz.createQuiz(function(newQuiz) {
            res.render('Quiz', {
                takeQuiz: true,
                selectedLang: selectedLang,
                theQuiz: newQuiz

            });
        });



        // res.render('Quiz', {
        //     takeQuiz: true,
        //     selectedLang: selectedLang,
        //     theQuiz: theQuiz

        // });
    }
}