var mongoose = require('mongoose');

var Language = mongoose.model('language', {
    name: String,
    code: String
})


var languages = [{
    name: 'English',
    code: 'eng'
}, {
    name: 'Spanish',
    code: 'spa'
}, {
    name: 'German',
    code: 'ger'
}, {
    name: 'French',
    code: 'fra'
}]

Language.find({}, function(err, docs) {
    if (docs.length === 0) {
        console.log('new languages have been added')
        languages.map(function(newLang) {
            Language.create({
                name: newLang.name,
                code: newLang.code
            }, function(err, doc) {
                if (err) {
                    console.log('this error:', err)
                }
            });
        })
    } else {
        console.log('no new languages added')
    }
});

module.exports = Language;