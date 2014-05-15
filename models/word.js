var mongoose = require('mongoose');

var Word = mongoose.model('word', {
    word: String
});

Word.find({}, function(err, docs) {
    if (docs.length === 0) {
        var newWords = ['hello', 'goodbye', 'stop', 'mother', 'go']
        newWords.map(function(newWord) {
            Word.create({
                word: newWord
            }, function(err, doc) {
                if (err) {
                    console.log('this error:', err)
                }
            });
        })
    } else {
        console.log('no new words added')
    }
});

module.exports = Word;