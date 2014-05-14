
var mongoose = require('mongoose');

var Quiz = mongoose.model('quiz', {
	word: String
});

module.exports = {
    quiz: Quiz
}