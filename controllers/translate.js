var BeGlobal = require('node-beglobal');
var translateModel = require('../models/translate.js');

//initialize the BeGlobal API
var beglobal = new BeGlobal.BeglobalAPI({
    api_token: 'FGtvXoNFMD0AV075EHTVSw%3D%3D'
});


module.exports = {
    translation: function(req, res) {
        console.log(req);
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
        res.render('Translate', {
            langs: translateModel.languages
        });
    }
}