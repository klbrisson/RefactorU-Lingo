var translateModel = require('../models/translate.js');
// var quiz 

module.exports = {
    quiz: function(req, res) {
        translateModel.languages.find({}, function(err, languages) {
            if(err) {
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
        res.render('Quiz', {
            takeQuiz: true,
            selectedLang: selectedLang
        });
    }
}



