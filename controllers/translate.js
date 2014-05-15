var BeGlobal = require('node-beglobal');
var languagesModel = require('../models/languages.js');

//initialize the BeGlobal API
var beglobal = new BeGlobal.BeglobalAPI({
    api_token: 'FGtvXoNFMD0AV075EHTVSw%3D%3D'
});




module.exports = {
    translation: function(req, res) {
        beglobal.translations.translate({
                text: req.body.info.text,
                from: req.body.info.from,
                to: req.body.info.to
            },
            function(err, results) {
                if (err) {
                    return console.log(err);
                }
                console.log(results);
                res.send(results.translation);
            }
        );
    },
    renderTranslatePage: function(req, res) {
        // Finds languages in mongo database
        languagesModel.languages.find({}, function(err, languages) {
            if (err) {
                console.log(err);
                res.send(500, 'There was an error finding languages.');
                return;
            }
            res.render('Translate', {
                langs: languages
            });
        })
    },
    translateWord: function(text, to, from, cb) {
        beglobal.translations.translate({
                    text: text,
                    from: from,
                    to: to
                },
                function(err, results) {
                    if (err) {
                        return console.log(err);
                    }
                    cb(results);
                }
            );
    }
}