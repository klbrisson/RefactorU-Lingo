var translateModel = require('../models/translate.js');

module.exports = {
    quiz: function(req, res) {
        res.render('Quiz', {
            takeQuiz: false,
            langs: translateModel.languages
        });
    },
    startQuiz: function(req, res) {
        var selectedLang = req.params.language;
        console.log(selectedLang)
        res.render('Quiz', {
            takeQuiz: true,
            selectedLang: selectedLang
        });
    }
}