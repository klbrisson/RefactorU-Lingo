var mongoose = require('mongoose');
var Word = require('./word.js');

var Quiz = mongoose.model('quiz', {
    words: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Word'
    }]
});

module.exports = {
    quiz: Quiz,
    createQuiz: function(cb) {
        // get 10 words, 
        // return new Quiz object with words

        console.log('got to createQuiz')

        Word.find({}, function(err, words) {
            console.log('found these words for quiz:', words);
            var newQuiz = new Quiz({
                words: words
            })
            newQuiz.save(function(err, newQuiz) {

                cb(newQuiz)

            });
        });
    }

}